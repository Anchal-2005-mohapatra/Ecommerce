import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosConfig";
import { useAuth } from "../context/AuthContext";

const OrderSummary = ({ buyNowProduct }) => {
  const { userId } = useAuth();
  const [items, setItems] = useState([]);
 
  useEffect(() => {
    if (buyNowProduct) {
      setItems([
        {
          name: buyNowProduct.name,
          price: buyNowProduct.price,
          quantity: buyNowProduct.quantity || 1,
        },
      ]);
    }
  
    else if (userId) {
      axiosInstance.get(`/cart/${userId}`).then(res => {
        const mapped =
          res.data.items?.map(i => ({
            name: i.productId.name,
            price: i.productId.price,
            quantity: i.quantity,
          })) || [];

        setItems(mapped);
      });
    }
  }, [buyNowProduct, userId]);

 
  const changeQuantity = (index, type) => {
    setItems(prev =>
      prev.map((item, i) => {
        if (i !== index) return item;

        const qty =
          type === "inc"
            ? item.quantity + 1
            : Math.max(1, item.quantity - 1);

        return { ...item, quantity: qty };
      })
    );
  };


  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="bg-white p-6 rounded h-fit">
      <h3 className="font-semibold mb-4">Order Summary</h3>

      {items.map((item, idx) => (
        <div key={idx} className="mb-4">
          <div className="flex justify-between">
            <span className="font-semibold text-gray-500">
              {item.name} × {item.quantity}
            </span>
            <span className="font-semibold">
              ₹{item.price * item.quantity}
            </span>
          </div>

         
          <div className="flex items-center gap-2 mt-3">
            <button
              disabled={item.quantity === 1}
              onClick={() => changeQuantity(idx, "dec")}
              className="h-8 w-8 border rounded-full shadow"
            >
              −
            </button>

            <span className="w-8 text-center font-semibold">
              {item.quantity}
            </span>

            <button
              onClick={() => changeQuantity(idx, "inc")}
              className="h-8 w-8 border rounded-full shadow"
            >
              +
            </button>
          </div>
        </div>
      ))}

      <hr className="my-3" />
      <div className="flex justify-between font-bold text-lg">
        <span>Total</span>
        <span>₹{total}</span>
      </div>
    </div>
  );
};

export default OrderSummary;
