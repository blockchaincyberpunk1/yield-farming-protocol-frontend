# Yield Farming Protocol Frontend

This directory contains the frontend components for the Yield Farming Protocol project. These components are designed to interact with smart contracts deployed on the Ethereum blockchain, allowing users to stake and unstake tokens for yield farming rewards.

## Summary

The frontend consists of React components that provide a user interface for interacting with the smart contracts. Here's a brief overview of the main components:

- **FarmingInterface.js**: This component provides an interface for staking and unstaking tokens. It allows users to interact with a staking smart contract to deposit or withdraw their tokens as part of a yield farming operation.

- **TokenDisplay.js**: This component displays token balances and other relevant contract information. It fetches the token balance for a given account from the blockchain and dynamically updates the display.

- **WalletConnect.js**: This component provides a button for users to connect their Ethereum wallets. It handles wallet connection logic and state management, displaying different UI elements based on the connection status and any errors that might occur.

## Setup and Usage

1. Clone or download the frontend files to your local environment.
2. Install dependencies using npm or yarn: `npm install` or `yarn install`.
3. Run the frontend application using npm or yarn: `npm start` or `yarn start`.
4. Access the application in your web browser at the specified address (usually http://localhost:3000).

Ensure that you have MetaMask or another Ethereum wallet installed and configured in your browser for wallet connectivity.

## Directory Structure

- **components/**: Contains individual React components for different parts of the frontend interface.
- **hooks/**: Contains custom React hooks for managing Web3 integration and contract interactions.
- **contracts/**: Placeholder directory for storing contract ABI and address files.
- **state/**: Contains Redux store setup and slices for managing application state.

## License

The frontend code is provided under the MIT License. See individual files for details.
