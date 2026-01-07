import React from 'react'

const BeautyModals = ({ open, onClose }) => {
    if (!open) return null;
    return (
        <div className='absolute top-full -left-64 bg-white p-2 h-[450px] w-[1000px] overflow-auto'>
            <div className='flex gap-5 p-4 justify-between'>

                <div className=' flex flex-col gap-2'>
                    <div className='py-2'>
                        <span className='text-emerald-500 font-bold'>Makeup</span>
                        <ul className=' text-sm py-2 space-y-1'>
                            <li className='hover:font-bold'>Lipstick</li>
                            <li className='hover:font-bold'>Lip Gloss</li>
                            <li className='hover:font-bold'>Lip Liner</li>
                            <li className='hover:font-bold'>Mascara</li>
                            <li className='hover:font-bold'>Eyeliner</li>
                            <li className='hover:font-bold'>Kajal</li>
                            <li className='hover:font-bold'>Foundation</li>
                            <li className='hover:font-bold'>Primer</li>
                            <li className='hover:font-bold'>Concealer</li>
                            <li className='hover:font-bold'>Compact</li>
                            <li className='hover:font-bold'>Nail Polish</li>
                        </ul>
                    </div>

                </div>

                <div className=' flex flex-col gap-2'>
                    <div className='border-b-2 py-2'>
                        <span className='font-bold text-emerald-500 text-sm'>Skincare, Bath & Body</span>
                        <ul className='text-sm py-2 space-y-1'>
                            <li className='hover:font-bold'>Face Moisturiser</li>
                            <li className='hover:font-bold'>Cleanser</li>
                            <li className='hover:font-bold'>Masks & Peel</li>
                            <li className='hover:font-bold'>Sunscreen</li>
                            <li className='hover:font-bold'>Serum</li>
                            <li className='hover:font-bold'>Face Wash</li>
                            <li className='hover:font-bold'>Eye Cream</li>
                            <li className='hover:font-bold'>Lip Balm</li>
                            <li className='hover:font-bold'>Body Lotion</li>
                            <li className='hover:font-bold'>Body Wash</li>
                            <li className='hover:font-bold'>Body  Scrub </li>
                            <li className='hover:font-bold'>hand Cream</li>
                        </ul>
                    </div>
                    <div className='py-2 space-y-3'>
                        <span className='text-sm font-bold text-emerald-500 '>Baby Care</span>
                        <span className='text-sm font-bold text-emerald-500 '>Masks</span>
                    </div>
                </div>

                <div className='flex flex-col gap-2'>
                    <div className='border-b-2 py-2'>
                        <span className='text-emerald-500 font-bold text-sm'>Haircare</span>
                        <ul className=' text-sm py-2 space-y-1'>
                            <li className='hover:font-bold'>Shampoo</li>
                            <li className='hover:font-bold'>Conditioner</li>
                            <li className='hover:font-bold'>Hair Cram </li>
                            <li className='hover:font-bold'>Hair Oil</li>
                            <li className='hover:font-bold'>Hair Color</li>
                            <li className='hover:font-bold'>Hair Gel</li>
                            <li className='hover:font-bold'>Hair Serum</li>
                            <li className='hover:font-bold'>Hair Accessory</li>
                        </ul>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <span className='text-emerald-500 font-bold text-sm'>Fragrances</span>
                        <ul className=' text-sm py-2 space-y-1'>
                            <li className='hover:font-bold'>
                                Perfume
                            </li>
                            <li className='hover:font-bold'>Deodorant</li>
                            <li className='hover:font-bold'>Body Mist</li>
                        </ul>

                    </div>
                </div>

                <div className='flex flex-col gap-2'>
                    <div className='py-2 border-b-2 '>
                        <span className='text-emerald-500 font-bold text-sm flex flex-wrap'>Appliances </span>
                        <ul className='text-sm py-2 space-y-1'>
                            <li className='hover:font-bold'>
                                Hair Straightener
                            </li>
                            <li className='hover:font-bold'>
                                Hair Dryer
                            </li>
                            <li className='hover:font-bold'>Epilator</li>

                        </ul>
                    </div>

                    <div className='py-2 border-b-2'>
                        <span className='text-emerald-500 text-sm font-bold'>Men's Grooming </span>
                        <ul className='text-sm py-2 space-y-1'>
                            <li className='hover:font-bold'>Trimmers</li>
                            <li className='hover:font-bold'>Beard Oil</li>
                            <li className='hover:font-bold'>Hair Wax</li>

                        </ul>
                    </div>
                    <div className='border-b-2 py-2'>
                        <span className='font-bold text-sm text-emerald-500'>Beauty Gift & Makeup Set</span>
                        <ul className='texts-sm py-2 space-y-1'>
                            <li className='hover:font-bold'>
                                Beauty Gift
                            </li>
                            <li className='hover:font-bold'>Makeup Kit</li>

                        </ul>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <span className='text-emerald-500 font-bold'>Premium Beauty</span>
                        <span className='text-emerald-500 font-bold'>Wellness & Hygiene</span>
                    </div>
                </div>

                <div className='flex flex-col gap-3'>
                    <div className='py-2 '>
                        <span className='text-emerald-500 font-bold text-sm flex flex-wrap'>Top Brands </span>
                        <ul className='text-sm py-2 space-y-1'>
                            <li className='hover:font-bold'>
                                Lakme
                            </li>
                            <li className='hover:font-bold'>
                                Maybelline
                            </li>
                            <li className='hover:font-bold'>LOreal</li>
                            <li className='hover:font-bold'>Philips</li>
                            <li className='hover:font-bold'>Bath & Body Works</li>
                            <li className='hover:font-bold'>THE BODY SHOP</li>
                            <li className='hover:font-bold'>Biotique</li>
                            <li className='hover:font-bold'>Mamaearth</li>
                            <li className='hover:font-bold'>MCaffine</li>
                            <li className='hover:font-bold'>Nivea</li>
                            <li className='hover:font-bold'>Lotus Herbals</li>
                            <li className='hover:font-bold'>LOreal Professionnel</li>
                            <li className='hover:font-bold'>KAMA AYURVEDA</li>
                            <li className='hover:font-bold'>M.A.C</li>
                            <li className='hover:font-bold'>Forest Essentitals</li>

                        </ul>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default BeautyModals