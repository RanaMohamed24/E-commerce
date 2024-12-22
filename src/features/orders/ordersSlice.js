import { createSlice } from '@reduxjs/toolkit';

// جلب الstate من localStorage إذا وجد
const loadState = () => {
  try {
    const savedState = localStorage.getItem('ordersState');
    
    // إذا لم يكن هناك state مخزن، نرجع الحالة الأولية
    if (savedState === null) {
      return {
        orders: [],
      };
    }
    return JSON.parse(savedState);
  } catch (err) {
    // نرجع الحالة الأولية في حالة حدوث خطأ
    return {
      orders: [],
    };
  }
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState: loadState(),
  reducers: {
    addOrderSuccess: (state, action) => {
      state.orders.push(action.payload);
      localStorage.setItem('ordersState', JSON.stringify(state));
    },
    fetchOrdersSuccess: (state, action) => {
      state.orders = action.payload;
      localStorage.setItem('ordersState', JSON.stringify(state));
    }
  }
});

export const { 
  addOrderSuccess,
  fetchOrdersSuccess,
} = ordersSlice.actions;

export default ordersSlice.reducer;