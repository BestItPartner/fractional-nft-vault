// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { hre, ethers } = require("hardhat");
const { Signer } = require("ethers");
const { hexValue } = require("ethers/lib/utils");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  const addresses = await ethers.provider.listAccounts();

  // We get the contract to deploy
  const Settings = await ethers.getContractFactory("Settings");
  const settings = await Settings.deploy();
  await settings.deployed();
  console.log("Settings: ", settings.address);
  await settings.setGovernanceFee(10);

  const ERC721VaultFactory = await ethers.getContractFactory("ERC721VaultFactory");
  const factory = await ERC721VaultFactory.deploy(settings.address);
  await factory.deployed();
  console.log("ERC721VaultFactory: ", factory.address);

  const TestERC721 = await ethers.getContractFactory("TestERC721");
  const token = await TestERC721.deploy();
  await token.deployed();
  console.log("TestERC721: ", token.address);
  await token.mint(addresses[0], 1);
  await token.setApprovalForAll(factory.address, true);

  const wei = ethers.utils.parseUnits("1.0", "ether");  
  const decimal = ethers.utils.parseUnits("1.0", 20);
  await factory.mint("testName", "TEST", token.address, 1, decimal, wei, 50);
  
  const vault = await ethers.getContractAt("TokenVault", await factory.vaults(0));
  console.log("TokenVault: ", vault.address);
  const erc20 = await vault.balanceOf(addresses[0]);
  console.log("ERC20 Balance: ", erc20);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
