import { ContractFactory, Wallet, JsonRpcProvider } from "ethers";
import * as fs from "fs";
import * as path from "path";

async function main() {
  // 配置
  const PRIVATE_KEY = "your-private-key-here";
  // 使用多个RPC端点作为备选
  const RPC_URLS = [
    process.env.RPC_URL,
    "https://ethereum-sepolia-rpc.publicnode.com",
    "https://sepolia.gateway.tenderly.co",
    "https://rpc.sepolia.org",
  ].filter(Boolean) as string[];
  
  let provider: JsonRpcProvider | null = null;
  let lastError: Error | null = null;
  
  // 尝试连接RPC
  for (const url of RPC_URLS) {
    try {
      const testProvider = new JsonRpcProvider(url);
      await testProvider.getBlockNumber();
      provider = testProvider;
      console.log("Connected to RPC:", url);
      break;
    } catch (error) {
      lastError = error as Error;
      console.log("Failed to connect to", url, "- trying next...");
    }
  }
  
  if (!provider) {
    throw new Error(`Failed to connect to any RPC endpoint. Last error: ${lastError?.message}`);
  }
  
  // 创建signer
  const wallet = new Wallet(PRIVATE_KEY, provider);
  
  console.log("Deploying with account:", wallet.address);
  
  // 检查余额
  const balance = await provider.getBalance(wallet.address);
  console.log("Account balance:", balance.toString(), "wei");
  console.log("Account balance:", (Number(balance) / 1e18).toFixed(4), "ETH");
  
  if (balance === 0n) {
    console.error("ERROR: Account has no ETH. Please fund the account first.");
    process.exit(1);
  }
  
  // 读取artifact
  const artifactPath = path.join(__dirname, "../artifacts/contracts/WaterPureLog.sol/WaterPureLog.json");
  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
  
  console.log("Deploying WaterPureLog contract...");
  
  // 创建合约工厂并部署
  const factory = new ContractFactory(artifact.abi, artifact.bytecode, wallet);
  const contract = await factory.deploy();
  
  console.log("Transaction hash:", contract.deploymentTransaction()?.hash);
  console.log("Waiting for deployment confirmation...");
  
  await contract.waitForDeployment();
  
  const address = await contract.getAddress();
  console.log("✅ WaterPureLog deployed to:", address);
  console.log("Network: Sepolia");
  console.log("Chain ID: 11155111");
  
  // 保存部署信息
  const deploymentDir = path.join(__dirname, "../deployments/sepolia");
  if (!fs.existsSync(deploymentDir)) {
    fs.mkdirSync(deploymentDir, { recursive: true });
  }
  
  const deploymentInfo = {
    address: address,
    abi: artifact.abi,
    transactionHash: contract.deploymentTransaction()?.hash,
    network: "sepolia",
    chainId: 11155111,
  };
  
  fs.writeFileSync(
    path.join(deploymentDir, "WaterPureLog.json"),
    JSON.stringify(deploymentInfo, null, 2)
  );
  
  console.log("Deployment info saved to:", path.join(deploymentDir, "WaterPureLog.json"));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Deployment failed:", error);
    process.exit(1);
  });

