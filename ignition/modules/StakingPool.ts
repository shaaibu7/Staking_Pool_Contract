import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const tokenAddress = "0xaa070c4DdF63A2e9231a58370c1270B7D6D42727";

const StakingPoolModule = buildModule("StakingPoolModule", (m) => {

    const save = m.contract("StakingPool", [tokenAddress]);

    return { save };
});

export default StakingPoolModule;
