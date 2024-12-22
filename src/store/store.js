import { configureStore } from '@reduxjs/toolkit';


// auth reducer handles all auth-related state changes
import authReducer from '../features/auth/authSlice';
import ordersReducer from '../features/orders/ordersSlice.js';

export const store = configureStore({
  reducer: {
    // our auth state will be accessible at state.auth
    // includes user data, authentication status
    auth: authReducer,
    orders: ordersReducer,
  },
});