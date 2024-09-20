// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
// import "./interfaces/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";


contract StakingPool {
    address public owner;
    address tokenAddress;
    // address nftAddress;

    enum stakingPools { Diamond, Emerald, Jasper }

    struct Staker {
        uint8 nftReward;
        uint unlocktime;
        bool investmentDue;
        stakingPools stakePool;
    }

    // Diamond pool mints one NFT after 7 days of investment
    // Emerald pool mints two NFT after 14 days of investment
    // Jasper pool mints three NFT after 21 days of investment
    // One NFT is worth 25 tokens

    mapping (address => Staker) stakerData;
    mapping (address => uint) stakerAmount;

    constructor(address _tokenAddress) {
        owner = msg.sender;
        // nftAddress = _nftAddress;
        tokenAddress = _tokenAddress;
    }

    event DepositSuccesful();


    function stakeInaPool(uint _amount, uint8 stakePoolId) external{
        require(stakePoolId <= 2, "Invalid id");
        require(stakerAmount[msg.sender] == 0, "you have already staked");  // Note
        uint stakerBalance = IERC20(tokenAddress).balanceOf(msg.sender);
        require(stakerBalance > _amount, "insufficient amount to stake");


        IERC20(tokenAddress).transferFrom(msg.sender, address(this), _amount);

        uint8 nftAmount;
        uint unlocktime;
        stakingPools userPoolType;


        if(stakePoolId == 0) {
            nftAmount = 1;
            unlocktime = block.timestamp + (7 * 24 * 60* 60);
            userPoolType = stakingPools.Diamond;
        }

        if(stakePoolId == 1) {
            nftAmount = 2;
            unlocktime = block.timestamp + (14 * 24 * 60* 60);
            userPoolType = stakingPools.Emerald;
        }

        if(stakePoolId == 2) {
            nftAmount = 3;
            unlocktime = block.timestamp + (21 * 24 * 60* 60);
            userPoolType = stakingPools.Jasper;
        }


        
        
        stakerData[msg.sender] = Staker({
            nftReward: nftAmount,
            unlocktime: unlocktime,
            investmentDue: false,
            stakePool: userPoolType
        });

        stakerAmount[msg.sender] = _amount;

        emit DepositSuccesful();

    }

    
    function claimNftReward() external {
        require(block.timestamp > stakerData[msg.sender].unlocktime, "unlocktime not reached");
        uint8 stakerNFTReward = stakerData[msg.sender].nftReward;

        

        // use stakerNFTReward to mint NFT
         

    }

    function exchangeNFTforToken() external {
        // require(block.timestamp > stakerData[msg.sender].unlocktime, "unlocktime not reached");

        // exchange NFT for tokens
        // 1 NFT equals 25 tokens

    }


    function getContractBalance() external view returns(uint256){
        return IERC20(tokenAddress).balanceOf(address(this));
    }

    function getStakerData() external view returns(uint8){
        Staker memory userStakerData = stakerData[msg.sender];
        uint8 nftReward = userStakerData.nftReward;
        return nftReward;
    }
}


// Mint erc1155 NFT
// complete testing
// complete functionality
// onchain script interaction