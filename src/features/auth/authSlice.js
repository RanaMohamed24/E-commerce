import { createSlice } from '@reduxjs/toolkit';

// get state from localStorage if it exists
const loadState = () => {
  try {
    const savedState = localStorage.getItem('authState');

    // If no saved state exists, return initial state
    if (savedState === null) {
      return {
        user: null,
        isAuthenticated: false,
      };
    }
    return JSON.parse(savedState);
  } catch (err) {
    // return initial state as fallback
    return {
      user: null,
      isAuthenticated: false,
    };
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState: loadState(),
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      localStorage.setItem('authState', JSON.stringify(state));
    },
    signupSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      localStorage.setItem('authState', JSON.stringify(state));
    },
    updateUserSuccess: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem('authState', JSON.stringify(state));
    },
    logout: (state) => {
      // Clear all relevant localStorage items
      if (state.user?.id) {
        localStorage.removeItem(`cart_${state.user.id}`);
      }
      localStorage.removeItem('authState');
      localStorage.removeItem('ordersState');  // Remove orders state

      // Reset state
      state.user = null;
      state.isAuthenticated = false;
    }
  }
});

export const { 
  loginSuccess, 
  signupSuccess,
  updateUserSuccess,
  logout 
} = authSlice.actions;

export default authSlice.reducer;