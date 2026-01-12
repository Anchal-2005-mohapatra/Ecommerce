import React, { useState } from 'react'
import { IoIosArrowUp } from 'react-icons/io';
import Furniture from '../AllCategory/Furniture';
import MenFashion from '../AllCategory/MenFashion';
import WomenFashion from '../AllCategory/WomenFashion';
import OfficeAndSecurity from '../AllCategory/OfficeAndSecurity';

const Categories = ({ open, isClose }) => {
    const [openModal, setOpenModal] = useState(false);
    const [menModal, setMenModal] = useState(false);
    const [womenModal, setWomenModal] = useState(false);
    const [office, setOffice] = useState(false);
    if (!open)
        return null;
    return (
        <div>
            {/* <div
                className="fixed inset-0 bg-black/40 "
                onClick={isClose}
            /> */}
            <div
                className="absolute text-black top-full left-0
      bg-white w-[246px] p-3 shadow-lg z-[120] "
            >
                <ul className=' flex flex-col gap-4 text-[16px] font-normal w-full'>
                    <div className='group flex items-center justify-between  cursor-pointer border-b pb-3 hover:text-blue-400 hover:font-medium'
                        onMouseEnter={() => setOpenModal(true)}
                        onMouseLeave={() => setOpenModal(false)}
                    >
                        <li>
                            Furnitures
                        </li>
                        <IoIosArrowUp
                            className="transition-transform duration-300 group-hover:rotate-90"
                        />
                        <Furniture isOpen={openModal}
                            onClose={() => setOpenModal(false)}
                            className="relative " />
                    </div>


                    <div
                        className="group flex items-center justify-between cursor-pointer border-b pb-3
             hover:text-blue-400 hover:font-medium"
                        onMouseEnter={() => setMenModal(true)}
                        onMouseLeave={() => setMenModal(false)}>
                        <li>Men's Fashion</li>

                        <IoIosArrowUp
                            className="transition-transform duration-300 group-hover:rotate-90"
                        />
                        <MenFashion open={menModal} onClose={() => setMenModal(false)} />
                    </div>

                    <div className='group flex items-center justify-between  cursor-pointer border-b pb-3 hover:text-blue-400 hover:font-medium'
                        onMouseEnter={() => setWomenModal(true)}
                        onMouseLeave={() => setWomenModal(false)}>
                        <li>
                            Women's Fashion
                        </li>
                        <IoIosArrowUp
                            className="transition-transform duration-300 group-hover:rotate-90"
                        />

                        <WomenFashion open={womenModal} onClose={() => setWomenModal(false)} />

                    </div>
                    <div className='group flex items-center justify-between  cursor-pointer border-b pb-3 hover:text-blue-400 hover:font-medium'
                        onMouseEnter={() => setOffice(true)}
                        onMouseLeave={() => setOffice(false)}>
                        <li>
                            Office & Security
                        </li>
                        <IoIosArrowUp
                            className="transition-transform duration-300 group-hover:rotate-90"
                        />
                        <OfficeAndSecurity open={office} />
                    </div>
                    <div className='group flex items-center justify-between  cursor-pointer border-b pb-3 hover:text-blue-400 hover:font-medium'>
                        <li>
                            Smart Chair
                        </li>
                        <IoIosArrowUp
                            className="transition-transform duration-300 group-hover:rotate-90"
                        />
                    </div>
                    <li className='cursor-pointer border-b pb-3 hover:text-blue-400 hover:font-medium'>Room Accessories</li>
                    <li className='cursor-pointer border-b pb-3 hover:text-blue-400 hover:font-medium'>Kitchenware</li>
                    <li className='cursor-pointer border-b pb-3 hover:text-blue-400 hover:font-medium'>Home Decorations</li>
                    <li className='cursor-pointer pb-3 hover:text-blue-400 hover:font-medium'>Innovative Furnitures</li>
                </ul>
            </div>

        </div>
    )
}

export default Categories;