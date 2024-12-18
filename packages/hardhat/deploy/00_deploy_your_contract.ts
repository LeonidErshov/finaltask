import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";


const privateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

const deployPaymentContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, ethers } = hre;
  const { deploy } = deployments;

  
  const wallet = new ethers.Wallet(privateKey, ethers.provider);
  console.log("Deploying PaymentContract...");

  
  const paymentContract = await deploy("PaymentContract", {
    from: wallet.address,  
    args: [],               
    log: true,              
  });

  console.log("PaymentContract deployed to:", paymentContract.address);
};

export default deployPaymentContract;
deployPaymentContract.tags = ["PaymentContract"];
