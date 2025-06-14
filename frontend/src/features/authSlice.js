import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/axios'; // updated import

export const fetchUser = createAsyncThunk('auth/fetchUser', async () => {
  const res = await axiosInstance.get('/auth/me');
  return res.data.user;
});


const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, loading: true },
  reducers: {
    logout(state) { 
      state.user = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.user = null;
        state.loading = false;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
