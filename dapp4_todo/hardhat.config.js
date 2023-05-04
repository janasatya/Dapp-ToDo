require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  defaultNetwork:"sepolia",
  networks:{
    sepolia:{
      url:process.env.URI,
      accounts:[process.env.PRIVATE_KEY]
    }
  }
  
};

//   }