const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const compiledIotContract = require("./build/IotContract.json");

const provider = new HDWalletProvider(
  "arch piece seat curtain fitness tunnel oblige upper news execute lesson bounce",
  "https://rinkeby.infura.io/v3/04280dc3e8a2405db2111ac4490d86be"
);

const web3 = new Web3(provider);

const deploy = async () => {
  try {
    const accounts = await web3.eth.getAccounts();
    console.log("Attempting to deploy from account", accounts[0]);

    const IotContract = await new web3.eth.Contract(
      JSON.parse(compiledIotContract.interface)
    )
      .deploy({ data: "0x" + compiledIotContract.bytecode })
      .send({ from: accounts[0], gas: "4000000" });

    console.log("IotContract deployed at " + IotContract.options.address);
    process.exit(0);
  } catch (err) {
    console.log(err.message);
  }
};

deploy();
