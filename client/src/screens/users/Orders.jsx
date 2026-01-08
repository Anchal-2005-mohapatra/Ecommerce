import React, { useState, useEffect } from 'react'
import emptyOrder from "../../Assets/Images/images.png";
import { useAuth } from "../../components/context/AuthContext";
import axiosInstance from "../../api/axiosConfig";

const Orders = () => {
    const { userId } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userId) return;

        const fetchOrders = async () => {
            try {
                const res = await axiosInstance.get(`/order/user/${userId}`);
                setOrders(res.data || []);
            } catch (error) {
                console.error("Failed to fetch orders:", error);
                setOrders([]);
            }
            finally {
                setLoading(false);
            }
        }

        fetchOrders();
    }, [userId]);

    // const remove = async()=>{
    //     axiosInstance.delete(`/order/`)
    // }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p>Loading orders...</p>
            </div>
        );
    }

    if (!orders.length) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <img src={emptyOrder} alt="No orders" className="w-40 mb-4" />
                <p>No orders found</p>
            </div>
        );
    }
    return (
        <div className=' mx-6 lg:mx-10 xl:mx-16 bg-white px-4 py-3'>
            <div className='flex flex-col items-start justify-start border-b-2  p-4'>
                <p>Account</p>
                <p>Shoopping User</p>
            </div>
            <div className='flex gap-4  '>
                <div className='border-r-2 md:w-[20%] 3'>
                    <div className='border-b-2 py-2'>
                        Overview
                    </div>
                    <div className='border-b-2 py-2'>
                        <p className='text-gray-500'>ORDERS</p>
                        <p className='text-green-600'>Orders & Returns</p>
                    </div>
                    <div className='border-b2 py-2'>
                        <p className='text-gray-500'>CREDITS</p>
                        <p>Coupons</p>
                        <p>Shopping Credits</p>
                        <p>MyCash</p>
                    </div>
                    <div>
                        <p className='border-b-2 py-2'>ACCOUNTS</p>
                        <p>Profile</p>
                        <p>Saved Cards</p>
                        <p>Addresses</p>

                    </div>
                </div>
                <div className='w-[80%] flex flex-wrap gap-4 items-center  justify-center p-6'>
                    
                        {orders.map((order) => (
                            <div key={order._id} className="border p-4 rounded bg-white">
                                <p className="font-semibold text-green-600">{order.status}</p>

                               <div className='md:flex gap-5 space-y-2 '>
                                {order.items.map((item, i) => (
                                    <div key={i} className='border-b space-y-3  md:border-r p-2 '>
                                        <img src={item.image || "the Img"} alt={item.title || "The title"} className="w-20 h-20 object-contain" />
                                        <div>
                                            <p>{item.title?.slice(0,20)+"..."}</p>
                                            <p>₹{item.price} × {item.quantity}</p>
                                           
                                        </div>
                                    </div>
                                ))} 
                                </div> 

                                <p className="mt-2 font-medium">Total: ₹{order.totalAmount}</p>
                                <p className="text-sm text-gray-500">
                                    Ordered on {new Date(order.createdAt).toLocaleString()}
                                </p>
                            </div>
                        ))}
                   
                </div>
            </div>
        </div>
    )
}

export default Orders