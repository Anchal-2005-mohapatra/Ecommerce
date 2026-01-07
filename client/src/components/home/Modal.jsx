import React from 'react';
import { useNavigate } from "react-router-dom";
import Avtar from 'react-avatar';
import { useAuth } from '../context/AuthContext';


const Modal = ({ isOpen, onClose }) => {
    const { setUserId, user, logout, setUser } = useAuth();
    const navigate = useNavigate();

    if (!isOpen) return null;
    const handleLogout = () => {
        // localStorage.removeItem('auth');
        // localStorage.removeItem("user");
        // localStorage.removeItem('token');
        setUser(null);
        setUserId(null);
        onClose();
        logout();
        navigate('/login')
    }

    const handleNavigation = (path) => {
        onClose();
        navigate(path);
    }


    return (
        <div className='absolute top-5 lg:top-full -right-1 lg:-right-20   bg-white rounded-lg z-50  ' >
            <div className='w-[200px]  p-4 border-2 rounded-lg '>
                <ul className='pb-2 flex justify-between'>
                    <li className='font-semibold  animate-bounce'>
                        Hello User
                    </li>
                    <li onClick={onClose}>✕</li>
                </ul>
                {user ? (
                    <div className="w-full flex flex-col ">
                        <Avtar size='50' round={true}></Avtar>
                        <div className='py-1'>{user.name.split("").map(n => n[0].toUpperCase() + n.slice(1)).join('')}</div>
                        <hr />

                    </div>) : (<ul className='py-3 space-y-1 text-sm'>
                        <li onClick={onClose}><button onClick={() => handleNavigation('/login')} className='hover:font-semibold border bg-pink-600 text-white w-full py-2'>Login</button></li>
                        <li onClick={onClose}><button className='hover:font-semibold border bg-pink-600 text-white w-full py-2' onClick={() => handleNavigation('/register')}>Register</button></li>
                        <hr className='bg-gray-300 ' />
                    </ul>)}
                {user && ((
                    <ul className='py-3 text-sm space-y-2'>
                        <li className='hover:font-medium'
                            onClick={() => handleNavigation('/order')}>Orders</li>
                        <li
                            onClick={() => handleNavigation(`/wishlist/${user._id}`)}
                            className='hover:font-medium' >
                            Wishlist
                        </li>
                        <li onClick={() => handleNavigation(`/cart/${user._id}`)} className='hover:font-medium'>Cart</li>
                        <hr />
                        <li onClick={() => handleNavigation(`/edit-profile/${user._id}`)} className='hover:font-medium'>Edit Profile</li>

                        <li onClick={() => handleNavigation('/contact-us')} className='hover:font-medium'>Contact Us</li>

                        <hr className='bg-gray-300  ' />
                        <li onClick={handleLogout} className='hover:font-medium'>Logout</li>
                    </ul>
                ))}



            </div>
        </div>
    )
}

export default Modal