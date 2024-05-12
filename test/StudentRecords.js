
const { expect } = require("chai");

describe("StudentRecords contract", function () {
  let StudentRecords;
  let studentRecords;
  let owner;
  let addr1;

  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    StudentRecords = await ethers.getContractFactory("StudentRecords");
    [owner, addr1] = await ethers.getSigners();

    // Deploy a new contract before each test.
    studentRecords = await StudentRecords.deploy();
});

  describe("Deployment", function () {
    it("Should track names and ages of added students", async function () {
      await studentRecords.addStudent(1, "Alice", 20);
      const [id,name,age] = await studentRecords.getStudent(1);
      expect(name).to.equal("Alice");
      expect(age).to.equal(20);
    });
  });

  describe("Adding students", function () {
    it("Should emit StudentAdded event on adding a student", async function () {
      await expect(studentRecords.addStudent(1, "Bob", 21))
        .to.emit(studentRecords, "StudentAdded")
        .withArgs(1, "Bob", 21);
    });

    it("Should fail when adding a student with existing ID", async function () {
      await studentRecords.addStudent(1, "Charlie", 22);
      await expect(studentRecords.addStudent(1, "Charlie", 23)).to.be.revertedWith("Student with this ID already exists.");
    });
  });

  describe("Retrieving students", function () {
    it("Should return the correct student records", async function () {
      await studentRecords.addStudent(2, "Dave", 22);
      const [id,name,age] = await studentRecords.getStudent(2);
      expect(name).to.equal("Dave");
      expect(age).to.equal(22);
    });

    it("Should revert when trying to get a non-existent student", async function () {
      await expect(studentRecords.getStudent(999)).to.be.revertedWith("Student with this ID does not exist.");
    });
  });
});
