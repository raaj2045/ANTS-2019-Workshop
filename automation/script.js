const web3 = require("./ethereum/web3");
const ipfs = require("./ipfs");
const fs = require("fs-extra");
const iotContract = require("./ethereum/iot-contract");
var schedule = require("node-schedule");

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
};

//PARAMETERS IN NODE SCHEDULE
// *    *    *    *    *    *
// ┬    ┬    ┬    ┬    ┬    ┬
// │    │    │    │    │    │
// │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
// │    │    │    │    └───── month (1 - 12)
// │    │    │    └────────── day of month (1 - 31)
// │    │    └─────────────── hour (0 - 23)
// │    └──────────────────── minute (0 - 59)
// └───────────────────────── second (0 - 59, OPTIONAL)

// Execute a cron job every 5 Minutes = */5 * * * *

var j = schedule.scheduleJob("/30 * * * * *", function() {
  console.log("Time to upload!");
  upload();
});
