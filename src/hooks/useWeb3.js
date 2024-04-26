import { useState, useEffect } from "react";
import Web3 from "web3";

/**
 * Custom hook for managing Web3 integration and Ethereum wallet connections.
 * This hook provides functionality to connect to an Ethereum wallet, check the network,
 * and access the Web3 instance.
 *
 * @returns {Object} An object containing the Web3 instance, account address, error messages,
 *                   and a method to initiate connection to a wallet.
 */
function useWeb3() {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [error, setError] = useState(null);

  /**
   * Connects to the Ethereum wallet using MetaMask and sets up the Web3 instance.
   * It requests access to the user's accounts and sets the first account.
   */
  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        throw new Error("No Ethereum provider detected. Install MetaMask.");
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const instance = new Web3(window.ethereum);

      setWeb3(instance);
      setAccount(accounts[0]);
      setError(null);
    } catch (err) {
      console.error("Failed to connect wallet:", err);
      setError(err.message);
    }
  };

  /**
   * Detect account changes and network changes if the wallet is connected.
   */
  useEffect(() => {
    const handleAccountsChanged = (accounts) => {
      if (accounts.length === 0) {
        console.error("Please connect to MetaMask.");
        setError("Please connect to MetaMask.");
      } else {
        setAccount(accounts[0]);
      }
    };

    const handleChainChanged = (_chainId) => {
      window.location.reload();
    };

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
      window.ethereum.on("chainChanged", handleChainChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
        window.ethereum.removeListener("chainChanged", handleChainChanged);
      }
    };
  }, []);

  return { web3, account, error, connectWallet };
}

export default useWeb3;
