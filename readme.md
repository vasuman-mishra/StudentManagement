
# Student Management Portal using Blockchain

This project contains the implementation of a Student Management Portal which is deployed on Sepolia Testnet using HardHat and the FrontEnd is provided by React.js





## Deployment(to be put in terminal)

To install the packages

```bash
  npm install
```

To install the hardhat-tool-box:

```bash
  npm install --save-dev @nomicfoundation/hardhat-toolbox
```

To compile the solidity file:

```bash
  npx hardhat compile
```
To compile the test file:

```bash
  npx hardhat test
```
To set the configuration variables(infura api key for sepolia and private metamask wallet address):

```bash
  npx hardhat vars set INFURA_API_KEY
```
```bash
  npx hardhat vars set SEPOLIA_PRIVATE_KEY
```
To Depoly the contract:

```bash
  npx hardhat ignition deploy ./ignition/modules/StudentRecords.js --network sepolia
```
To shift to frontend directory:

```bash
 cd frontend
```
To install the packges for frontend:

```bash
 npm install
```
To deploy the website:

```bash
  npm run dev
```
