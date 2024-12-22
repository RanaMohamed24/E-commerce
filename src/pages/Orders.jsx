// Orders.jsx
import { useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrdersSuccess } from "../features/orders/ordersSlice";
import { ordersService } from "../services/ordersService";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { toast } from "react-toastify";

const Orders = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);
  const user = useSelector((state) => state.auth.user);
  const { products, currency } = useContext(ShopContext);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { orders } = await ordersService.getUserOrders(user.id);
        dispatch(fetchOrdersSuccess(orders));
      } catch (error) {
        toast.error(error);
      }
    };

    fetchOrders();
  }, [dispatch, user]);

  const getItemsCount = (items) => {
    let total = 0;
    for (const itemId in items) {
      for (const size in items[itemId]) {
        total += items[itemId][size];
      }
    }
    return total;
  };

  const renderOrderItems = (orderItems) => {
    const itemsToRender = [];
    
    for (const itemId in orderItems) {
      const product = products.find(p => p._id === itemId);
      if (product) {
        for (const size in orderItems[itemId]) {
          const quantity = orderItems[itemId][size];
          itemsToRender.push({
            product,
            size,
            quantity
          });
        }
      }
    }

    return (
      <div className="mt-4 space-y-3">
        {itemsToRender.map((item, index) => (
          <div key={index} className="flex items-center gap-4 bg-gray-50 p-3 rounded-md">
            <img 
              src={item.product.image[0]} 
              alt={item.product.name}
              className="w-16 h-16 object-cover rounded-md"
            />
            <div className="flex-grow">
              <p className="font-medium">{item.product.name}</p>
              <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                <p>Size: {item.size}</p>
                <p>Quantity: {item.quantity}</p>
                <p>{currency}{item.product.price * item.quantity}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={"My"} text2={"Orders"} />
      </div>

      <div className="space-y-8">
        {orders.length === 0 ? (
          <div className="text-center py-8">
            You haven't placed any orders yet
          </div>
        ) : (
          orders.map((order) => (
            <div
              className="py-4 border rounded-lg shadow-sm"
              key={order.id}
            >
              {/* Order Header */}
              <div className="px-4 pb-4 border-b flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-start gap-6">
                  <div className="text-sm">
                    <p className="sm:text-base font-medium">Order #{order.id}</p>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mt-2">
                      <p className="text-base font-medium">
                        Total: {currency}{order.totalAmount}
                      </p>
                      <p className="text-sm text-gray-600">
                        Items: {getItemsCount(order.items)}
                      </p>
                    </div>
                    <p className="mt-2 text-sm">
                      Date:{" "}
                      <span className="text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="px-4 pt-4">
                {renderOrderItems(order.items)}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;