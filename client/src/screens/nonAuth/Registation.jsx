import React, { useState } from 'react';
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import bg from "../../Assets/Images/bg1.webp";
import { IoPerson } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
// import axios from 'axios';
import axiosInstance from '../../api/axiosConfig';
import { useAuth } from '../../components/context/AuthContext';

const Registration = () => {
    const { setUser, setUserId } = useAuth();
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    }

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('buyer');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const handleButton = async (e) => {
        e.preventDefault();
        setLoading(true);
        const registerData = {
            name,
            email,
            password,
            role
        }
        if (!name || !email || !password) {
            toast.error("Please fill all the fields");
            return;
        }
        try {
            const res = await axiosInstance.post('/users/register', registerData, {
                headers: { 'Content-Type': 'application/json' }
            });
            console.log('Registration succesfully', res.data);
            // console.log(registerData);
            setName("");
            setEmail("");
            setPassword("");
            setRole("buyer");
            setLoading(false);
            setUser(res.data.user);
            setUserId(res.data.user._id);
            navigate('/login');
            toast.success('Registration Successful ! Please Login.');
        }
        catch (error) {
            setLoading(false);
            // setName('');
            // setEmail('');
            // setPassword('');
            // setRole('');

            if (error.response && error.response.status === 400) {
                toast.error(error.response.data.message || 'Email already exists')
            }
            else {
                toast.error('Something went wrong, try again later')
            }
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div className='flex flex-col min-h-screen items-center justify-center bg-no-repeat bg-center bg-cover object-cover' style={{ backgroundImage: `url(${bg})` }} >
            <form action="" className='bg-gray-100 p-7 rounded-3xl shadow-lg border border-gray-400  flex flex-col gap-3   w-[89%] sm:w-[50%] md:w-[40%] lg:w-[28%]  ' onSubmit={handleButton}>

                <h1 className='text-left font-bold text-2xl'>Register</h1>
                <label className='font-semibold'>Name </label>
                <div className=' bg-white border rounded flex items-center justify-between px-4 py-2'>
                    <input type="text" placeholder='Enter Your name' className='outline-none' value={name} onChange={(e) => setName(e.target.value)} />
                    <IoPerson size={20} /></div>
                <label className='font-semibold'> Email </label>
                <div className=' bg-white border rounded flex items-center justify-between px-4 py-2'><input type="email" placeholder='Enter Your Email ' className='outline-none' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <MdEmail size={20} /></div>
                <label className='font-semibold'>Password  </label>
                <div className=' bg-white border rounded flex items-center justify-between px-4 py-2'><input type={passwordVisible ? 'text' : 'password'}
                    value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Your Password' className='outline-none' />
                    <span onClick={togglePasswordVisibility}>{passwordVisible ? <IoMdEye size={20} /> : <IoMdEyeOff size={20} />}</span></div>
                <label className='font-semibold'>Role  </label>
                <div className=' bg-white border rounded  px-4 py-2'>
                    <select name="" id="" className='outline-none w-full ' value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="buyer">Buyer</option>
                        <option value="seller">Seller</option>
                    </select>
                </div>

                <button className='bg-black text-white rounded-lg py-2 mt-3' onClick={handleButton} disabled={loading}>{loading ? 'loading...' : 'Registration'}</button>

                <div className='flex flex-col justify-center items-center gap-2 w-full'>
                    <p className='text-center'>Already have an account! </p>
                    <Link to='/login' className='  font-semibold  px-1 w-full bg-white text-black rounded-lg text-center border border-gray-300 py-2'>
                        Login </Link>

                </div>
            </form>

        </div>
    )
}

export default Registration;