import React, { useState } from 'react';
import axiosInstance from '../../api/axiosConfig';
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';


const CartModal = ({ product, userId, close }) => {
  const { setRefreshWishlist } = useAuth();
  const navigate = useNavigate();
  const [products, setProduct] = useState([]);


  const addToWishlist = async (productId) => {
    // console.log(productId);

    if (!userId) {
      toast.error("User must log in!");
      navigate('/login');
      return;
    }

    try {
      await axiosInstance.post("/wishlist/add-wishlist", {
        userId,
        productId,
      });

      toast.success("Item added to wishlist");

      setProduct((prev) =>
        prev.map((item) =>
          item._id === productId ? { ...item, isWishlisted: true } : item
        )
      );
      setRefreshWishlist(prev => prev + 1);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Already in wishlist"
      );
    }
  };

  //   const buyNow = async () => {
  //   if (!userId) {
  //     toast.error("Please login first");
  //     navigate("/login");
  //     return;
  //   }

  //   try {

  //     await axiosInstance.post("/cart/add", {
  //       userId,
  //       productId: product._id,
  //       quantity: 1,
  //     });


  //     navigate("/checkout", {
  //       state: { skipCart: true },
  //     });

  //   } catch (err) {
  //     toast.error("Unable to process Buy Now");
  //   }
  // };

  return (products && (
    <div className="absolute z-10 top-full -right-2 w-[280px] bg-white shadow-2xl rounded-xl p-4 border">


      <div className="flex gap-3">
        <img
          src={product.imgUrl}
          className="h-16 w-16 object-contain border rounded"
          alt=""
        />

        <div>
          <p className="font-semibold text-sm">
            {product.name?.slice(0, 30) + ".."}</p>
          <p className='text-xs text-gray-400'>
            {product.description?.slice(0, 50) + ".."}</p>
          <p className="text-sm">
            ⭐ {product.rating?.toFixed(1)} 
            ({product.reviewCount})
          </p>
          <p className="font-bold">
            ₹{product.price}</p>
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        <button className="flex-1 bg-orange-500 text-white py-2 rounded"
          // onClick={buyNow}
          onClick={() =>
            navigate("/checkout", {
              state: {
                buyNow: true,
                product: {
                  productId: product._id,
                  name: product.name,
                  price: product.price,
                  imgUrl: product.imgUrl,
                  quantity: 1
                }
              }
            })
          }
        >
          Buy Now
        </button>

        <button
          className="flex-1 border py-2 rounded"
          onClick={async () => {
            await addToWishlist(product._id);
            navigate(`/wishlist/${userId}`);
          }}
        >
          Wishlist
        </button>

      </div>
    </div>

  ))
};

export default CartModal;
