const IPFS = require("ipfs-http-client");
module.exports = new IPFS({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https"
});
