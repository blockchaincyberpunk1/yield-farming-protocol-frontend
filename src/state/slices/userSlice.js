import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Web3 from "web3";

// Assume you have a web3 instance and contracts already set up and exported from a service file
import { tokenContract, stakingContract } from "../../services/blockchain";

/**
 * Async thunk to fetch the token balance for a specified Ethereum account.
 * This thunk communicates with the blockchain to retrieve token balances.
 *
 * @param {string} account - The Ethereum account address.
 */
export const fetchTokenBalance = createAsyncThunk(
  "user/fetchTokenBalance",
  async (account, { rejectWithValue }) => {
    try {
      if (!account) throw new Error("Account address is required.");
      const balance = await tokenContract.methods.balanceOf(account).call();
      return Web3.utils.fromWei(balance, "ether");
    } catch (error) {
      console.error("Error fetching token balance:", error);
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Async thunk to fetch the staked amount for a specified Ethereum account.
 * This thunk interacts with a staking contract to get the amount of tokens staked by the user.
 *
 * @param {string} account - The Ethereum account address.
 */
export const fetchStakedAmount = createAsyncThunk(
  "user/fetchStakedAmount",
  async (account, { rejectWithValue }) => {
    try {
      if (!account) throw new Error("Account address is required.");
      const amount = await stakingContract.methods.stakedAmount(account).call();
      return Web3.utils.fromWei(amount, "ether");
    } catch (error) {
      console.error("Error fetching staked amount:", error);
      return rejectWithValue(error.message);
    }
  }
);

/**
 * User slice containing the state and reducers to manage user data such as token balances and staked amounts.
 */
const userSlice = createSlice({
  name: "user",
  initialState: {
    tokenBalance: 0,
    stakedAmount: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTokenBalance.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTokenBalance.fulfilled, (state, action) => {
        state.tokenBalance = action.payload;
        state.loading = false;
      })
      .addCase(fetchTokenBalance.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(fetchStakedAmount.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStakedAmount.fulfilled, (state, action) => {
        state.stakedAmount = action.payload;
        state.loading = false;
      })
      .addCase(fetchStakedAmount.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default userSlice.reducer;
