import React from 'react'

const KidsModal = ({ open, onCLose }) => {
    if (!open) return null;
    return (
        <div className='absolute top-full -left-48 bg-white p-2 h-[450px] w-[1000px] overflow-auto'>
            <div className='flex  gap-5 p-4'>

                <div className=' flex flex-col gap-2 bg-white  p-2'>
                    <div className=''>
                        <span className='text-orange-600 font-bold'>Boys Clothing</span>
                        <ul className=' text-sm py-2 space-y-1'>
                            <li className='hover:font-bold'>T-Shirts</li>
                            <li className='hover:font-bold'>Shirts</li>
                            <li className='hover:font-bold'>Shorts</li>
                            <li className='hover:font-bold'>Jeans</li>
                            <li className='hover:font-bold'>Trousers</li>
                            <li className='hover:font-bold'>Clothing Sets</li>
                            <li className='hover:font-bold'>Ethnic Wears</li>
                            <li className='hover:font-bold'>Tracks Pants & Pyjamas</li>
                            <li className='hover:font-bold'>
                                Jackets, Sweater & Sweatshirts
                            </li>
                            <li className='hover:font-bold'>
                                Party Wear
                            </li>
                            <li className='hover:font-bold'>
                                InnerWear & Themals
                            </li>
                            <li className='hover:font-bold'>
                                Nightwear & Loungewear
                            </li>
                            <li className='hover:font-bold'>
                                Value Packs
                            </li>
                        </ul>
                    </div>

                </div>


                <div>
                    <div className=' py-2'>
                        <span className='font-bold  text-orange-600 text-sm'>Girls Clothing</span>
                        <ul className='text-sm py-2 space-y-1'>
                            <li className='hover:font-bold'>Dresses</li>
                            <li className='hover:font-bold'>Tops</li>
                            <li className='hover:font-bold'>Tshirts</li>
                            <li className='hover:font-bold'>Clothing Sets </li>
                            <li className='hover:font-bold'>Lehenga choli</li>
                            <li className='hover:font-bold'>Kurta Sets
                            </li>
                            <li className='hover:font-bold'>Party Wear</li>
                            <li className='hover:font-bold'>Dungarees & Jumpsuits</li>
                            <li className='hover:font-bold'>Skirt & shorts</li>
                            <li className='hover:font-bold'>Tights & Leggings</li>
                            <li className='hover:font-bold'>Jeans, Trouser & Capris</li>
                            <li className='hover:font-bold'>Innerwearr & Thermals</li>
                            <li className='hover:font-bold'>Nightwear & Loungewear</li>
                            <li className='hover:font-bold'>Value Packs</li>
                        </ul>
                    </div>
                   
                </div>

                <div className='flex flex-col gap-2'>
                    <div className='border-b-2 py-2'>
                        <div className='flex flex-col gap-3'>
                            <span className='text-orange-600 font-bold text-sm'>Footwear</span>
                        </div>
                        <ul className=' text-sm py-2 space-y-1'>
                            <li className='hover:font-bold'>Flipflops</li>
                            <li className='hover:font-bold'> Casual Shoes</li>
                            <li className='hover:font-bold'>Sports Shoes</li>
                            <li className='hover:font-bold'>Flats</li>
                            <li className='hover:font-bold'>Heels</li>
                            <li className='hover:font-bold'>Scholl Shoes</li>
                            <li className='hover:font-bold'>Socks</li>

                        </ul>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <span className='text-orange-600 font-bold text-sm'>Toys & Games</span>
                        <ul className='text-sm py-2 space-y-1'>
                            <li className='hover:font-bold'>
                                Learning & Development
                            </li>
                            <li className='hover:font-bold'>Active Toys</li>
                            <li className='hover:font-bold'>Soft Toys</li>
                            <li className='hover:font-bold'>Action Figure / play set</li>
                        </ul>

                    </div>
                </div>

                <div className='flex flex-col gap-2'>
                    <div className='py-2 border-b-2 '>
                        <span className='text-orange-600 font-bold text-sm flex flex-wrap'>Infants</span>
                        <ul className='text-sm py-2 space-y-1'>
                            <li className='hover:font-bold'>
                                Bodysuits
                            </li>
                            <li className='hover:font-bold'>
                                Rompers & Sleepsuits
                            </li>
                            <li className='hover:font-bold'>Clothing Sets</li>
                            <li className='hover:font-bold'>Tshirts & Tops</li>
                            <li className='hover:font-bold'>Dresses</li>
                            <li className='hover:font-bold'>Bottom wear</li>
                            <li className='hover:font-bold'>Winter Wear</li>
                            <li className='hover:font-bold'>Innerwear & Sleepwear</li>
                            <li className='hover:font-bold'>Infant Care</li>

                        </ul>
                    </div>

                    <div>
                        <span className='text-orange-600 text-sm font-bold'>Home & Bath</span>
                        <span className='text-orange-600 text-sm font-bold'>Personal Care</span>

                    </div>
                </div>

                <div className='flex flex-col gap-2'>
                    <div className='border-b-2 py-2'>
                        <span className='font-bold text-sm text-orange-600'>Kida Accessories</span>
                        <ul className='texts-sm py-2 space-y-1'>
                            <li className='hover:font-bold'>
                                Bags & Backpacks
                            </li>
                            <li className='hover:font-bold'>
                                Watches
                            </li>
                            <li className='hover:font-bold'>Jwellery & Hair accessory</li>
                            <li className='hover:font-bold'>Sunglasses</li>
                            <li className='hover:font-bold'>Masks & Protective Gears</li>
                            <li className='hover:font-bold'>Caps & Hats</li>
                        </ul>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <span className='text-orange-600 font-bold'>Brands</span>
                        <ul className='texts-sm py-2 space-y-1'>
                            <li className='hover:font-bold'>
                                H&M
                            </li>
                            <li className='hover:font-bold'>Max Kids</li>
                            <li className='hover:font-bold'>Pantaloons</li>
                            <li className='hover:font-bold'>United Colors Of Benetton Kids</li>
                            <li className='hover:font-bold'>YK</li>
                            <li className='hover:font-bold'>U.S. Polo Assn. Kids</li>
                            <li className='hover:font-bold'>Mothercare</li>
                            <li className='hover:font-bold'>HRX</li>

                        </ul>
                    </div>
                   
                </div>

            </div>
        </div>
    )
}

export default KidsModal