import React, { useState, useEffect } from 'react';
import Avatar from 'react-avatar';
import { useAuth } from '../context/AuthContext';
import { IoPerson } from "react-icons/io5";
import { MdOutlinePayment } from "react-icons/md";
import { ImProfile } from "react-icons/im";
import { FaPowerOff } from "react-icons/fa";
import axiosInstance from "../../api/axiosConfig";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
const EditProfile = () => {
    const navigate = useNavigate();
    const { user, setUser, userId, logout } = useAuth();
    const [isEditing, setIsEditing] = useState(null);

    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
            });
        }
    }, [user]);
    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleCancel = () => {
        setFormData({
            name: user?.name || '',
            email: user?.email || '',
        });
        setIsEditing(null);
    };

    const handleEdit = (field) => {
        setIsEditing(field);
    };


    const handleLoggout = async () => {
        logout();
        navigate('/login')
    }

    const handleSave = async () => {
        try {
            const res = await axiosInstance.put(`/users/update/${userId}`, formData);
            setUser(res.data.data);

            localStorage.setItem('user', JSON.stringify(res.data.data));

            toast.success('Profile updated');
            setIsEditing(null);
        } catch (err) {
            toast.error(err.response?.data?.message || 'Update failed');
        }
    };


    const handleDeactivate = async () => {
        const confirm = window.confirm(
            "Are you sure you want to deactivate your account? You can reactivate by logging in again."
        );
        if (!confirm) return;

        try {
            await axiosInstance.put(`/users/deactivate/${userId}`);
            toast.success("Account deactivated");

            logout();
            navigate("/login");
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to deactivate account");
        }
    };

    const handleDelete = async () => {
        const confirm = window.confirm(
            " This will permanently delete your account. This action cannot be undone. Continue?"
        );
        if (!confirm) return;

        try {
            await axiosInstance.delete(`/users/delete/${userId}`);
            toast.success("Account deleted permanently");

            logout();
            navigate("/signup");
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to delete account");
        }
    };

    if (!user) return null;
    return (
        <div className='px-6 lg:px-10 xl:px-16 my-4'>

            <div className=' grid md:flex gap-3 '>
                <div className='md:w-[30%] grid gap-4 '>
                    <div className='shadow-lg p-2 bg-white flex items-center gap-4 px-5'>
                        <Avatar size='48' round={true} name={user.name} />
                        <div>
                            <p className='text-xs'>Hello,</p>
                            <p className='font-medium'> {user.name.charAt(0).toUpperCase() + user.name.slice(1)}</p>
                        </div>
                    </div>

                    <div className='shadow-lg p-2 bg-white px-5 sm:h-[440px] lg:h-[400px]'>
                        <div className='space-y-2  py-2'>
                            <div className='flex items-center gap-4'>
                                <IoPerson />
                                <p className='text-gray-500 font-medium'>ACCOUNT SETTINGS</p>
                            </div>
                            <ul className='space-y-2 pl-8  text-sm font-serif'>
                                <li className='cursor-pointer'>Profile Information</li>
                                <li onClick={()=>navigate('/checkout')} className='cursor-pointer'>Manage Addresses</li>
                            </ul>
                        </div>
                        <div className='space-y-2  py-2'>
                            <div className='flex items-center gap-4'>
                                <MdOutlinePayment />
                                <p className='text-gray-500 font-medium'>PAYMENTS</p>
                            </div>

                            <ul className='space-y-2 pl-8 text-sm font-serif'>
                                <li className='cursor-pointer'>Saved UPI</li>
                                <li className='cursor-pointer'>Saved Cards</li>
                            </ul>
                        </div>
                        <div className='space-y-2  py-2'>
                            <div className='flex items-center gap-4'>
                                <ImProfile />
                                <p className='text-gray-500 font-medium'>MY STUF</p>
                            </div>
                            <ul className='grid gap-2 pl-8  text-sm font-serif'>
                                <li className='cursor-pointer'>My Coupons</li>
                                <li className='cursor-pointer'>My Reviews & Ratings</li>
                                <Link to={`/notification`}>All Notifications</Link>
                                <Link to={`/wishlist/${userId}`} className=''>My Wishlist</Link>
                            </ul>
                        </div>

                        <div className='flex gap-4 items-center border-t pt-2 cursor-pointer' onClick={handleLoggout}>
                            <FaPowerOff />
                            <p className='text-gray-500 font-medium'>Logout</p>
                        </div>
                    </div>


                </div>

                <div className='md:w-[70%] bg-white shadow-lg py-2 overflow-auto px-8 '>
                    <form action="" className='grid gap-4'>
                        <div className='space-y-2 '>
                            <div className='flex items-center gap-6'>
                                <label className='font-medium text-lg'>Personal Information</label>
                                {isEditing !== 'name' && (
                                    <span
                                        className="text-blue-500 text-xs font-medium cursor-pointer"
                                        onClick={() => handleEdit('name')}
                                    >
                                        Edit
                                    </span>
                                )}
                            </div>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                disabled={isEditing !== 'name'}
                                className={`w-full outline-none border-2 p-2 ${isEditing !== 'name'
                                    ? 'cursor-not-allowed bg-gray-100 border-gray-200'
                                    : 'cursor-text bg-white border-blue-500'}`} />
                        </div>

                        <div className='space-y-2'>
                            <div className='flex items-center gap-6'>
                                <label className='font-medium text-lg'>Email Address</label>
                                {isEditing !== 'email' && (
                                    <span
                                        className="text-blue-500 text-xs font-medium cursor-pointer"
                                        onClick={() => setIsEditing('email')}
                                    >
                                        Edit
                                    </span>
                                )}
                            </div>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                disabled={isEditing !== 'email'}
                                className={`w-full outline-none border-2 p-2
                ${isEditing !== 'email'
                                        ? 'cursor-not-allowed bg-gray-100 border-gray-200'
                                        : 'cursor-text bg-white border-blue-500'}
              `}
                            />
                        </div>
                        <div className="flex gap-4 mt-4">
                            {isEditing && (
                                <div className="flex gap-4 mt-4">
                                    <button
                                        type="button"
                                        className="bg-blue-500 text-white px-6 py-2 rounded"
                                        onClick={handleSave}
                                    >
                                        Save
                                    </button>

                                    <button
                                        type="button"
                                        className="border px-6 py-2 rounded"
                                        onClick={handleCancel}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            )}
                        </div>


                    </form>
                    <div className='py-6'>
                        <p className='text-lg font-medium py-4'>FAQs</p>
                        <div className='space-y-3 py-2'>
                            <p className='font-outfit font-medium'>What happens when I update my email address (or mobile number)?</p>
                            <p className='text-sm text-gray-500 font-serif'>Your login email id (or mobile number) changes, likewise. You'll receive all your account related communication on your updated email address (or mobile number).</p>
                        </div>
                        <div className='space-y-3 py-2'>
                            <h2 className='font-outfit font-medium'>When will my Shopping account be updated with the new email address (or mobile number)?</h2>
                            <p className='text-sm text-gray-500 font-serif'>It happens as soon as you confirm the verification code sent to your email (or mobile) and save the changes.</p>
                        </div>
                        <div className='space-y-3'>
                            <h2 className='font-outfit font-medium'>What happens to my existing Shopping account when I update my email address (or mobile number)?
                            </h2>
                            <p className='text-sm text-gray-500 font-serif'>Updating your email address (or mobile number) doesn't invalidate your account. Your account remains fully functional. You'll continue seeing your Order history, saved information and personal details.</p>
                        </div>
                        <div className='space-y-3 py-3'>
                            <p
                                className='text-blue-500 font-medium text-sm cursor-pointer'
                                onClick={handleDeactivate}
                            >
                                Deactivate Account
                            </p>

                            <p
                                className='text-red-500 font-medium text-sm cursor-pointer'
                                onClick={handleDelete}
                            >
                                Delete Account
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProfile;