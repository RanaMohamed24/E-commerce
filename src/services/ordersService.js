// ordersService.js

const API_URL = "http://localhost:3001";

export const ordersService = {
  // إضافة أوردر جديد
  createOrder: async (orderData) => {
    try {
      const response = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...orderData,
          id: Date.now(), // generate unique ID
          createdAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create order");
      }

      const order = await response.json();
      return { order };
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // جلب جميع أوردرات مستخدم معين
  getUserOrders: async (userId) => {
    try {
      const response = await fetch(`${API_URL}/orders?userId=${userId}`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }

      const orders = await response.json();
      return { orders };
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // جلب تفاصيل أوردر معين
  getOrderDetails: async (orderId) => {
    try {
      const response = await fetch(`${API_URL}/orders/${orderId}`);

      if (!response.ok) {
        throw new Error("Failed to fetch order details");
      }

      const order = await response.json();
      return { order };
    } catch (error) {
      throw new Error(error.message);
    }
  },
};