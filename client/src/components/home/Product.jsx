import React, { useState, useEffect, useMemo } from 'react';
import axiosInstance from '../../api/axiosConfig';
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import ProductLoader from '../Loader/ProductLoader';
import CartModal from './CartModal';
import Loading from '../../components/home/Loading';
import { IoCheckmarkDone } from "react-icons/io5";


const Product = () => {
  const [product, setProduct] = useState([]);
  // const [searchParams] = useSearchParams();
  // const searchQuary = searchParams.get('search') || '';
  // const [filterProducts, setFilterProducts] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { userId, setRefreshCart, setRefreshWishlist, searchQuery } = useAuth();
  const [hoveredProductId, setHoveredProductId] = useState(null);
  const [cartLoadingId, setCartLoadingId] = useState(null);
  // console.log(userId)
  // const userId = localStorage.getItem('userId');

  // const storedUserId = userId || localStorage.getItem('userId')



  useEffect(() => {
    // setLoading(true);
    // setTimeout(()=>{setLoading(false)}, 2000)
    const data = async () => {
      try {

        const productRes = await axiosInstance.get('/product/get');
        const productsArray = Array.isArray(productRes.data) ? productRes.data : [];


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
            : [];


        }

        const productsWithFlag = productsArray.map(p => ({
          ...p,
          isWishlisted: wishlistIds.includes(p._id),
          addToCart: cartIds.includes(p._id),
        }));

        setProduct(productsWithFlag);
        // setFilterProducts(productsWithFlag);
      } catch (err) {
        console.log(err)
        toast.error("Something went wrong!");
      } finally {
        setLoading(false);
      }
    };
    data();
  }, [userId]);

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return product;

    return product.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
      
    );
  }, [searchQuery, product]);


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


  const removeWhislist = async (productId) => {
    if (!userId) {
      toast.error("User must log in!");

      return;
    }

    try {
      await axiosInstance.delete(`/wishlist/remove/${userId}/${productId}`);
      setRefreshWishlist(prev => prev + 1);

      toast.success("Removed from wishlist");

      setProduct(prev =>
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
      setProduct((prev) =>
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

      setProduct(prev =>
        prev.map(item =>
          item._id === productId ? { ...item, addToCart: false } : item
        )
      );
      setRefreshCart(r => r + 1);
    } catch (err) {
      toast.error("Failed to remove from cart");
    }
  };


  return (
    <>
      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 p-6">
          {Array.from({ length: 10 }).map((_, i) => (
            <ProductLoader key={i} />
          ))}

        </div>
      ) :
        (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 md:gap-4 lg:gap-5  px-6 lg:px-10 xl:px-16 mt-20 mb-5 bg-white py-6 '>
            {filteredProducts.length === 0 && !loading && (
              <p className="col-span-full text-center text-gray-500">
                No products found
              </p>
            )}
            {filteredProducts.map((items) => (
              <div key={items._id} className=' p-4 border border-gray-200 rounded-lg relative space-y-2 ' >

                <div style={{ backgroundImage: `url(${items.imgUrl})` }}
                  className='w-full bg-no-repeat bg-contain bg-center h-[160px] md:h-[200px] rounded-lg transform duration-300 hover:scale-90' onClick={() => navigate(`/product-details/${items._id}`)}>
                </div>

                <div className='flex flex-col gap-2'>
                  <p className='font-medium text-lg '>{items.name?.slice(0, 20) + ".."}</p>
                  <p className='text-gray-500'>{items.description?.slice(0, 40) + "..."}</p>
                  <p>
                    ⭐ {items.rating?.toFixed(1)} ({items.reviewCount})
                  </p>
                  <p className='font-bold text-2xl'>₹{items.price}</p>

                  <button className='rounded-lg px-3 py-2 bg-black text-white font-luxurious hover:bg-gray-400 hover:text-black '
                    onClick={() => navigate(`/product-details/${items._id}`)}>View Details</button>
                </div>
                <div className='absolute top-5 right-5 flex gap-3 items-center cursor-pointer'>
                  {items.isWishlisted ? (
                    <div className='h-50 w-50 bg-gray-100 p-2 rounded-full'>
                      <FaHeart color=''
                        size={25}
                        className="text-red-600 " onClick={() => removeWhislist(items._id)} />
                    </div>
                  ) : (
                    <div className='h-50 w-50 bg-gray-100 p-2 rounded-full'>
                      <FaRegHeart
                        size={25}
                        onClick={() => addToWishlist(items._id)}
                        className='' /></div>
                  )}
                  <div
                    className="h-50 w-50 bg-gray-100 p-2 rounded-full relative flex items-center justify-center"
                    onMouseEnter={() => setHoveredProductId(items._id)}
                    onMouseLeave={() => setHoveredProductId(null)}
                  >
                    {cartLoadingId === items._id ? (
                      <div className=" flex items-center justify-center">
                        <Loading />
                      </div>
                    ) : items.addToCart ? (
                      <IoCheckmarkDone size={27} className="text-green-600"
                        onClick={() => removeFromCart(items._id)} />
                    ) : (
                      <IoCartOutline
                        size={27}
                        className="cursor-pointer"
                        onClick={() => addToCart(items._id)}
                      />
                    )}

                    {hoveredProductId === items._id && !items.addToCart && (
                      <CartModal
                        product={items}
                        userId={userId}
                        close={() => setHoveredProductId(null)}
                      />
                    )}
                  </div>


                </div>
              </div>
            ))}
          </div>
        )
      }
    </>

  )
}

export default Product
