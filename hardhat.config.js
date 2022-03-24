require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-gas-reporter");
const dotenv = require("dotenv");
dotenv.config();

const { HardhatUserConfig, task } = require("hardhat/config");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 module.exports = {
    networks: {      
      rinkeby: {
        url: process.env.RINKEBY_URL || "",
        accounts:
          // process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
          process.env.KEY_MNEMONIC !== undefined ? { mnemonic: process.env.KEY_MNEMONIC} : {},        
      }      
    },
    solidity: {
      compilers: [
        {
          version: "0.8.0"
        },
        {
          version: "0.8.1"
        },
        {
          version: "0.8.2"
        }
      ],
      paths: {
        sources: "./contracts",
        tests: "./test",
        cache: "./cache",
        artifacts: "./artifacts"
      },
      settings: {
        optimizer: {
          enabled: true,
          runs: 5000,
        },
      },
    },    
    gasReporter: {
      enabled: process.env.REPORT_GAS !== undefined,
      currency: "USD",
    },
    etherscan: {
      apiKey: process.env.ETHERSCAN_API_KEY,
    },
  };