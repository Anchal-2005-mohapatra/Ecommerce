import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosConfig';
import toast from 'react-hot-toast';
// import { useParams } from 'react-router-dom';
import { useAuth } from '../../components/context/AuthContext';
import WishlistLoader from "../../components/Loader/WishlistLoader";
import banner from "../../Assets/hero/banner.jpg";
import { useNavigate } from 'react-router-dom';
const Wishlist = () => {
    const [loading, setLoading] = useState(true);
    const [wishlist, setWishlist] = useState([]);
    const { userId, setRefreshWishlist } = useAuth();
    const navigate = useNavigate();


    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        const getWishlist = async () => {
            if (!userId)
                return toast.error("Please Logged In !")
            try {
                const res = await axiosInstance.get(`/wishlist/get/${userId}`);
                // console.log(res.data);
                const uniqueProductsMap = new Map();
                res.data.products.forEach(p => uniqueProductsMap.set(p._id, p));
                const uniqueProducts = Array.from(uniqueProductsMap.values());

                setWishlist(uniqueProducts);
            } catch (err) {

                // toast.error('Something went Wrong!');
                toast.error("Something went wrong!")
            }
            finally {
                setLoading(false);
            }
        };
        getWishlist();
    }, [userId]);

    const remove = async (productId) => {
        console.log(productId);
        if (!productId) {
            toast.error("No product selected");
            return;
        }
        try {
            await axiosInstance.delete(`/wishlist/remove/${userId}/${productId}`);
            toast.success("Product removed!");
            setWishlist((prev) => prev.filter((item) => item._id.toString() !== productId.toString()));
            setRefreshWishlist(prev => prev + 1);

        } catch (error) {
            toast.error("Failed to remove item");
        }
    };
    return (
        <>
            <img src={banner} alt="" className='h-[220px] lg:h-[350px] w-full bg-cover bg-center object-cover ' />
            {loading ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 p-6">
                    {Array.from({ length: 10 }).map((_, i) => (
                        <WishlistLoader key={i} />
                    ))}
                </div>

            ) :
                (<div className=' '>
                    <h1>{wishlist.length === 0 ?
                        (<p className='text-center font-luxurious text-2xl py-4'>
                            Your wishlist is empty</p>)
                        :
                        (
                            <div className='bg-gray-100 py-16'>
                                <ul className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 m-4 bg-white py-6 px-6 lg:px-10 xl:px-16'>
                                    {wishlist.map((item, i) => (
                                        <li key={item._id + i} className='border p-3 space-y-2 rounded-lg'>
                                            <div style={{ backgroundImage: `url(${item.imgUrl})` }}
                                                className='w-full bg-contain h-[160px] md:h-[200px] bg-no-repeat bg-center rounded-lg relative'>
                                                <div className='flex items-center justify-center bg-white w-10 h-10 rounded-full absolute right-5 top-4 '
                                                    onClick={() => remove(item._id)}>
                                                    <p className='cursor-pointer hover:text-red-500'>✕</p>
                                                </div>
                                            </div>
                                            <p>{item.name?.slice(0, 20) + "..."}</p>
                                            <p className='text-sm text-gray-500'>
                                                {item.description.slice(0, 50) + ".."}
                                            </p>
                                            <p className='font-medium text-xl'>
                                                ₹{item.price}
                                            </p>
                                            <div className='flex justify-between '>
                                                <button className='bg-white text-black hover:bg-black hover:text-white shadow-lg border font-medium px-3 py-2  rounded-lg w-[30%]'
                                                    onClick={() => navigate(`/product-details/${item._id}`)}>
                                                    View
                                                </button>
                                                <button className='bg-white text-black  hover:bg-black hover:text-white shadow-lg border font-medium px-3 py-2  rounded-lg w-[30%]'
                                                    onClick={() => navigate(`/checkout`,
                                                        {
                                                            state: {
                                                                buyNow: true,
                                                                product: {
                                                                    productId: item._id,
                                                                    name: item.name,
                                                                    price: item.price,
                                                                    imgUrl: item.imgUrl,
                                                                    quantity: 1
                                                                }
                                                            }
                                                        }
                                                    )}>
                                                    Buy
                                                </button></div>
                                        </li>
                                    ))}
                                </ul>

                            </div>)
                    }
                    </h1>
                </div>
                )}

        </>
    )
}
export default Wishlist;