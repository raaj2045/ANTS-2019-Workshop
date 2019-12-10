const IPFS = require("ipfs-http-client");


//Configuring IPFS to use Infura IPFS API
module.exports = new IPFS({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https"
});
