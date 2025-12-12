import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  console.log("Deploying WaterPureLog contract...");
  console.log("Deployer address:", deployer);

  const deployedWaterPureLog = await deploy("WaterPureLog", {
    from: deployer,
    log: true,
    waitConfirmations: 1,
  });

  console.log(`WaterPureLog deployed to: ${deployedWaterPureLog.address}`);
  console.log(`Network: ${hre.network.name}`);
  console.log(`Chain ID: ${hre.network.config.chainId}`);
};

export default func;
func.id = "deploy_waterPureLog"; // id required to prevent reexecution
func.tags = ["WaterPureLog"];

