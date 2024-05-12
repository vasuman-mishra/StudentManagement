const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const StudentModule = buildModule("StudentModule", (m) => {
  const token = m.contract("StudentRecords");

  return { token };
});

module.exports = StudentModule;
