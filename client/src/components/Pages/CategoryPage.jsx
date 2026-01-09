import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosConfig";
import men from "../../Assets/hero/men.jpg";
import women from "../../Assets/hero/women.jpg";
import kids from "../../Assets/hero/kid.jpg";
import beauty from "../../Assets/hero/beauty.jpg";
import trends from "../../Assets/hero/trend.jpg";
import { TiStarFullOutline } from "react-icons/ti";
import CatagoryLoader from "../Loader/CatagoryLoader";
import { FaHeart } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { IoCheckmarkDone } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import Loading from "../home/Loading";
import CartModal from "../home/CartModal";

const CategoryPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userId, setRefreshCart, setRefreshWishlist } = useAuth();
  const [hoveredProductId, setHoveredProductId] = useState(null);
  const [cartLoadingId, setCartLoadingId] = useState(null);
  const navigate = useNavigate();


  const categoryBanner =
  {
    men: {
      banner: men,
      title: "Men's Fashion",
      subtitle: "Latest style for men"
    },
    women: {
      banner: women,
      title: "Women's Fashion",
      subtitle: "Latest Style for women"
    },
    kids: {
      banner: kids,
      title: "Kids Fashion",
      subtitle: "Latest Style for kids"
    },
    beauty: {
      banner: beauty
    },
    trends: {
      banner: trends,
      title: "Trends",
      subtitle: "Trending"
    }

  }

  const currentCategory = categoryBanner[category];


  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(`/product/get?category=${category}`);
        const productsArray = Array.isArray(res.data) ? res.data : [];
        let wishlistIds = [];
        let cartIds = [];


        if (userId) {
          const wishlistRes = await axiosInstance.get(`/wishlist/get/${userId}`);
          wishlistIds = Array.isArray(wishlistRes.data?.products)
            ? wishlistRes.data.products.map(p => p._id)
            : [];
          const cartRes = await axiosInstance.get(`/cart/${userId}`);
          cartIds = Array.isArray(cartRes.data?.items)
            ? cartRes.data.items
              .filter(i => i.productId)
              .map(i => i.productId._id)
            : []
        }
        window.scrollTo({ top: 0, behavior: "smooth" })
        const productsWithFlag = productsArray.map(p => ({
          ...p,
          isWishlisted: wishlistIds.includes(p._id),
          addToCart: cartIds.includes(p._id),
        }));

        setProducts(productsWithFlag);
      } catch (err) {
        console.log("Error fetching category products:", err);
        setProducts([]);
      }
      finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category]);





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

      setProducts((prev) =>
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


  const removeWhislist = async (productId) => {
    if (!userId) {
      toast.error("User must log in!");

      return;
    }

    try {
      await axiosInstance.delete(`/wishlist/remove/${userId}/${productId}`);
      setRefreshWishlist(prev => prev + 1);

      toast.success("Removed from wishlist");

      setProducts(prev =>
        prev.map(item =>
          item._id === productId ? { ...item, isWishlisted: false } : item
        )
      );
    } catch (err) {
      toast.error("Failed to remove from wishlist");
    }
  };


  const addToCart = async (productId) => {
    // console.log(userId);
    // console.log(productId);

    if (!userId) {
      toast.error("User must log in!");
      return;
    }
    try {
      setCartLoadingId(productId);
      await axiosInstance.post(`/cart/add`, { userId, productId, quantity: 1 });
      toast.success("The product was added to cart Successfully");
      // console.log("cart is uploaded", getCart.data)
      setProducts((prev) =>
        prev.map((item) =>
          item._id === productId ? { ...item, addToCart: true } : item
        ));
      setRefreshCart(r => r + 1);

    }
    catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");

    }
    finally {
      setCartLoadingId(null);
    }

  }

  const removeFromCart = async (productId) => {
    if (!userId) {
      toast.error("User must log in!");
      return;
    }

    try {
      await axiosInstance.delete(`/cart/remove/${userId}/${productId}`);
      toast.success("Removed from cart");

      setProducts(prev =>
        prev.map(item =>
          item._id === productId ? { ...item, addToCart: false } : item
        )
      );
      setRefreshCart(r => r + 1);
    } catch (err) {
      toast.error("Failed to remove from cart");
    }
  };

  if (!products.length)
    return (
      <p className="p-6 text-center text-gray-500">
        No products found in {category.toUpperCase()}
      </p>
    );

  return (
    <>
      {currentCategory && (
        <div>
          <img src={currentCategory.banner} alt=""
            className=' flex items-center w-full object-contain md:h-64' />
        </div>
      )}

      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 p-6">
          {Array.from({ length: 10 }).map((_, i) => (
            <CatagoryLoader key={i} />
          ))}

        </div>
      ) : (
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 md:gap-4 lg:gap-5  px-6 lg:px-10 xl:px-16 mt-20 mb-5 bg-white py-6">
          {products.map((p) => (
            <div
              key={p._id}
              className=" p-4 border border-gray-200 rounded-lg relative space-y-2"
            >
              <img
                src={p.images?.[0] || p.imgUrl}
                alt={p.name?.slice(0, 10) + "..."}
                className="h-40 w-full object-contain bg-cover bg-no-repeat mb-2 rounded"
                onClick={() => navigate(`/product-details/${p._id}`)} />
              <h3 className="font-semibold">{p.name?.slice(0, 35) + "..."}</h3>
              <p>{p.description?.slice(0, 50) + "..."}</p>
              <p className="font-bold text-lg">₹{p.price}</p>
              <div className="flex items-center gap-2">
                <TiStarFullOutline className="text-xl text-yellow-500" />
                <p>
                  {p.rating.toFixed(1)} ({p.reviewCount})
                </p>

              </div>
              {/* <div className=" w-full">
                <div className='flex items-end justify-left md:justify-end gap-2'>
                  <button
                    className="bg-black text-white rounded-lg p-3 w-[40%] md:w-[30%]"
                    onClick={async () => {
                      await addToCart(product._id);
                      navigate(`/cart/${userId}`);
                    }}
                  >
                    Cart
                  </button>

                  <button className="bg-black text-white rounded-lg p-3 w-[40%] md:w-[30%] hover:bg-cyan-700 hover:text-white hover:font-berkshire transform duration-300 hover:scale-95 border text-nowrap"
                    onClick={() => navigate("/checkout", {
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
                    })}>Buy Now</button>
                </div>
              </div> */}

              <div className="w-full  flex items-center justify-center bg-black text-white rounded-lg"
              >
                <button className="  p-3 ">View Details</button>
              </div>
              <div className='absolute top-5 right-5 flex gap-3 items-center cursor-pointer'>
                {p.isWishlisted ? (
                  <div className='h-50 w-50 bg-gray-100 p-2 rounded-full'>
                    <FaHeart color=''
                      size={25}
                      className="text-red-600 " onClick={() => removeWhislist(p._id)} />
                  </div>
                ) : (
                  <div className='h-50 w-50 bg-gray-100 p-2 rounded-full'>
                    <FaRegHeart
                      size={25}
                      onClick={() => addToWishlist(p._id)}
                      className='' /></div>
                )}
                <div
                  className="h-50 w-50 bg-gray-100 p-2 rounded-full relative flex items-center justify-center"
                  onMouseEnter={() => setHoveredProductId(p._id)}
                  onMouseLeave={() => setHoveredProductId(null)}
                >
                  {cartLoadingId === p._id ? (
                    <div className=" flex items-center justify-center">
                      <Loading />
                    </div>
                  ) : p.addToCart ? (
                    <IoCheckmarkDone size={27} className="text-green-600"
                      onClick={() => removeFromCart(p._id)} />
                  ) : (
                    <IoCartOutline
                      size={27}
                      className="cursor-pointer"
                      onClick={() => addToCart(p._id)}
                    />
                  )}

                  {hoveredProductId === p._id && !p.addToCart && (
                    <CartModal
                      product={p}
                      userId={userId}
                      close={() => setHoveredProductId(null)}
                    />
                  )}
                </div>


              </div>
            </div>
          ))}
        </div>
      )}

    </>

  );
};

export default CategoryPage;
