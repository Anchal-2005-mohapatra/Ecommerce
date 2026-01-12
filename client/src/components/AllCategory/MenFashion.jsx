import React from 'react'

const MenFashion = ({ open, onClose }) => {
  return (
    <div
      className={`absolute top-0 left-full bg-white p-2 h-[450px] w-[1000px]
      overflow-scroll z-50
      transform transition-all duration-500 ease-in-out
      ${open ? "translate-x-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"}`}
    >
      <div className='flex  gap-5 p-4 justify-between'>

        <div className=' flex flex-col gap-2 bg-white  p-2'>
          <div className='border-b-2 py-2'>
            <span className='text-pink-500 font-bold'>Top Wear</span>
            <ul className=' text-sm py-2 space-y-1'>
              <li className='hover:font-bold'>T-Shirt</li>
              <li className='hover:font-bold'>Casual Shirt</li>
              <li className='hover:font-bold'>Formal Shirt</li>
              <li className='hover:font-bold'>Sweatshirt</li>
              <li className='hover:font-bold'>Sweater</li>
              <li className='hover:font-bold'>Jackets</li>
              <li className='hover:font-bold'>Blazzer & Coats</li>
              <li className='hover:font-bold'>Suits</li>
              <li className='hover:font-bold'>Rain Jackets</li>
            </ul>
          </div>
          <div>
            <span className='text-pink-500 font-bold text-sm'>Indians & Festive Wear</span>
            <ul className=' text-sm py-2 space-y-1'>
              <li className='hover:font-bold'>Kurtas</li>
              <li className='hover:font-bold'>Sherwanis</li>
              <li className='hover:font-bold'>Nehru Jacket</li>
              <li className='hover:font-bold'>Dhotis</li>
            </ul>
          </div>
        </div>


        <div>
          <div className='border-b-2 py-2'>
            <span className='font-bold text-pink-500 text-sm'>Bottomwear</span>
            <ul className='text-sm py-2 space-y-1'>
              <li className='hover:font-bold'>Jeans</li>
              <li className='hover:font-bold'>Casual Trousers</li>
              <li className='hover:font-bold'>Formal Trousers</li>
              <li className='hover:font-bold'>Track Pants & Joggers</li>
              <li className='hover:font-bold'>Shorts</li>
            </ul>
          </div>
          <div className='border-b-2 py-2'>
            <span className='text-sm font-bold text-pink-500'>Innerwear & Sleepwear</span>
            <ul className='text-sm py-2 space-y-1'>
              <li className='hover:font-bold'>Brief & Trunks</li>
              <li className='hover:font-bold'>Boxers</li>
              <li className='hover:font-bold'>Vests</li>
              <li className='hover:font-bold'>Sleepwear & Loungewear</li>
              <li className='hover:font-bold'>Thermals</li>
            </ul>
          </div>
          <div className='py-2'>
            <span className='text-sm font-bold text-pink-500 '>Plus Size</span>
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <div className='border-b-2 py-2'>
            <span className='text-pink-500 font-bold text-sm'>Footwears</span>
            <ul className=' text-sm py-2 space-y-1'>
              <li className='hover:font-bold'>Casual Shoes</li>
              <li className='hover:font-bold'>Sports Shoes</li>
              <li className='hover:font-bold'>Formal Shoes</li>
              <li className='hover:font-bold'>Sneaker</li>
              <li className='hover:font-bold'>Sandles & Floters</li>
              <li className='hover:font-bold'>flip & Flop</li>
              <li className='hover:font-bold'>Socks</li>
            </ul>
          </div>
          <div className='flex flex-col gap-2'>
            <span className='text-pink-500 font-bold text-sm'>Personal Care & Grooming</span>
            <span className='text-pink-500 font-bold text-sm'>sun Glasses</span>
            <span className='text-pink-500 font-bold text-sm'>Watches</span>

          </div>
        </div>

        <div className='flex flex-col gap-2'>
          <div className='py-2 border-b-2 '>
            <span className='text-pink-500 font-bold text-sm flex flex-wrap'>Sports & Active Wear </span>
            <ul className='text-sm py-2 space-y-1'>
              <li className='hover:font-bold'>
                Sports Shoes
              </li>
              <li className='hover:font-bold'>
                Sports Sandle
              </li>
              <li className='hover:font-bold'>Active T-Shirts</li>
              <li className='hover:font-bold'>Track Pants & Shorts</li>
              <li className='hover:font-bold'>Jacket & SweatShirts</li>
              <li className='hover:font-bold'>Sports Accessories</li>
              <li className='hover:font-bold'>Swim wear</li>
            </ul>
          </div>

          <div>
            <span className='text-pink-500 text-sm font-bold'>Gadgets </span>
            <ul className='text-sm py-2 space-y-1'>
              <li className='hover:font-bold'>Smart Wearables</li>
              <li className='hover:font-bold'>Featness Gadgets</li>
              <li className='hover:font-bold'>HeadPhones</li>
              <li className='hover:font-bold'>Speakers</li>
            </ul>
          </div>
        </div>

        <div className='flex flex-col gap-2'>
          <div className='border-b-2 py-2'>
            <span className='font-bold text-sm text-pink-500'>Fashion Accessories</span>
            <ul className='texts-sm py-2 space-y-1'>
              <li className='hover:font-bold'>
                Wallets
              </li>
              <li className='hover:font-bold'>Belts</li>
              <li className='hover:font-bold'>Perfumes & BodyMist</li>
              <li className='hover:font-bold'>Deodorants</li>
              <li className='hover:font-bold'>Trimmers</li>
              <li className='hover:font-bold'>Ties & Cufflinks & Pockets</li>
              <li className='hover:font-bold'>Caps & Hats</li>
              <li className='hover:font-bold'>Ring & Wristwears</li>
              <li className='hover:font-bold'>Helments</li>
            </ul>
          </div>
          <div className='flex flex-col gap-2'>
            <span className='text-pink-500 font-bold'>Bags & BackPack</span>
            <span className='text-pink-500 font-bold'>Luggages & Troleys</span>
          </div>
        </div>
      </div>

    </div>


  )

}

export default MenFashion