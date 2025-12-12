import "@fhevm/hardhat-plugin";
import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-verify";
import "@typechain/hardhat";
import "hardhat-deploy";
import type { HardhatUserConfig } from "hardhat/config";
import { vars } from "hardhat/config";

// 私钥配置 - 使用环境变量或直接配置
const PRIVATE_KEY = process.env.PRIVATE_KEY || "your-private-key-here";
const INFURA_API_KEY = process.env.INFURA_API_KEY || vars.get("INFURA_API_KEY", "");
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || vars.get("ETHERSCAN_API_KEY", "");

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  namedAccounts: {
    deployer: 0,
  },
  etherscan: {
    apiKey: {
      sepolia: ETHERSCAN_API_KEY,
    },
  },
  networks: {
    hardhat: {
      chainId: 31337,
    },
    sepolia: {
      url: INFURA_API_KEY 
        ? `https://sepolia.infura.io/v3/${INFURA_API_KEY}`
        : "https://rpc.sepolia.org",
      accounts: [PRIVATE_KEY],
      chainId: 11155111,
    },
  },
  paths: {
    artifacts: "./artifacts",
    cache: "./cache",
    sources: "./contracts",
    tests: "./test",
    deployments: "./deployments",
  },
  solidity: {
    version: "0.8.24",
    settings: {
      metadata: {
        bytecodeHash: "none",
      },
      optimizer: {
        enabled: true,
        runs: 800,
      },
      evmVersion: "cancun",
    },
  },
  typechain: {
    outDir: "types",
    target: "ethers-v6",
  },
};

export default config;

