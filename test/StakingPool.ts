import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre, { ethers } from "hardhat";
// import "../contracts/interface/IERC20.sol"

describe("StakingPool", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
   
  async function deployToken() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount, account1] = await hre.ethers.getSigners();

    const erc20Token = await hre.ethers.getContractFactory("MyToken");
    const token = await erc20Token.connect(account1).deploy();

    return { token };
  }

  async function deployStakingPool() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const { token } = await loadFixture(deployToken)

    const StakingPoolContract = await hre.ethers.getContractFactory("StakingPool");
    // const StakingPool = await StakingPoolContract.connect(owner).deploy(token);
    const StakingPool = await StakingPoolContract.deploy(token);


    return { StakingPool, owner, otherAccount, token };
  }

  describe("Test for contract deployment", function () {
    it("Should pass if owner is correct", async function () {
      const { StakingPool, owner, otherAccount  } = await loadFixture(deployStakingPool);

      expect(await StakingPool.owner()).to.equal(owner);
    });

    it("Should fail if owner is incorrect", async function () {
      const { StakingPool, owner, otherAccount  } = await loadFixture(deployStakingPool);
    

      expect(await StakingPool.owner()).to.not.eq(otherAccount);
    });

    
  });

  describe("Test stake function", function () {
    it("Should fail if wrong stakingPool Id is passed as argument" , async function () {
      const { StakingPool, owner, otherAccount  } = await loadFixture(deployStakingPool);

      await expect(StakingPool.stakeInaPool(1000, 4)).to.be.revertedWith("Invalid id")
    });

     
    it("Testing deposit functionality" , async function () {
      const { StakingPool, owner, otherAccount, token  } = await loadFixture(deployStakingPool);
    

      const trfAmount = ethers.parseUnits("100", 18);
      await token.transfer(otherAccount, trfAmount);
      expect(await token.balanceOf(otherAccount)).to.eq(trfAmount);

      //using otherAccount to approve StakingPoolContract to spend token
      await token.connect(otherAccount).approve(StakingPool, trfAmount);

      const otherAccountBal = await token.balanceOf(otherAccount);

      const depositAmount = ethers.parseUnits("10", 18);
      const testDepositAmount = ethers.parseUnits("11", 18)

      // using otheraccount to call stakeInaPool function
      await StakingPool.connect(otherAccount).stakeInaPool(depositAmount, 1);

      expect(await token.balanceOf(otherAccount)).to.eq(otherAccountBal - depositAmount);

      expect(await StakingPool.getContractBalance()).to.equal(depositAmount);
      
      
    })

    
    it("check staker details" , async function () {
      const { StakingPool, owner, otherAccount, token  } = await loadFixture(deployStakingPool);
    

      const trfAmount = ethers.parseUnits("100", 18);
      await token.transfer(otherAccount, trfAmount);
      expect(await token.balanceOf(otherAccount)).to.eq(trfAmount);

      //using otherAccount to approve StakingPoolContract to spend token
      await token.connect(otherAccount).approve(StakingPool, trfAmount);

      const otherAccountBal = await token.balanceOf(otherAccount);

      const depositAmount = ethers.parseUnits("10", 18);
      const testDepositAmount = ethers.parseUnits("11", 18)

      // using otheraccount to call stakeInaPool function
      await StakingPool.connect(otherAccount).stakeInaPool(depositAmount, 1);

      expect(await token.balanceOf(otherAccount)).to.eq(otherAccountBal - depositAmount);

      expect(await StakingPool.getContractBalance()).to.equal(depositAmount);

      const userStakeDetails = await StakingPool.connect(otherAccount).getStakerData();

      
      expect(await StakingPool.connect(otherAccount).getStakerData()).to.eq(2);
      
      
    })

    it("check staker details with pool id 2" , async function () {
      const { StakingPool, owner, otherAccount, token  } = await loadFixture(deployStakingPool);
    

      const trfAmount = ethers.parseUnits("100", 18);
      await token.transfer(otherAccount, trfAmount);
      expect(await token.balanceOf(otherAccount)).to.eq(trfAmount);

      //using otherAccount to approve StakingPoolContract to spend token
      await token.connect(otherAccount).approve(StakingPool, trfAmount);

      const otherAccountBal = await token.balanceOf(otherAccount);

      const depositAmount = ethers.parseUnits("10", 18);
      const testDepositAmount = ethers.parseUnits("11", 18)

      // using otheraccount to call stakeInaPool function
      await StakingPool.connect(otherAccount).stakeInaPool(depositAmount, 2);

      expect(await token.balanceOf(otherAccount)).to.eq(otherAccountBal - depositAmount);

      expect(await StakingPool.getContractBalance()).to.equal(depositAmount);

      const userStakeDetails = await StakingPool.connect(otherAccount).getStakerData();

      
      expect(await StakingPool.connect(otherAccount).getStakerData()).to.eq(3);
      
      
    })

    it("check staker details with pool id 0" , async function () {
      const { StakingPool, owner, otherAccount, token  } = await loadFixture(deployStakingPool);
    

      const trfAmount = ethers.parseUnits("100", 18);
      await token.transfer(otherAccount, trfAmount);
      expect(await token.balanceOf(otherAccount)).to.eq(trfAmount);

      //using otherAccount to approve StakingPoolContract to spend token
      await token.connect(otherAccount).approve(StakingPool, trfAmount);

      const otherAccountBal = await token.balanceOf(otherAccount);

      const depositAmount = ethers.parseUnits("10", 18);
      const testDepositAmount = ethers.parseUnits("11", 18)

      // using otheraccount to call stakeInaPool function
      await StakingPool.connect(otherAccount).stakeInaPool(depositAmount, 0);

      expect(await token.balanceOf(otherAccount)).to.eq(otherAccountBal - depositAmount);

      expect(await StakingPool.getContractBalance()).to.equal(depositAmount);

      const userStakeDetails = await StakingPool.connect(otherAccount).getStakerData();

      
      expect(await StakingPool.connect(otherAccount).getStakerData()).to.eq(1);
      
      
    })

    it("check staker details with pool id 0" , async function () {
      const { StakingPool, owner, otherAccount, token  } = await loadFixture(deployStakingPool);
    

      const trfAmount = ethers.parseUnits("100", 18);
      await token.transfer(otherAccount, trfAmount);
      expect(await token.balanceOf(otherAccount)).to.eq(trfAmount);

      //using otherAccount to approve StakingPoolContract to spend token
      await token.connect(otherAccount).approve(StakingPool, trfAmount);

      const otherAccountBal = await token.balanceOf(otherAccount);

      const depositAmount = ethers.parseUnits("10", 18);
      const testDepositAmount = ethers.parseUnits("11", 18)

      // using otheraccount to call stakeInaPool function
      await StakingPool.connect(otherAccount).stakeInaPool(depositAmount, 0);

      expect(await token.balanceOf(otherAccount)).to.eq(otherAccountBal - depositAmount);

      expect(await StakingPool.getContractBalance()).to.equal(depositAmount);

      const userStakeDetails = await StakingPool.connect(otherAccount).getStakerData();

      
      expect(await StakingPool.connect(otherAccount).getStakerData()).to.eq(1);
      
      
    })


    it("check staker unlocktime" , async function () {
      const { StakingPool, owner, otherAccount, token  } = await loadFixture(deployStakingPool);
    

      const trfAmount = ethers.parseUnits("100", 18);
      await token.transfer(otherAccount, trfAmount);
      expect(await token.balanceOf(otherAccount)).to.eq(trfAmount);

      //using otherAccount to approve StakingPoolContract to spend token
      await token.connect(otherAccount).approve(StakingPool, trfAmount);

      const otherAccountBal = await token.balanceOf(otherAccount);

      const depositAmount = ethers.parseUnits("10", 18);
      const testDepositAmount = ethers.parseUnits("11", 18)

      // using otheraccount to call stakeInaPool function
      await StakingPool.connect(otherAccount).stakeInaPool(depositAmount, 0);

      expect(await token.balanceOf(otherAccount)).to.eq(otherAccountBal - depositAmount);

      expect(await StakingPool.getContractBalance()).to.equal(depositAmount);

      const userStakeDetails = await StakingPool.connect(otherAccount).getStakerData();

      
      expect(await StakingPool.connect(otherAccount).getStakerData()).to.eq(1);
      
      
    })


    

  });

})
