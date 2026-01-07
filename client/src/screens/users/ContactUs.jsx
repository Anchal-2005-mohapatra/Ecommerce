import React, { useState } from 'react';
import { MdOutlineShoppingBag } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { IoMdPeople } from "react-icons/io";
import { GiReturnArrow } from "react-icons/gi";
import { BiSolidOffer } from "react-icons/bi";
import { MdPayments } from "react-icons/md";
import { GiWallet } from "react-icons/gi";


const ContactUs = () => {


  const Module1 = () =>
   <div className='flex flex-col gap-2 p-3 w-full h-[100px] bg-gray-100 m-4'>
    <div className=''>
      <p className='text-sm p-1'>Select the item we can help you with</p>
    </div>
    <div className='p-1 bg-white h-[100px] flex justify-center items-center'>

      <p className='text-center text-xs'>There are no orders to show</p>
    </div>
  </div>;

  const Module2 = () => (
    <div className='mt-5 '>
      <p className='font-semibold'>Browse Topics</p>
      <div className='grid grid-cols-2  lg:grid-cols-4 items-center
      '>
        <div className='flex items-center gap-3 border p-3 rounded-lg m-2 flex-nowrap cursor-pointer'>
          <div className='h-8 w-8 rounded-full bg-pink-100 flex items-center justify-center'>
            <IoMdPeople />
          </div>
          <p>Account</p>
        </div>
        <div className='flex items-center gap-3 border p-3 rounded-lg m-2 flex-nowrap cursor-pointer'>
          <div className='h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center flex-nowrap'>
            <GiReturnArrow  size={16}/>
          </div>
          <p>Return & Exchanges</p>
        </div>
        <div className='flex items-center gap-3 border p-3 rounded-lg m-2 cursor-pointer'>
          <div className='h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center'>
            <BiSolidOffer />
          </div>
          <p>Offers</p>
        </div>
        <div className='flex items-center gap-3 border p-3 rounded-lg m-2 cursor-pointer'>
          <div className='h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center'>
            <MdPayments />
          </div>
          <p>Payments</p>
        </div>
        <div className='flex items-center gap-3 border p-3 rounded-lg m-2 cursor-pointer'>
          <div className='h-8 w-8 rounded-full bg-red-50 flex items-center justify-center'>
            <GiWallet />
          </div>
          <p>Cancellstions & Changes</p>
        </div>
      </div>
    </div>
  )
  
  const Module3 =()=>{
      const currentMonthYear = new Date().toLocaleString('default',{month:'long', year:'numeric'})

 return <div className='border h-full p-4 flex flex-col gap-6'>
  <div className=' grid gap-2 md:flex items-center p-2'>
   <div className=' border-b  py-2 md:border-r md:w-[80%] '>
    <p>Queroes from last 30 Days</p>
    </div> 
    <button className='text-pink-500 w-[20%]'>CHANGE</button>
  </div>

  <div className='flex items-center justify-center flex-col'>
    <div  className='bg-gray-300 h-[80px] w-[80px] rounded-full'></div>
    <div className='text-center space-y-3'>
      <p className='font-semibold'>No queries found</p>
    <p>There were no queries raised in <span className='font-semibold'>{currentMonthYear }</span></p>
    </div>
  </div>
</div>
  }


  const Module4 =()=>(
    <div className='p-4 flex flex-col gap-3'>
      <p className='font-semibold '>POSTAL ADDRESS</p>

        <div>
          <ul className='mb-4'>
            <li>Return Processing Facility</li>
            <li>Survey Numbers 231, 232, and 233</li>
            <li>Soukya Road, Samethanhali Village</li>
            <li>Bangalore-560067</li>
          </ul>
        </div>

        <div>
          <p>Corporative Office</p>
          <ul><li>
            Shopping Design pvt.Ltd</li>
            <li>Buildings Alyssa</li>
            <li>Begonia and clover situated in 
              Embssy Tech Village, </li>
              <li>Devaraveesanahail village,  </li>
              <li>Barthur Hobi,
                <li>Bangaluru, 56103, India</li>
              </li>
            </ul>
        </div>
    </div>
  );
    const Items = [
    { id: 1, text: "Order Related Queries" , module:'module1'},
    { id: 2, text: "Non-order Related issues",  module:'module2' },
    { id: 3, text: "Recent Issues",  module:'module3' },
  ]

  const postal =[
    { id: 1, text: "Postal address",  module:'module4' },
  ]

  const handlePostal=()=>{
    setActiveModule('module4')
  }
  const [textColor, setTextColor] = useState(1);
  const [activeModule, setActiveModule] = useState("module1");

  const handleButton = (item) => {
    setTextColor(item.id);
    setActiveModule(item.module);
  }

  // const handleModule = (moduleName) => {
  //   setActiveModule(moduleName)
  // }

  const renderModule = () => {
    switch (activeModule) {
      case "module1":
        return <Module1 />;
      case 'module2':
        return <Module2 />
      case 'module3':
        return <Module3 />
      case 'module4':
        return <Module4 />
      default:
        return null;
    }
  }
  return (
    <div className='px-6 lg:px-10 xl:px-16 mt-3 mb-5 bg-white py-6 '>
      <div className='grid gap-4 md:flex items-center border-b pb-4'>
        <div className=' p-3 md:w-[30%]'>
          <span className='font-bold '>HELP CENTER</span>
          <p className='text-gray-500'>We are here to help you</p>
        </div>
        <div className='border p-3 grid  gap-3 md:flex justify-between md:w-[70%]'>
          <div className='flex items-center gap-3'>
            <MdOutlineShoppingBag className='text-5xl' />
            <div>
              <span>TRACK, CANCEL, RETURN/EXCHANDE</span>
              <p className='text-gray-500'>Manage Your purcheses</p>
            </div>
          </div>
          <div className='border border-emerald-500 rounded-lg flex items-center justify-center'>
            <button className='text-emerald-500 p-3 '>ORDERS</button>
          </div>


        </div>
      </div>

      <div className='flex gap-3 p-2'>
        <div className='border-r my-5 px-2 '>
          <div className='border-b py-4 flex flex-col gap-4'>
            <p className='font-semibold'>SELECT QUERY TYPE</p>
            {Items.map((item) => (
              <div className={`cursor-pointer flex items-center justify-between  ${textColor === item.id ? "text-green-400" : "black"}`} key={item.id} onClick={() => handleButton(item)} >
                <p>{item.text}</p>
                <IoIosArrowForward />
                {/* <p>{textColor === item.id ? <IoIosArrowDown/>: <IoIosArrowForward/>}</p> */}
              </div>
            ))}

            {/* <div className='flex items-center justify-between'>
            <p></p>
            <IoIosArrowForward />
          </div>
          <div className='flex items-center justify-between'>
            <p></p>
            <IoIosArrowForward />
          </div> */}
          </div>

          <div className='py-5 cursor-pointer '>
            <div className='flex items-center justify-between'>
              <p>Frequently Asked Questions</p>
              <IoIosArrowForward />
            </div>
          </div>

          <div>
            <div className='pt-5 cursor-pointer'>
              <p>Want to reach us old style? Here is our</p>
              <p className='text-blue-400' >{postal.map((item)=>
              (
                <div key={item.id} onClick={()=>handlePostal(item)}>
                  {item.text}
                </div>
              ))}</p>
            </div>
          </div>
        </div>

      
        <div className='w-full'>
          {renderModule()}
        </div>
      </div>
    </div>
  )
}

export default ContactUs