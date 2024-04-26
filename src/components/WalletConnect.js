import React from "react";
import { Button, Box, Text } from "@chakra-ui/react";
import useWeb3 from "../hooks/useWeb3";

/**
 * A React component that provides a button for users to connect their Ethereum wallets.
 * This component uses the useWeb3 hook to handle wallet connection logic and state management,
 * displaying different UI elements based on the connection status and any errors that might occur.
 *
 * @returns {ReactElement} Renders a button to initiate wallet connection and displays relevant status messages.
 */
function WalletConnect() {
  const { web3, account, error, connectWallet } = useWeb3();

  return (
    <Box padding="4" bg="gray.100" borderRadius="lg" textAlign="center">
      {web3 && account ? (
        <Text>Welcome, your account is: {account}</Text>
      ) : (
        <Button colorScheme="blue" onClick={connectWallet}>
          Connect Wallet
        </Button>
      )}
      {error && <Text color="red.500">Error: {error}</Text>}
    </Box>
  );
}

export default WalletConnect;
