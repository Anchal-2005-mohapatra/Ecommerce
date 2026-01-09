import React from 'react';
import { CiFacebook } from "react-icons/ci";
import { RiTwitterXFill } from "react-icons/ri";
import { FiYoutube } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa6";
import footer from "../../Assets/Footer/footer1.jpg"
import { useNavigate } from 'react-router-dom';

const Footer = () => {
   const navigate = useNavigate();
  return (
    <>
    <div className='grid gap-5'>
<img src={footer} alt="" className='w-full object-cover md:h-[200px]'/>
    <div className='text-sm px-6 lg:px-10 xl:px-16 py-5 bg-black text-white grid gap-3 lg:grid-cols-2 '>
      <div className='grid grid-cols-3 p-2'>
        <div>
          <p className='text-gray-500' >ABOUT</p>
          <ul className='py-2 space-y-2' >
            <li onClick={()=>navigate('/contact-us')} className='cursor-pointer'> Contact Us</li>
            <li onClick={()=>navigate('/about')} className='cursor-pointer'>About Us</li>
            <li>Careers</li>
          </ul>
        </div>

        <div>
          <p className='text-gray-500'>HELP</p>
          <ul className='py-2 space-y-2'>
            <li>Payments</li>
            <li>Shipping</li>
            <li>Cancellation & Returns</li>
            <li>FAQ</li>
          </ul>
        </div>
        <div>
          <p className='text-gray-500 '>CONSUMER POLICY</p>
          <ul className='py-2 space-y-2'>
            <li>Cancellation & Returns</li>
            <li>Terms Of Use</li>
            <li>Security</li>
            <li>Privacy</li>
            <li>Sitemap</li>
          </ul>
        </div>
      </div>
      <hr className='text-gray-300 block lg:hidden' />
      <div className='grid grid-cols-2 p-2'>
        <div>
          <p className='text-gray-500'>Mail Us: </p>
          <span className='text-white'>
            Shopping Internet Private Limited, Bhubaneswar</span>
          <div>
            <p className='text-gray-500 '>Social:</p>
            <ul className='flex gap-2 items-center'>
              <li><CiFacebook /></li>
              <li><RiTwitterXFill /></li>
              <li><FiYoutube /></li>
              <li><FaInstagram /></li>
            </ul>
          </div>
        </div>

        <div>
          < p className='text-gray-500'>Registered Office Address:</p>
          <p>Sundarapada, Bhubaneswar, </p>
        </div>

      </div>
    </div>
    </div></>
    
  )
}

export default Footer