import { createSlice } from '@reduxjs/toolkit';

// get state from localStorage if it exists
const loadState = () => {
  try {
    const savedState = localStorage.getItem('authState');

    // If no saved state exists, return initial state
    if (savedState === null) {
      return {
        user: null,
        isAuthenticated: false,  // not logged in
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
      state.user = action.payload; // store user data
      // save updated state to localStorage
      localStorage.setItem('authState', JSON.stringify(state));
    },
    signupSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      localStorage.setItem('authState', JSON.stringify(state));
    },
    updateUserSuccess: (state, action) => {
      // merge existing user data with updates
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem('authState', JSON.stringify(state));
    },
    logout: (state) => {
      // reset state to initial values
      state.user = null;
      state.isAuthenticated = false;
      // clear localStorage
      localStorage.removeItem('authState');
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