import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ordersService } from "../services/ordersService";
import { addOrderSuccess } from "../features/orders/ordersSlice";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/frontend_assets/assets";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [method, setMethod] = useState("");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { navigate, cartItems, getCartAmount, clearCartItems} =
    useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    governorate: "",
    city: "",
    phone: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "address",
      "governorate",
      "city",
      "phone",
    ];
    for (const field of requiredFields) {
      if (!formData[field]) {
        toast.error(
          `Please fill in ${field.replace(/([A-Z])/g, " $1").toLowerCase()}`
        );
        return false;
      }
    }

    // التحقق من صحة البريد الإلكتروني
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    // التحقق من صحة رقم الهاتف
    const phoneRegex = /^\d{11}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error("Please enter a valid phone number (11 digits)");
      return false;
    }

    return true;
  };

  const handlePlaceOrder = async () => {
    if (!method) {
      toast.error("Please select a payment method");
      return;
    }

    if (!validateForm()) {
      return;
    }

    const orderData = {
      userId: user.id,
      items: cartItems,
      totalAmount: getCartAmount(),
      paymentMethod: method,
      shippingDetails: formData,
      orderDate: new Date().toISOString(),
    };

    try {
      const { order } = await ordersService.createOrder(orderData);
      dispatch(addOrderSuccess(order));
      // Clear cart after successful order
      clearCartItems();
      toast.success("Order placed successfully!");
      navigate("/orders");
    } catch (error) {
      toast.error(error.message || "Failed to place order. Please try again.");
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      {/* Left Side - Delivery Information */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"Delivery"} text2={"Information"} />
        </div>

        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleInputChange}
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </div>

        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="email"
          name="email"
          placeholder="E-mail Address"
          value={formData.email}
          onChange={handleInputChange}
        />

        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleInputChange}
        />

        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            name="governorate"
            placeholder="Governorate"
            value={formData.governorate}
            onChange={handleInputChange}
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleInputChange}
          />
        </div>

        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleInputChange}
        />
      </div>

      {/* Right Side - Payment */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title text1={"Payment"} />

          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setMethod("visa")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer hover:border-gray-400 transition-colors"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "visa" ? "bg-green-400" : ""
                }`}
              ></p>
              <img
                className="h-5 mx-4"
                src={assets.visa_logo}
                alt="Visa Card"
              />
            </div>

            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer hover:border-gray-400 transition-colors"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cod" ? "bg-green-400" : ""
                }`}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4">
                Cash on delivery
              </p>
            </div>
          </div>

          <div className="w-full text-center mt-8">
            <button
              onClick={handlePlaceOrder}
              className="bg-black text-white px-16 py-3 text-sm hover:bg-gray-800 transition-colors"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
