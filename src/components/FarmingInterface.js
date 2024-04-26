import React, { useState } from "react";
import { Button, Input, VStack, Text, useToast } from "@chakra-ui/react";
import useContract from "../hooks/useContract";

// Placeholder for the actual contract ABI and address
const stakingABI = require("../contracts/StakingContract.json").abi;
const stakingAddress = "0xYourStakingContractAddressHere";

/**
 * A React component that provides an interface for staking and unstaking tokens.
 * This component allows users to interact with a staking smart contract to deposit
 * or withdraw their tokens as part of a yield farming operation.
 *
 * @returns {ReactElement} The component rendering the staking interface.
 */
function FarmingInterface({ account }) {
  const { contract, error } = useContract(stakingABI, stakingAddress);
  const [amount, setAmount] = useState("");
  const toast = useToast();

  /**
   * Handles staking tokens by sending a transaction to the staking contract.
   */
  const handleStake = async () => {
    if (contract && amount) {
      try {
        const transaction = await contract.methods
          .stake(amount)
          .send({ from: account });
        toast({
          title: "Success",
          description: "Tokens staked successfully!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } catch (err) {
        console.error("Staking failed:", err);
        toast({
          title: "Error",
          description: "Staking failed. Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  /**
   * Handles unstaking tokens by sending a transaction to the staking contract.
   */
  const handleUnstake = async () => {
    if (contract && amount) {
      try {
        const transaction = await contract.methods
          .unstake(amount)
          .send({ from: account });
        toast({
          title: "Success",
          description: "Tokens unstaked successfully!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } catch (err) {
        console.error("Unstaking failed:", err);
        toast({
          title: "Error",
          description: "Unstaking failed. Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <VStack spacing={4} align="center">
      <Text fontSize="2xl">Yield Farming Interface</Text>
      <Input
        placeholder="Enter amount to stake/unstake"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <Button colorScheme="teal" onClick={handleStake} isDisabled={!amount}>
        Stake Tokens
      </Button>
      <Button colorScheme="orange" onClick={handleUnstake} isDisabled={!amount}>
        Unstake Tokens
      </Button>
      {error && <Text color="red.500">Error: {error}</Text>}
    </VStack>
  );
}

export default FarmingInterface;
