// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StudentRecords {
    // Struct to hold student information
    struct Student {
        uint id;
        string name;
        uint age;
    }

    // Mapping from student ID to student struct
    mapping(uint => Student) private students;

    // Event to emit when a new student is added
    event StudentAdded(uint id, string name, uint age);

    // Function to add a student record
    function addStudent(uint _id, string memory _name, uint _age) public {
        // Ensure the student does not already exist
        require(students[_id].id == 0, "Student with this ID already exists.");

        // Create and store the new student
        students[_id] = Student(_id, _name, _age);

        // Emit an event for the new student
        emit StudentAdded(_id, _name, _age);
    }

    // Function to retrieve a student's information by ID
    function getStudent(uint _id) public view returns (uint, string memory, uint) {
        // Ensure the student exists
        require(students[_id].id != 0, "Student with this ID does not exist.");

        // Retrieve the student's information
        Student storage student = students[_id];
        return (student.id, student.name, student.age);
    }
}
