import React from 'react'
import { RxCross2 } from "react-icons/rx";
import { NavLink } from 'react-router-dom';
// import MenModal from '../home/MenModal';

const Sidebar = ({ open, onClose }) => {
   

    return (
        <div
            className={`fixed inset-0 z-40 transition-opacity duration-300 ${open ?
                'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
            <div onClick={onClose} className='bg-black bg-opacity-65 absolute inset-0' />
            <div className={`fixed top-0 left-0 z-50 inset-0 bg-black bg-opacity-80 shadow-lg 
            min-h-screen w-[70%] md:w-[40%] 
            transform transition-transform duration-300 ease-in-out
             ${open ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className='flex py-5 px-4 text-white'>

                    <div className='w-full'>
                        <div className='flex items-end justify-end'>
                            <RxCross2 onClick={onClose} className='text-right' size={20} /></div>
                        <div>
                            <div className='py-10 '>
                                <ul className='flex flex-col gap-5   text-gray-800 font-semibold text-sm justify-between '>
                                    <li className="relative">
                                        <NavLink onClick={onClose}
                                            to="/category/men"
                                            className={({ isActive }) =>
                                                `cursor-pointer font-semibold text-sm pb-1 ${isActive
                                                    ? "text-red-600 border-b-2 border-red-600"
                                                    : "text-white hover:text-red-500"
                                                }`
                                            }
                                        >
                                            MEN
                                        </NavLink>
                                    </li>

                                    <li className='relative' >
                                        <NavLink onClick={onClose}
                                            to="/category/women"
                                            className={({ isActive }) =>
                                                `cursor-pointer font-semibold text-sm pb-1 ${isActive
                                                    ? "text-red-600 border-b-2 border-red-600"
                                                    : "text-white hover:text-red-500"
                                                }`
                                            }
                                        >WOMEN
                                        </NavLink>
                                    </li>

                                    <li className='relative' >
                                        <NavLink onClick={onClose}
                                         to="/category/kids"
                                            className={({ isActive }) =>
                                                `cursor-pointer font-semibold text-sm pb-1 ${isActive
                                                    ? "text-red-600 border-b-2 border-red-600"
                                                    : "text-white hover:text-red-500"
                                                }`
                                            }>KIDS
                                        </NavLink>
                                    </li>

                                    <li className='relative'>
                                        <NavLink onClick={onClose}
                                            to="/category/beauty"
                                            className={({ isActive }) =>
                                                `cursor-pointer font-semibold text-sm pb-1 ${isActive
                                                    ? "text-red-600 border-b-2 border-red-600"
                                                    : "text-white hover:text-red-500"
                                                }`
                                            }
                                        > BEAUTY
                                        </NavLink>
                                    </li>

                                    <li className='relative'>
                                        <NavLink onClick={onClose}
                                            to="/category/trends"
                                            className={({ isActive }) =>
                                                `cursor-pointer font-semibold text-sm pb-1 ${isActive
                                                    ? "text-red-600 border-b-2 border-red-600"
                                                    : "text-white hover:text-red-500"
                                                }`
                                            }
                                        >TRENDS
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar