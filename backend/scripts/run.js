const main = async () => {
  const upgradeableNFTContractFactory = await hre.ethers.getContractFactory(
    "UpgradeableNFT"
  );
  const upgradeableNFTContract = await upgradeableNFTContractFactory.deploy();
  await upgradeableNFTContract.deployed();

  console.log("Deployed To: ", upgradeableNFTContract.address);

  const [owner] = await hre.ethers.getSigners();
  console.log("Deployed By: ", owner.address);

  const mint = await upgradeableNFTContract.mint("");
  await mint;
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
