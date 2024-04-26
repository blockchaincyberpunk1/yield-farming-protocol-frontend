import React, { useEffect } from 'react';
import { ChakraProvider, Box, CSSReset, theme } from '@chakra-ui/react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import store from './state/store';
import WalletConnect from './components/WalletConnect';
import TokenDisplay from './components/TokenDisplay';
import FarmingInterface from './components/FarmingInterface';
import { updateAccount } from './state/slices/blockchainSlice';

/**
 * The main component that integrates all parts of the DApp frontend.
 * It connects React components to the Redux store and Web3 functionalities,
 * handling state management, blockchain interactions, and UI consistency.
 *
 * @returns {ReactElement} The main application component rendering the DApp interface.
 */
function App() {
  const { web3, account } = useSelector(state => state.blockchain);
  const dispatch = useDispatch();

  /**
   * Handle changes in account or network by updating the Redux store.
   */
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          dispatch(updateAccount(accounts[0]));
        } else {
          // Handle the case where the user disconnects their account
          dispatch(updateAccount(null));
        }
      });

      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }
  }, [dispatch]);

  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <CSSReset />
        <Box p={5}>
          <WalletConnect />
          {account && (
            <>
              <TokenDisplay account={account} />
              <FarmingInterface account={account} />
            </>
          )}
        </Box>
      </ChakraProvider>
    </Provider>
  );
}

export default App;
