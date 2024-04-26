import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Web3 from "web3";

/**
 * Async thunk to initiate connection to Ethereum network.
 * This function attempts to connect to the Ethereum network using Web3 and the user's wallet.
 * It handles checking for Ethereum provider and requesting accounts access.
 */
export const connectToBlockchain = createAsyncThunk(
  "blockchain/connect",
  async (_, { rejectWithValue }) => {
    try {
      const provider = window.ethereum;
      if (!provider) {
        return rejectWithValue(
          "No Ethereum provider found. Make sure you have MetaMask installed."
        );
      }
      const accounts = await provider.request({
        method: "eth_requestAccounts",
      });
      const web3 = new Web3(provider);
      const networkId = await web3.eth.net.getId();
      return { accounts, networkId };
    } catch (error) {
      console.error("Failed to connect to blockchain:", error);
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Blockchain slice containing the initial state and reducers for managing
 * connection status and the current Ethereum account.
 */
const blockchainSlice = createSlice({
  name: "blockchain",
  initialState: {
    isConnected: false,
    account: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(connectToBlockchain.pending, (state) => {
        state.error = null;
      })
      .addCase(connectToBlockchain.fulfilled, (state, action) => {
        state.isConnected = true;
        state.account = action.payload.accounts[0];
        state.error = null;
      })
      .addCase(connectToBlockchain.rejected, (state, action) => {
        state.error = action.payload;
        state.isConnected = false;
        state.account = null;
      });
  },
});

export default blockchainSlice.reducer;
