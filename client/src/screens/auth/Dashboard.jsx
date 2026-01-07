import React from 'react';
import { Link } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import { IoMdNotificationsOutline } from "react-icons/io";


const Dashboard = () => {
    return (
        <div >
            <div className='flex flex-nowrap min-h-screen'>
                 <ul className='bg-teal-300  w-[34%] md:w-[28%] lg:w-[20%] z-10  rounded  px-4 py-6 flex flex-col gap-4 font-serif text-lg '>
                    <Link to="/wishlist" className='cursor-pointer'>
                        Wishlist
                    </Link>
                    <Link to='/cart' className='cursor-pointer'>
                        Cart
                    </Link>
                    <Link to='/profile' className='cursor-pointer'>
                        Profile
                    </Link>
                    <Link to='/product' className='cursor-pointer'>
                        Product
                    </Link>
                    <li className='cursor-pointer'>
                        Settings
                    </li>
                </ul>
        
                <div className=' w-full bg-slate-200 px-6 py-4'>
                   <nav className=' flex bg-white px-3 py-2 rounded-lg justify-between items-center shadow-md '>
                   <input type="text " placeholder='search' className=' bg-white shadow-lg  px-3 py-2 border rounded-lg w-[50%]'/>
                    <div className='flex items-center gap-3'>
                    <CgProfile/>
                   <IoMdNotificationsOutline/></div>
                   </nav> 
                   
                </div>
            </div>

        </div>
    )
}

export default Dashboard