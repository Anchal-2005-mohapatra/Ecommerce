import React,{useState} from 'react';
import bg from "../../Assets/Images/bg.jpg";
import { MdEmail } from "react-icons/md";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";



const ForgetPassword = () => {
    const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
     const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    }
    // const buttonHandler = () => {
    //   const data ={
    //     email, 
    //     newPassword: password,
    //     confirmPassword: password
    //   }

    // }
  return (
    <div className='flex flex-col min-h-screen items-center justify-center bg-no-repeat bg-center bg-cover object-cover' style={{ backgroundImage: `url(${bg})` }} >
        <form action=""  className='bg-gray-100 p-7 rounded-3xl shadow-lg border border-gray-400  flex flex-col gap-3   w-[89%] sm:w-[50%] md:w-[40%] lg:w-[28%]  '>
            <label className='font-semibold'>Email</label>
             <div className=' bg-white border rounded flex items-center justify-between px-4 py-2'>
                <input type="email" placeholder='Enter your email' className='outline-none' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <MdEmail size={20} /></div> 
                      <label className='font-semibold'>Password  </label>
                <div className=' bg-white border rounded flex items-center justify-between px-4 py-2'><input type={passwordVisible ? 'text' : 'password'}
                    value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Your Password' className='outline-none' />
                    <span onClick={togglePasswordVisibility}>{passwordVisible ? <IoMdEye size={20} /> : <IoMdEyeOff size={20} />}</span></div>
        </form>
    </div>
  )
}

export default ForgetPassword