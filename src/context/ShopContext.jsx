import { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { products } from "../assets/frontend_assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const navigate = useNavigate();

  // Get authentication state from Redux
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  // Watch for auth state changes
  useEffect(() => {
     // If user logs out, clear the cart state immediately
     if (!isAuthenticated || !user) {
      setCartItems({});
      localStorage.removeItem(`cart_${user?.id}`);
      return;
    }


    // تحميل السلة للمستخدم المسجل الدخول
    const savedCart = localStorage.getItem(`cart_${user.id}`);
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch {
        setCartItems({});
      }
    }
  }, [isAuthenticated, user]);

    // حفظ السلة عند تغييرها
    useEffect(() => {
      if (isAuthenticated && user?.id && Object.keys(cartItems).length > 0) {
        localStorage.setItem(`cart_${user.id}`, JSON.stringify(cartItems));
      }
    }, [cartItems, isAuthenticated, user]);

  const addToCart = (itemId, size) => {
    if (!isAuthenticated || !user) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    if (!size) {
      toast.error("Please select product size");
      return;
    }

    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);
    toast.success("Item added to cart");
  };

  const updateQuantity = (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    if (quantity === 0) {
      // Remove size if quantity is 0
      if (cartData[itemId] && cartData[itemId][size]) {
        delete cartData[itemId][size];
        // Remove item entirely if no sizes left
        if (Object.keys(cartData[itemId]).length === 0) {
          delete cartData[itemId];
        }
      }
    } else {
      if (!cartData[itemId]) {
        cartData[itemId] = {};
      }
      cartData[itemId][size] = quantity;
    }
    setCartItems(cartData);
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          totalCount += cartItems[items][item];
        }
      }
    }
    return totalCount;
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    let hasItems = false;

    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      if (itemInfo) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item];
            hasItems = true;
          }
        }
      }
    }

    // Add delivery fee only if cart has items
    if (hasItems) {
      totalAmount += delivery_fee;
    }

    return totalAmount;
  };

  // / تعديل دالة مسح السلة
  const clearCartItems = () => {
    // مسح الحالة أولاً
    setCartItems({});
    // مسح localStorage إذا كان المستخدم مسجل
    if (user?.id) {
      try {
        localStorage.removeItem(`cart_${user.id}`);
      } catch (error) {
        console.error('Error clearing cart from localStorage:', error);
      }
    }
  };

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    clearCartItems,
    navigate,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
