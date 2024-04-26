import React, { useEffect, useState } from "react";
import { Box, Text, VStack } from "@chakra-ui/react";
import useContract from "../hooks/useContract";

// You would replace these placeholders with your actual contract ABI and address
const tokenABI = require("../contracts/Token.json").abi;
const tokenAddress = "0xYourContractAddressHere";

/**
 * A React component that displays token balances and other relevant contract information.
 * This component utilizes a custom hook to create a contract instance and fetches the balance
 * from the blockchain. It handles errors and displays the token balance dynamically.
 *
 * @returns {ReactElement} Renders information about token balances and displays relevant messages.
 */
function TokenDisplay({ account }) {
  const { contract, error } = useContract(tokenABI, tokenAddress);
  const [tokenBalance, setTokenBalance] = useState("");

  /**
   * Fetches the token balance for a given account from the blockchain.
   */
  useEffect(() => {
    if (contract && account) {
      const fetchBalance = async () => {
        try {
          const balance = await contract.methods.balanceOf(account).call();
          setTokenBalance(balance);
        } catch (err) {
          console.error("Error fetching token balance:", err);
        }
      };
      fetchBalance();
    }
  }, [contract, account]);

  return (
    <VStack
      spacing={4}
      p={4}
      bg="gray.100"
      borderRadius="lg"
      boxShadow="md"
      align="center"
    >
      <Text fontSize="xl" fontWeight="bold">
        Token Balance
      </Text>
      {contract ? (
        <Text>{tokenBalance ? `${tokenBalance} Tokens` : "Loading..."}</Text>
      ) : (
        <Text>Connect to a wallet to see your balance.</Text>
      )}
      {error && <Text color="red.500">Error: {error}</Text>}
    </VStack>
  );
}

export default TokenDisplay;
