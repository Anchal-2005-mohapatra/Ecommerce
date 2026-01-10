import React from 'react'

const WomenModal = ({ open, onClose }) => {
    if (!open)
        return null;
    return (
        <div className='absolute top-full left-1/2 -translate-x-1/2  bg-white p-2 h-[450px] w-[1000px] overflow-auto'>
            <div className='flex  gap-5 p-4 justify-between'>

                <div className=' flex flex-col gap-2 bg-white  p-2'>
                    <div className='border-b-2 '>
                        <span className='text-pink-500 font-bold'>Indian & Fusion Wear</span>
                        <ul className=' text-sm py-2 space-y-1'>
                            <li className='hover:font-bold'>Kurtas & Suits</li>
                            <li className='hover:font-bold'>Kurtis, Tunics & Tops</li>
                            <li className='hover:font-bold'>Sarees</li>
                            <li className='hover:font-bold'>Ethnic Wear</li>
                            <li className='hover:font-bold'>Leggings, Salwars & Churidars</li>
                            <li className='hover:font-bold'>Skirts & Plazzos</li>
                            <li className='hover:font-bold'>Dress Materials</li>
                            <li className='hover:font-bold'>Lehenga Cholis</li>
                            <li className='hover:font-bold'>
                                Dupattas & Shawls
                            </li>
                            <li className='hover:font-bold'>
                                Jackets
                            </li>
                        </ul>
                    </div>
                    <div>
                        <span className='text-pink-500 font-bold text-sm'> Belts, Scarves & More</span>
                        <span className='text-pink-500 font-bold text-sm'> Watches & Wearables</span>

                    </div>
                </div>


                <div>
                    <div className='border-b-2 py-2'>
                        <span className='font-bold text-pink-500 text-sm'>Western Wear</span>
                        <ul className='text-sm py-2 space-y-1'>
                            <li className='hover:font-bold'>Dresses</li>
                            <li className='hover:font-bold'>Tops</li>
                            <li className='hover:font-bold'>Tshirts</li>
                            <li className='hover:font-bold'>Jeans </li>
                            <li className='hover:font-bold'>Trousers & Capris</li>
                            <li className='hover:font-bold'>Shorts &
                                Skirts
                            </li>
                            <li className='hover:font-bold'>Co-ords</li>
                            <li className='hover:font-bold'>Playsuits</li>
                            <li className='hover:font-bold'>Jumpsuits</li>
                            <li className='hover:font-bold'>Sweaters & Sweatshirts</li>
                            <li className='hover:font-bold'>Jackets & Coats</li>
                            <li className='hover:font-bold'>Blazers & Waistcoats</li>
                            <li className='hover:font-bold'>Shrugs</li>
                        </ul>
                    </div>
                    <div className='py-2'>
                        <span className='text-sm font-bold text-pink-500 '>Plus Size</span>
                    </div>
                </div>

                <div className='flex flex-col gap-2'>
                    <div className='border-b-2 py-2'>
                      <div className='flex flex-col gap-3'>
                        <span className='text-pink-500 font-bold text-sm'>Maternity</span>
                        <span className='text-pink-500 font-bold text-sm'>Sunglasses & Frames</span>
                        <span className='text-pink-500 font-bold text-sm'>Footwear</span></div>  
                        <ul className=' text-sm py-2 space-y-1'>
                            <li className='hover:font-bold'>Flats</li>
                            <li className='hover:font-bold'> Casual Shoes</li>
                            <li className='hover:font-bold'>Heels</li>
                            <li className='hover:font-bold'>Boots</li>
                            <li className='hover:font-bold'>Sports Shoes & Floaters</li>
                          
                        </ul>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <span className='text-pink-500 font-bold text-sm'>sports & Active Wear</span>
                       <ul className='text-sm py-2 space-y-1'>
                        <li className='hover:font-bold'>
                            Clothing
                        </li>
                        <li className='hover:font-bold'>Footewear</li>
                        <li className='hover:font-bold'>Sports Accessories</li>
                        <li className='hover:font-bold'>sports Equipment</li>
                        </ul>

                    </div>
                </div>

                <div className='flex flex-col gap-2'>
                    <div className='py-2 border-b-2 '>
                        <span className='text-pink-500 font-bold text-sm flex flex-wrap'>Lingerie & Sleepwear</span>
                        <ul className='text-sm py-2 space-y-1'>
                            <li className='hover:font-bold'>
                                Bra
                            </li>
                            <li className='hover:font-bold'>
                                Briefs
                            </li>
                            <li className='hover:font-bold'>Shapewear</li>
                            <li className='hover:font-bold'>Swimwear</li>
                            <li className='hover:font-bold'>CAmisoles & Thermals</li>
                           
                        </ul>
                    </div>

                    <div>
                        <span className='text-pink-500 text-sm font-bold'>Beauty & Personal Care </span>
                        <ul className='text-sm py-2 space-y-1'>
                            <li className='hover:font-bold'>Makeup</li>
                            <li className='hover:font-bold'>Skincare</li>
                            <li className='hover:font-bold'>Premium Beauty</li>
                            <li className='hover:font-bold'>Lipsticks</li>
                            <li className='hover:font-bold'>Fragrances</li>
                        </ul>
                    </div>
                </div>

                <div className='flex flex-col gap-2'>
                    <div className='border-b-2 py-2'>
                        <span className='font-bold text-sm text-pink-500'>Gadgets</span>
                        <ul className='texts-sm py-2 space-y-1'>
                            <li className='hover:font-bold'>
                                Smart Wearables
                            </li>
                            <li className='hover:font-bold'>Fitness Gadgets</li>
                            <li className='hover:font-bold'>Headphones</li>
                            <li className='hover:font-bold'>Speakers</li>
                        </ul>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <span className='text-pink-500 font-bold'>jewellery</span>
                           <ul className='texts-sm py-2 space-y-1'>
                            <li className='hover:font-bold'>
                                Fashion Jewellery
                            </li>
                            <li className='hover:font-bold'>Fine Jewellery</li>
                            <li className='hover:font-bold'>Earings</li>
                            
                        </ul>
                    </div>
                     <div className='flex flex-col gap-3'>
                        <span className='text-pink-500 font-bold'>Backpacks</span>
                        <span className='text-pink-500 font-bold'>Handbags, Bags & Wallets</span>
                        <span className='text-pink-500 font-bold'>Luggages & Trolleys</span>
                        </div>
                </div>

            </div>
        </div>
    )
}

export default WomenModal