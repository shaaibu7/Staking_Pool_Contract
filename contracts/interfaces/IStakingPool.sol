// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.17;

interface IStakingPool {
    function stakeInaPool(uint _amount, uint8 stakePoolId) external;

    function claimNftReward() external;

    function exchangeNFTforToken() external;

    function getContractBalance() external view returns(uint256);

    function getStakerData() external view returns(uint8);


}