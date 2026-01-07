import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosConfig";
import { useAuth } from "../context/AuthContext";

const CartStep = ({ onNext }) => {
  const { user } = useAuth();
  const userId = user?._id;

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchCart = async () => {
      try {
        const res = await axiosInstance.get(`/cart/${userId}`);

        // ✅ REMOVE invalid cart items
        const validItems =
          res.data?.items?.filter((item) => item?.productId) || [];

        setCartItems(validItems);
      } catch (err) {
        console.error("Failed to fetch cart", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [userId]);

  if (!userId) {
    return <p className="text-gray-500">Please login to view cart</p>;
  }

  if (loading) {
    return <p className="text-gray-500">Loading cart...</p>;
  }

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        cartItems.map((item) => (
          <div
            key={item._id}
            className="flex justify-between items-center border-b py-3"
          >
            <div>
              <p className="font-medium">
                {item.productId.name}
              </p>
              <p className="text-sm text-gray-500">
                ₹{item.productId.price} × {item.quantity}
              </p>
            </div>

            <p className="font-semibold">
              ₹{item.productId.price * item.quantity}
            </p>
          </div>
        ))
      )}

      <button
        className="mt-6 bg-orange-500 text-white px-6 py-2 rounded w-full disabled:opacity-50"
        onClick={onNext}
        disabled={cartItems.length === 0}
      >
        Proceed to Buy
      </button>
    </div>
  );
};

export default CartStep;
