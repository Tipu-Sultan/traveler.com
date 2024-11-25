// src/redux/slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../services/authServices';

const initialState = {
  user: null,
  step:1,
  PaymentAndBookingData:null,
  loading: 'idle',
  error: null,
  message: null,
};

export const registerUser = createAsyncThunk('auth/register', authService.registerUser);
export const login = createAsyncThunk('auth/login', authService.login);
export const googleLogin = createAsyncThunk('auth/googleLogin', authService.googleLogin);
export const sendOtp = createAsyncThunk('auth/sendOtp', authService.sendOtp);
export const resetPassword = createAsyncThunk('auth/resetPassword', authService.resetPassword);
export const fetchUserData = createAsyncThunk('auth/fetchUserData', authService.fetchUserData);
export const verifyEmail = createAsyncThunk('auth/verifyEmail', authService.verifyEmail);
export const updateUser = createAsyncThunk('users/updateUser', authService.updateUser);
export const updateProfileImage = createAsyncThunk('users/updateProfileImage', authService.updateProfileImage);


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      localStorage.removeItem('token');
      localStorage.setItem('isAuthenticated', false);
    },
    setStep: (state, action) => {
      state.step = action.payload; 
    },
    setLoadingState: (state, action) => {
      state.loading = action.payload; 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = 'register';
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.message = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.loading = 'login';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.user = action.payload.user;
        state.PaymentAndBookingData = action.payload.bookings;
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        localStorage.setItem('isAuthenticated', true);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.error.message;
        localStorage.removeItem('token');
        localStorage.setItem('isAuthenticated', false);
      })
      .addCase(googleLogin.pending, (state) => {
        state.loading = 'googleLogin';
        state.error = null;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.user = action.payload.user;
        state.PaymentAndBookingData = action.payload.bookings;
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        localStorage.setItem('isAuthenticated', true);
      })
      .addCase(googleLogin.rejected, (state) => {
        state.loading = 'idle';
      })
      .addCase(fetchUserData.pending, (state) => {
        state.loading = 'userLoading';
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.user = action.payload.user;
        state.PaymentAndBookingData = action.payload.packageData;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.error.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = 'editUser';
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.user = action.payload.user;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.payload;
      })
      .addCase(verifyEmail.pending, (state) => {
        state.loading = 'verifyEmail';
        state.error = null;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.message = action.payload.message;
        state.error = null;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.message = action.payload
        state.loading = 'idle';
        state.error = true;
      })
      .addCase(updateProfileImage.pending, (state) => {
        state.loading = 'editImage';
        state.error = null;
      })
      .addCase(updateProfileImage.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.user = {
          ...state.user,
          profileImage: action.payload.profileImage, 
        };
        state.message = action.payload.message
      })
      .addCase(updateProfileImage.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.payload;
      })
      .addCase(sendOtp.pending, (state) => {
        state.loading = 'sendOtp';
        state.error = null;
      })
      .addCase(sendOtp.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.message = action.payload.message;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.payload;
      })
      
      .addCase(resetPassword.pending, (state) => {
        state.loading = 'resetPassword';
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.message = action.payload.message;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.payload;
      })
      ;
  },
});

export const { logout,setStep,setLoadingState } = authSlice.actions;

export default authSlice.reducer;
