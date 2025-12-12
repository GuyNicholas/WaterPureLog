import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  
  console.log("Deploying WaterPureLog contract with account:", deployer.address);
  
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", ethers.formatEther(balance), "ETH");

  // 获取合约工厂
  const WaterPureLog = await ethers.getContractFactory("WaterPureLog");
  
  console.log("Deploying WaterPureLog...");
  
  // 部署合约
  const waterPureLog = await WaterPureLog.deploy();
  
  await waterPureLog.waitForDeployment();
  
  const address = await waterPureLog.getAddress();
  const network = await ethers.provider.getNetwork();
  console.log("WaterPureLog deployed to:", address);
  console.log("Network:", network.name);
  console.log("Chain ID:", network.chainId);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

