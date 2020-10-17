const Diploma = artifacts.require("Uit");

module.exports = function (deployer) {
    deployer.deploy(Diploma, "moncif", "essaoudi");
  };
