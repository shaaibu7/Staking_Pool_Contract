import { ethers } from "hardhat";

async function main() {
    const MyTokenAddress = "0xaa070c4DdF63A2e9231a58370c1270B7D6D42727";
    const tokenAddress = await ethers.getContractAt("IERC20", MyTokenAddress);

    const StakingPoolContractAddress = "0xa7B6Bfea9AA15BAAb528DbD755Cc904807aF79d6";
    const stakingPool = await ethers.getContractAt("IStakingPool", StakingPoolContractAddress);

    // Approve savings contract to spend token
    const approvalAmount = ethers.parseUnits("1000", 18);

    const approveTx = await tokenAddress.approve(stakingPool, approvalAmount);
    approveTx.wait();

    const contractBalanceBeforeDeposit = await stakingPool.getContractBalance();
    console.log("Contract balance before :::", contractBalanceBeforeDeposit);

    const stakeAmount = ethers.parseUnits("150", 18);
    const depositTx = await stakingPool.stakeInaPool(stakeAmount, 1);

    // console.log(depositTx);

    depositTx.wait();

    const contractBalanceAfterDeposit = await stakingPool.getContractBalance();

    console.log("Contract balance after :::", contractBalanceAfterDeposit);

    
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
