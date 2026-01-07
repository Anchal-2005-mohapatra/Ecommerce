import React, {  useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../../api/axiosConfig";

const PaymentStep = ({ address, onEditAddress, buyNowProduct }) => {
  const navigate = useNavigate();
  const { userId } = useAuth();
  const [method, setMethod] = useState("COD");
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // if (buyNowProduct) {
    //   setCartItems([{
    //     productId: buyNowProduct.productId,
    //     title: buyNowProduct.name,
    //     image: buyNowProduct.imgUrl,
    //     price: buyNowProduct.price,
    //     quantity: buyNowProduct.quantity
    //   }]);
    //   return;
    // }
    const cart = async () => {
      if (!userId) {
        toast.error("User not found");
        return;
      }
      try {
        const res = await axiosInstance.get(`/cart/${userId}`);
        setCartItems(res.data.items);
        // console.log("the data", res.data.items);

      }
      catch (error) {
        toast.error("failed to fetch the cart items")
      }
    }
    cart();
  }, [userId]);


  const placeOrder = async () => {
    if (!address) {
      toast.error("Please select address");
      return;
    }

    try {
      const payload = {
        userId,
        addressId: address._id,
        paymentMethod: method,
      };
       if (buyNowProduct) {
        payload.source = "BUY_NOW";
        payload.product = {
          productId: buyNowProduct.productId,
          quantity: buyNowProduct.quantity || 1,
        };
      }  else {
        payload.source = "CART";
      }


    await axiosInstance.post("/order/create", payload);

      toast.success("Order placed successfully 🎉");
      navigate("/order");

      localStorage.removeItem("checkoutStep");
      localStorage.removeItem("selectedAddress");

    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Order placement failed");
    }
  };
  return (
    <div className="bg-white shadow p-6 rounded">
      <h2 className="text-lg font-semibold mb-4">Payment</h2>


      <div className="border p-3 mb-4 rounded">
        <p className="font-medium">{address?.name}</p>
        <p className="text-sm text-gray-600">{address?.address}</p>
        <button onClick={onEditAddress} className="text-orange-500 text-sm mt-2">
          Edit Address
        </button>
      </div>
      <label className="flex gap-2 mb-3">
        <input type="radio" checked={method === "COD"} onChange={() => setMethod("COD")} />
        Cash on Delivery
      </label>

      <label className="flex gap-2 mb-6">
        <input type="radio" checked={method === "ONLINE"} onChange={() => setMethod("ONLINE")} />
        Online Payment
      </label>

      <button
        onClick={placeOrder}
        className="bg-green-600 text-white px-6 py-3 rounded w-full"
      >
        Place Order
      </button>
    </div>
  );
};

export default PaymentStep;
