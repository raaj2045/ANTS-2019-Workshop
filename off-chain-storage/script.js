const web3 = require("./ethereum/web3");
const ipfs = require("./ipfs");
const fs = require("fs-extra");
const iotContract = require("./ethereum/iot-contract");
const upload = async () => {
  //Script to run

  //Read file from local drive
  console.log("Reading file from local storage...");
  const jsonFile = fs.readFileSync("./iot-data.json");

  //Upload file to IPFS
  console.log("Uploading file to IPFS...");
  const response = await ipfs.add(jsonFile);

  //Take out the ipfs hash returned in response
  const ipfshash = response[0].hash;
  console.log("IPFS hash retrieved...");

  //Get the ethereum account from which we call the smart contract
  console.log("Getting accounts from web3...");
  const accounts = await web3.eth.getAccounts();

  console.log("Recording time of upload...");
  const time = Date.now();

  console.log(
    "Using account[0] to call the smart contract function to store data...."
  );
  await iotContract.methods
    .setIotData(ipfshash, time)
    .send({ from: accounts[0] });
  console.log("Data successfully uploaded to blockchain.");

  //Exit the script with status 0 which means no error occured
  process.exit(0);
};
const download = async () => {
  console.log("Calling smart contract to get array data count...");
  const count = await iotContract.methods.getIotDataArrayLength().call();

  console.log("Fetching ipfsHash from ethereum using a for loop...");
  for (var i = 0; i < count; i++) {
    console.log("Retrieving ipfs hash of file " + (i + 1));
    var ethereumData = await iotContract.methods.getIotDataByIndex(i).call();
    var ipfsHash = ethereumData[0];
    console.log("Using ipfs hash to retrieve file " + (i + 1));
    var response = await ipfs.get(ipfsHash);

    //Get the content out of the response
    var buffer = response[0].content;

    //Convert the buffer into a Javascript Object for further processing
    console.log("Showing content of file " + i);
    var jsonData = JSON.parse(buffer.toString());
    console.log(jsonData);
  }

  //Exit the script with status 0 which means no error occured
  process.exit(0);
};

//Remove comment below to upload
// upload();

//Remove comment below to download
download();
