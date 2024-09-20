const hre = require("hardhat");

async function main() {
  console.log("Deploying OnChainNFT contract...");

  // Deploy the Base64 library first
  const Base64 = await hre.ethers.getContractFactory("Base64");
  const base64 = await Base64.deploy();
  await base64.deployed();
  console.log("Base64 library deployed to:", base64.address);

  // Deploy the OnChainNFT contract
  const OnChainNFT = await hre.ethers.getContractFactory("OnChainNFT", {
    libraries: {
      Base64: base64.address,
    },
  });
  const onChainNFT = await OnChainNFT.deploy();
  await onChainNFT.deployed();

  console.log("OnChainNFT deployed to:", onChainNFT.address);

  // Mint an initial NFT to test the contract
  console.log("Minting initial NFT...");
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="500" height="500"><rect width="100%" height="100%" fill="blue"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="24">OnChain NFT</text></svg>';
  const mintTx = await onChainNFT.mint(svg, 1);
  await mintTx.wait();

  console.log("Initial NFT minted!");

  // Fetch and log the token URI for the minted NFT
  const tokenURI = await onChainNFT.uri(1);
  console.log("Token URI for minted NFT:", tokenURI);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });