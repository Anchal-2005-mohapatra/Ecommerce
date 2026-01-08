import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../api/axiosConfig';
import toast from 'react-hot-toast';
import ProductDetailsLoader from '../../components/Loader/ProductDetailsLoader';
import { useAuth } from '../../components/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import details from "../../Assets/hero/details.jpg";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { userId, setRefreshCart } = useAuth();
  const [seletedImg, setSelectedImg] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
      window.scrollTo({top:0, left:0, behavior:'smooth'})
      try {
        setLoading(true);
        const res = await axiosInstance.get(`/product/get/${id}`);
        setProduct(res.data);
        setSelectedImg(res.data.imgUrl);
      } catch (err) {
        console.error(err);
        setError('The product is not available now!');
        toast.error('The product is not available now!');
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [id]);

  const addToCart = async (productId) => {
    if (!userId)
      return toast.error("the user is not found");
    try {
      await axiosInstance.post(`/cart/add`, { userId, productId, quantity: 1 });
      toast.success("The product was added to cart sucessfully");
      setRefreshCart(p => !p);
    }
    catch (error) {

      toast.err("Something went wrong");
      console.log(error.data);
    }
  }
  // if (loading) return <p className="text-center my-10">Loading product details...</p>;
  // if (error) return <p className="text-center my-10 text-red-600">{error}</p>;
  // if (!product) return null;

  return (
    <>
      <img src={details} alt="" className='w-full bg-no-repeat object-center bg-center bg-cover h-[200px]' />
      {loading ? (
        <ProductDetailsLoader />
      ) : error ? (<p className="text-center my-10 text-red-600">{error}</p>
      ) :
        (<div className=" grid md:grid-cols-2 lg:md:grid-cols-3 items-start gap-5 mx-6 lg:mx-10 xl:mx-16 bg-white px-4 py-16 ">
          <div className="flex flex-col items-center justify-start gap-5 md:flex-row-reverse">

            <div className="  ">
              <img src={seletedImg} alt={product.name} className="object-contain  bg-cover bg-center rounded-lg border p-5 h-[300px] w-[300px] md:h-[400px] md:w-[400px]" />
            </div>
            <div className='flex flex-row md:flex-col gap-5 overflow-x-auto overflow-y-auto py-2  md:h-[400px]'>
              {product.images && product.images.length > 0 ? (
                product.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={product.name}
                    onClick={() => setSelectedImg(img)}
                    className={`object-contain bg-center rounded-lg border p-3 h-[100px] w-[100px] cursor-pointer
          ${seletedImg === img ? 'border-black' : 'border-gray-300'}`}
                  />
                ))
              ) : (
                <p>No extra images</p>
              )}
            </div>

          </div>
          <div className='lg:col-span-2'>
            <div className=' flex flex-col gap-10 overflow-y-auto'>
              <div>
                <p className="font-medium text-lg tracking-tighter">{product.name}</p>
                <p className="text-gray-500 tracking-tighter">{product.description}</p>
                <p>
                  ⭐ {product.rating?.toFixed(1)} ({product.reviewCount})
                </p>

                <p className="font-bold text-2xl">₹{product.price}</p></div>
              <div className=" w-full">
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
              </div>
            </div>

          </div>
        </div>)}
    </>
  );
};

export default ProductDetails;
