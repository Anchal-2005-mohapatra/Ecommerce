import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosConfig';
// import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/context/AuthContext';
import CartLoader from '../../components/Loader/CartLoader';
import cartBanner from "../../Assets/hero/cart.jpg";
import { AiFillSafetyCertificate } from "react-icons/ai";

const Cart = () => {
    const [cart, setCart] = useState([]);
    // const { userId} = useParams();
    const { userId, setRefreshCart } = useAuth();
    const navigate = useNavigate();
    // console.log(userId);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' })

        const fetchCart = async () => {
            // const userId = localStorage.getItem('userId');
            if (!userId) {
                setLoading(false);
                toast.error("Please Logged in First");
                return;
            }
            try {
                const res = await axiosInstance.get(`/cart/${userId}`);
                // console.log(res.data.items);

                if (res.data && res.data.items) {
                    setCart(res.data.items);
                }
            }
            catch (error) {
                // console.error("Error fetching cart:", error);
                toast.error("Something went wrong!")
            }
            finally {
                setLoading(false);
            }
        }
        fetchCart();
    }, [userId]);


    const changeQuantity = async (productId, action) => {
        const prevCart = [...cart];
        setCart(prev =>
            prev.map(item => {
                if (!item.productId) return item;

                if (item.productId._id === productId) {
                    return {
                        ...item,
                        quantity:
                            action === "inc"
                                ? item.quantity + 1
                                : Math.max(item.quantity - 1, 1),
                    };
                }

                return item;
            })
        );

        try {
            const res = await axiosInstance.put("/cart/update", {
                userId,
                productId,
                action
            });

            setCart(res.data.cart.items);
            setRefreshCart(prev => prev + 1);
        } catch (err) {
            setCart(prevCart);
            toast.error("Failed to update quantity");
        }
    };


    const remove = async (productId) => {
        try {
            console.log(productId);
            await axiosInstance.delete(`/cart/remove/${userId}/${productId}`);
            setCart(prev =>
                prev.filter(
                    item => item.productId && item.productId._id !== productId
                )
            );

            setRefreshCart(prev => prev + 1);
        } catch (err) {
            toast.error("Failed to update quantity");
        }
    }


    const validCart = cart.filter(item => item.productId);

    const totalQuantity = validCart.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    const totalPrice = validCart.reduce(
        (sum, item) => sum + item.productId.price * item.quantity,
        0
    );


    return (
        <>
            <img src={cartBanner} alt="" className='h-[220px] lg:h-[350px] w-full bg-cover bg-center object-cover ' />
            {loading ? (
                <div className='grid gap-4 p-4'>
                    {Array.from({ length: 10 }).map((_, i) => (
                        <CartLoader key={i} />
                    ))}

                </div>
            ) :
                (
                    <div className='px-6 lg:px-10 xl:px-16 my-4'>
                        <h1>{cart.length === 0 ?
                            (<p className='text-center font-luxurious text-2xl'>
                                Your cart is empty</p>)
                            :
                            (
                                <div className='py-16'>
                                    <div className='grid md:flex gap-2 md:gap-5'>
                                        <ul className="grid bg-white gap-3 p-2 md:w-[58%] lg:w-[70%] ">
                                            {cart.filter(item => item.productId).map(item =>
                                            (
                                                <li key={item.productId._id || item._id} className="grid  md:flex  gap-2 md:gap-7 border-b p-1 md:p-3 space-y-2 relative ">
                                                    {/* <div
                                    style={{ backgroundImage: `url(${item.productId.imgUrl})` }}
                                    className=" h-[100px] w-[100px] bg-cover bg-center rounded-lg "
                                    onClick={() => navigate(`/product-details/${item.productId._id}`)}> */}
                                                    <div>
                                                        <img src={item.productId.imgUrl} alt="" className=" w-[200px] md:w-[150px] bg-cover bg-center rounded-lg object-contain "
                                                            onClick={() => navigate(`/product-details/${item.productId._id}`)} />
                                                        <div className='flex items-center gap-3 pt-4'>
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

                                                        </div>
                                                        <p
                                                            className="absolute top-2 right-2 cursor-pointer text-red-500 font-bold text-xl"
                                                            onClick={() => remove(item.productId._id)}
                                                        >
                                                            ✕
                                                        </p>
                                                    </div>
                                                    <div className=' space-y-2'>
                                                        <p className=' font-medium '>{item.productId.name}</p>
                                                        <p className='text-gray-600 text-sm'  >{item.productId.description?.slice(0, 100) + "...."}</p>
                                                        <div className='flex'>
                                                            <p>
                                                                ⭐ {item.productId.rating?.toFixed(1)} ({item.productId.reviewCount})
                                                            </p>
                                                        </div>
                                                        {/* <p>{item.productId.description}</p> */}
                                                        <p className='font-bold'>
                                                            ₹{item.productId.price} × {item.quantity} = ₹{item.productId.price * item.quantity}
                                                        </p>


                                                    </div>

                                                </li>

                                            ))}
                                            <div className='flex justify-end bg-white shadow-md py-4  border w-full'>
                                                <button className='bg-orange-500 text-white py-3 mx-2 font-semibold px-8'
                                                    onClick={() => navigate('/checkout')}>
                                                    Place Order
                                                </button>
                                            </div>
                                        </ul>
                                        <div className='md:w-[42%]  lg:w-[30%] space-y-3'>

                                            <div className='bg-white p-4 space-y-3 shadow-md h-[250px]'>
                                                <p className='text-gray-500 border-b pb-2 font-semibold'>
                                                    PRICE DETAILS
                                                </p>

                                                <div className='flex justify-between'>
                                                    <span>Total Items</span>
                                                    <span>{cart.length}</span>
                                                </div>

                                                <div className='flex justify-between'>
                                                    <span>Total Quantity</span>
                                                    <span>{totalQuantity}</span>
                                                </div>

                                                <div className='flex justify-between'>
                                                    <span>Delivery Charges</span>
                                                    <span className='text-green-600'>FREE</span>
                                                </div>

                                                <hr />

                                                <div className='flex justify-between font-bold text-lg'>
                                                    <span>Total Amount</span>
                                                    <span>₹{totalPrice}</span>
                                                </div>
                                            </div>



                                            <div className='flex items-center md:gap-4 md:p-4'>
                                                <AiFillSafetyCertificate size={30} />

                                                <p className='text-gray-500 max-w-[300px]'>
                                                    Safe and Secure Payments.Easy returns.100% Authentic Products.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </h1>
                    </div>
                )

            }

        </>

    )
}

export default Cart