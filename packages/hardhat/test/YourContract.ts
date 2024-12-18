import { expect } from "chai";
import { ethers } from "hardhat";

describe("PaymentContract", function () {
  let paymentContract: any;
  let owner: any;

  before(async () => {
    
    [owner] = await ethers.getSigners();

    
    const PaymentContractFactory = await ethers.getContractFactory("PaymentContract");

    
    paymentContract = await PaymentContractFactory.deploy();
  });

  describe("Deployment", function () {
    it("Должен развернуть контракт с правильным владельцем", async function () {
      expect(await paymentContract.owner()).to.equal(owner.address);
    });
  });
});
