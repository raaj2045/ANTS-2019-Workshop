const web3 = require("./web3");

//Build file to call methods through RPC
const iotContract = require("./build/IotContract.json");

//Address of the deployed contract
const iotContractAddress = "0x2D682978dB2618d174bE6aAfc9023C3B69ca7D21";

module.exports = new web3.eth.Contract(
  JSON.parse(iotContract.interface),
  iotContractAddress
);
