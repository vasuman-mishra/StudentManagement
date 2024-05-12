import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { BrowserProvider, parseUnits, Contract } from "ethers";
import abi from './contractJson/StudentRecords.json'

function App() {
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [students, setStudents] = useState({id: '', name: '', age: ''});
  const [inputs, setInputs] = useState({ id: '', name: '', age: '' });

  // Replace 'YOUR_CONTRACT_ADDRESS' with your contract's address
  const contractAddress = '0x6953c4A0289507797EDb1e006d3c1F46efbdDaF9';
  // Replace 'YOUR_CONTRACT_ABI' with your contract's ABI
  const contractABI = abi.abi;

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const contract = new Contract(contractAddress, contractABI, signer);
          setProvider(provider);
          setContract(contract);
        } catch (error) {
          console.error('Error connecting to Metamask', error);
        }
      } else {
        console.log('Please install Metamask.');
      }
    };

    init();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs(prevState => ({ ...prevState, [name]: value }));
  };

  const addStudent = async () => {
    const { id, name, age } = inputs;
    if (!id || !name || !age) {
      alert('All fields are required!');
      return;
    }
    try {
      const tx = await contract.addStudent(id, name, age);
      await tx.wait();
      alert('Student added successfully!');
    } catch (error) {
      console.error('Error adding student', error);
      alert('Failed to add student.');
    }
  };

  const getStudent = async () => {
    const { id } = inputs;
    if (!id) {
      alert('Student ID is required!');
      return;
    }
    try {
      const [id1,name,age] = await contract.getStudent(id);
      console.log(id1,name,age);
      const age1 = age.toString(); 
      console.log(age1);     
      setStudents({ id:id, name:name, age:age1});
      console.log(students);
    } catch (error) {
      console.error('Error fetching student', error);
      alert('Failed to fetch student.');
    }
  };

  return (
    <div>
      <h1>Student Records</h1>
      <div>
        <input name="id" value={inputs.id} onChange={handleInputChange} placeholder="Student ID" />
        <input name="name" value={inputs.name} onChange={handleInputChange} placeholder="Student Name" />
        <input name="age" value={inputs.age} onChange={handleInputChange} placeholder="Student Age" />
        <button onClick={addStudent}>Add Student</button>
        <button onClick={getStudent}>Get Student</button>
      </div>
      {students.name && (
        <div>
          <h2>Student Details</h2>
          <p>ID: {students.id}</p>
          <p>Name: {students.name}</p>
          <p>Age: {students.age}</p>
        </div>
      )}
    </div>
  );
}

export default App;