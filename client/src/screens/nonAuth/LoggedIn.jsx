import React, { useState } from 'react';
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import bg from "../../Assets/Images/bg.jpg";
import { MdEmail } from "react-icons/md";
import axiosInstance from '../../api/axiosConfig';
import { useAuth } from '../../components/context/AuthContext';
const LoggedIn = () => {
    const { setUserId, setUser } = useAuth();
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    }
    const handleButton = async (e) => {
        e.preventDefault();
        const loginData = {
            email,
            password
        };
        if (!email || !password) {
            toast.error("Please fill all the fields");
            return;
        }
        try {
            setLoading(true);
            const res = await axiosInstance.post('/users/login', loginData);
            console.log('Login successful', res.data);
            const { user } = res.data;
            // console.log(user);
            setUserId(user._id);
            setUser(user);
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('userId', user._id);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('auth', 'true');
            setEmail("");
            setPassword("");
            toast.success("Login Successful !");
            navigate('/');
            // console.log("userId", user._id);


            // const user = res.data.user;
            // localStorage.setItem('user', JSON.stringify(user));
            // localStorage.setItem('userId', user._id);
            // localStorage.setItem('token', res.data.token);
            // localStorage.setItem('auth', 'true');

        }
        catch (error) {
            // setEmail('');
            // setPassword('');
            setLoading(false);

            if (error.response && error.response.status === 401) {
                toast.error('Incorrect email or password. Please try again.');
            }
            else if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            }
            else {
                toast.error('An unexpected error occurred. Please try again later.');
            }
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <>

            <div className='  flex flex-col min-h-screen items-center justify-center bg-no-repeat bg-center bg-cover object-cover' style={{ backgroundImage: `url(${bg})` }} >
                <form action="" className=' bg-gray-100 p-7 rounded-3xl shadow-lg border border-gray-400  flex flex-col gap-3 w-[89%] sm:w-[50%] md:w-[40%] lg:w-[28%] ' onSubmit={handleButton}>
                    <h1 className=' font-bold text-2xl'>Log in</h1>
                    <label className='font-semibold'>Email </label>
                    <div className=' bg-white border rounded flex items-center justify-between px-4 py-2'><input type="email" placeholder='Enter Your Email ' className='outline-none' value={email} onChange={(e) => setEmail(e.target.value)} />
                        <MdEmail size={20} /></div>
                    <label className='font-semibold'>Password  </label>
                    <div className=' bg-white border rounded flex items-center justify-between px-4 py-2'><input type={passwordVisible ? 'text' : 'password'}
                        value={password}
                         onChange={(e) => setPassword(e.target.value)} placeholder='Enter Your Password' className='outline-none' />
                        <span
                         onClick={togglePasswordVisibility}>
                            {passwordVisible ? <IoMdEye size={20} /> : <IoMdEyeOff size={20} />}</span>
                    </div>
                    <p className='text-right text-xs'> <Link to='/forget-password' className='text-blue-600 font-semibold underline px-1'>
                    Forget Password?
                    </Link></p>
                    <button type='submit' className='bg-black text-white rounded-lg py-2' disabled={loading}>
                        {loading ? 'loading..' : 'Login'}</button>

                    <div className='flex flex-col justify-center items-center gap-2 w-full'>
                        <p className='text-center'>Don't have an account? </p>
                        <Link to='/register' className='  font-semibold  px-1 w-full bg-white text-black rounded-lg text-center border border-gray-300 py-2 mt-3'> Register </Link>
                    </div>
                </form>

            </div>
        </>
    )
}

export default LoggedIn