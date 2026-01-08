import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosConfig";
import { useAuth } from "../context/AuthContext";
const OrderSummary = ({ buyNowProduct }) => {
  const { userId } = useAuth();
  const [cart, setCart] = useState(null);

  useEffect(() => {
    if (!buyNowProduct && userId) {
      axiosInstance.get(`/cart/${userId}`).then((res) => {
        setCart(res.data);
      });
    }
  }, [buyNowProduct, userId]);

  const items = buyNowProduct
    ? [{
      name: buyNowProduct?.name || "Product",
      price: buyNowProduct?.price || 0,
      quantity: buyNowProduct?.quantity || 1, // ✅ default
    }]
    : cart?.items
      ?.filter(i => i?.productId) 
      .map(i => ({
        name: i.productId.name,
        price: i.productId.price,
        quantity: i.quantity,
      })) || [];


  const total = items.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  return (
    <div className="bg-white p-6 rounded overflow-y-auto h-fit">
      <h3 className="font-semibold mb-4">Order Summary</h3>

      {items.map((item, idx) => (
        <div key={idx} className="flex justify-between mb-2">
          <span className="font-semibold text-gray-500 w-[76%]">{item.name} × {item.quantity}</span>
          <span className="font-semibold">₹{item.price * item.quantity}</span>
          {/* <div className='flex items-center gap-3 pt-4'>
            <div className='h-8 w-8 rounded-full bg-white flex items-center justify-center shadow-lg border'>
              <button
                disabled={item.quantity <= 1}
                onClick={() => changeQuantity(item.productId._id, "dec")}
              >
                -
              </button>

            </div>
            <div className=' flex justify-center items-center shadow-lg h-8 w-12 border'>
              <span>{item.quantity}</span>
            </div>


            <div className='h-8 w-8 rounded-full bg-white flex items-center justify-center shadow-lg border'>
              <button
                onClick={() => changeQuantity(item.productId._id, "inc")}
              >
                +
              </button>

            </div>

          </div> */}
        </div>
      ))}

      <hr className="my-3" />
      <div className="flex justify-between font-bold">
        <span>Total</span>
        <span>₹{total}</span>
      </div>
    </div>
  );
};

export default OrderSummary;
