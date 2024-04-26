import { useState, useEffect } from "react";
import Web3 from "web3";

/**
 * A custom React hook to instantiate and interact with a smart contract.
 * This hook abstracts the details of creating and using Web3 contract instances,
 * making it easier to interact with contracts within React components.
 *
 * @param {string} contractABI - The ABI of the contract.
 * @param {string} contractAddress - The address of the deployed contract.
 * @returns {Object} An object containing the contract instance and any errors encountered.
 */
function useContract(contractABI, contractAddress) {
  const [contract, setContract] = useState(null);
  const [error, setError] = useState(null);

  /**
   * Initialize the contract instance using the provided ABI and contract address.
   * This requires a Web3 instance and an Ethereum provider (e.g., MetaMask).
   */
  useEffect(() => {
    const loadContract = async () => {
      try {
        if (!window.ethereum) {
          throw new Error(
            "Ethereum provider not found. Install MetaMask or another wallet."
          );
        }

        const provider = window.ethereum;
        const web3 = new Web3(provider);

        // Create a new contract instance with the provided ABI and address
        const newContract = new web3.eth.Contract(contractABI, contractAddress);
        setContract(newContract);
      } catch (err) {
        console.error("Failed to load contract:", err);
        setError(err.message);
      }
    };

    loadContract();
  }, [contractABI, contractAddress]);

  return { contract, error };
}

export default useContract;
