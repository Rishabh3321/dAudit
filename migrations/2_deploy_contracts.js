const dAudit = artifacts.require("dAudit");

module.exports = function(deployer) {
  deployer.deploy(dAudit);
};
