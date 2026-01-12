import React, { useState, useEffect } from 'react'
import logo from "../../Assets/Logo/logo.png";
import { IoMdSearch } from "react-icons/io";
import { IoPerson } from "react-icons/io5";
import { FaShoppingBag } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import Modal from '../home/Modal';
// import { IoIosNotifications } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../../api/axiosConfig';
import MenModal from '../home/MenModal';
import WomenModal from '../home/WomenModal';
import KidsModal from '../home/KidsModal';
import BeautyModals from '../home/BeautyModals';
import { NavLink } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import Sidebar from './Sidebar';
import { IoIosArrowDown } from "react-icons/io";
import Categories from '../home/Categories';
// import toast from 'react-hot-toast';


const Navbar = () => {
  const [profile, setProfile] = useState(false);
  const navigate = useNavigate();
  const { userId, refreshCart, refreshWishlist, searchQuery, setSearchQuery } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItem, setWishlistItem] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [menModal, setMenModal] = useState(false);
  const [womenModal, setWomenModal] = useState(false);
  const [kidModal, setKidModal] = useState(false);
  const [beautyModal, setBeautyModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [openHam, setOpenHam] = useState(false);
  // const [searchProduct, setSearchProduct] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axiosInstance.get(`/product/get`);
        // console.log("the data" ,res.data);
        setProducts(res.data);
      }
      catch (err) {
        console.log(err);
      }
    }
    fetchProduct();
  }, []);



  // const handleSearchChange = (event)=>{
  //   setSearchProduct(event.target.value);
  // }

  // const handleSearch = (e) => {
  //   if (e.key === 'Enter' && searchProduct.trim()) {
  //     navigate(`/product?search=${searchProduct}`);
  //     // setSearchProduct("");
  //   }
  // };


  const fetchCart = async () => {
    if (!userId)
      return setCartItems([]);
    try {
      const res = await axiosInstance.get(`/cart/${userId}`);
      const validItems = res.data?.items?.filter(i => i.productId) || [];
      setCartItems(validItems);
    }
    catch (error) {
      console.log("Cart fetch error:", error);
      setCartItems([]);
    }
  };

  const fetchWishlist = async () => {
    if (!userId) return setWishlistItem([]);
    try {
      const res = await axiosInstance.get(`/wishlist/get/${userId}`);
      // console.log(res.data);
      const uniqueProductsMap = new Map();
      res.data.products.forEach(p => uniqueProductsMap.set(p._id, p));
      const uniqueProducts = Array.from(uniqueProductsMap.values());
      setWishlistItem(uniqueProducts);
    } catch (error) {
      if (error.response?.status === 404) {
        setWishlistItem([]);
      } else {
        console.error("Wishlist error", error);
      }
    }
  };

  useEffect(() => {
    if (!userId) {
      setCartItems([]);
      setWishlistItem([]);
      return;
    }
    fetchCart();
    fetchWishlist();
  }, [userId, refreshCart, refreshWishlist]);


  const filteredProducts = products
    .filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(0, 8);


  // const handleCategoryClick = (category) => {
  //   setSearchQuery(category);
  //   navigate(`/category/${category.toLowerCase()}`);
  // };

  return (
    <>
      {/* for large screen */}
      <div className='hidden md:hidden lg:grid items-center w-full  bg-orange-400  shadow-md '>
        <div className=' flex justify-evenly  items-center py-5 '>
          <img src={logo} alt="logo" className='w-12 '
            onClick={() => {
              setSearchQuery(''); navigate('/');
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }} />


          <div
            className=" flex"
            onMouseLeave={() => setShowSuggestions(false)}
          >
            <input
              type="text"
              placeholder="Search for products, brands and more"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => searchQuery && setShowSuggestions(true)}
              className="xl:w-[450px]  px-10 py-2 bg-gray-100 outline-none rounded-l"
            />
           <div className='bg-black text-white flex items-center justify-center p-3 rounded-r'>
            <IoMdSearch className="" size={18}/></div> 
            {showSuggestions && searchQuery && (
              <div className="absolute top-full left-0 w-full bg-white border shadow-lg rounded z-50 h-[250px] max-h-fit overflow-y-auto">
                {filteredProducts.length === 0 ? (
                  <p className="p-3 text-sm text-gray-500">No results found</p>
                ) : (
                  filteredProducts.map(item => (
                    <div
                      key={item._id}
                      className="flex gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        navigate(`/product-details/${item._id}`);
                        setShowSuggestions(false);
                      }}
                    >
                      <img
                        src={item.images?.[0] || item.imgUrl}
                        alt={item.title}
                        className="w-10 h-10 object-cover rounded"
                      />
                      <div>
                        <p className="text-sm font-medium">{item.name}</p>
                        <p className="text-xs text-gray-500">₹{item.price}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* {filterProducts.length === 0 && searchProduct && <p>No Product matching to serach .</p>} */}


          <div className='flex gap-8 xl:gap-10 items-center cursor-pointer'>
            <div className='relative flex flex-col items-center cursor-pointer hover:border-b-4
             hover:border-red-600 hover:pb-1 '
              onMouseEnter={() => setProfile(true)}
              onMouseLeave={() => setProfile(false)}>
              <IoPerson size={18} className=' cursor-pointer' />
              <p className='text-xs font-semibold'
              >Profile</p>
              {profile && (
                <Modal isOpen={profile}
                  onClose={() => setProfile(false)} />)}
            </div>

            <div className='relative flex flex-col items-center justify-center cursor-pointer'
              onClick={() => navigate(`/wishlist/${userId}`)}>
              {wishlistItem.length > 0 && (<div className='absolute
               bg-white h-3 w-3 p-2 flex items-center justify-center rounded-full text-black -top-1 right-0 text-xs'>{wishlistItem.length}</div>)}
              <FaHeart className='cursor-pointer' />
              <p className='text-xs font-semibold'>Wishlist</p></div>
            <div className='flex flex-col items-center justify-center cursor-pointer relative'
              onClick={() => navigate(`/cart/${userId}`)}>
              <FaShoppingBag size={18} className='  cursor-pointer' />
              {cartItems.length > 0 && (<div className='absolute bg-white h-3 w-3 p-2 flex items-center justify-center rounded-full text-black top-0 -right-2 text-xs'>{cartItems.length}</div>)}
              <p className='text-xs font-semibold'>Bag </p></div>
          </div>
        </div>

        <div className='relative z-40 w-full bg-white flex items-center justify-evenly'>

          <ul className=' flex  items-center  gap-10  text-gray-800 font-semibold text-sm '>


            <li
              onClick={() => setIsOpen(!isOpen)}
              className={`relative z-[120] border-x-2 px-3 cursor-pointer transition-colors duration-300 ${isOpen ? "bg-lime-500 text-white" : "bg-transparent text-black"}`}
            >
              <div className="flex items-center gap-8">


                <div className="flex items-center gap-3">
                  <GiHamburgerMenu size={18} />
                  <p className="cursor-pointer font-semibold text-lg pb-1 flex flex-">
                    ALL CATEGORIES
                  </p>
                </div>
                <IoIosArrowDown
                  size={22}
                  className={`transform transition-transform duration-500 ease-in-out
          ${isOpen ? "rotate-180" : "rotate-0"}
        `}
                />
              </div>

           {isOpen && (<Categories
                open={isOpen}
                onClose={() => setIsOpen(false)}
              />)}   
            </li>

            {isOpen && (
              <div
                className="fixed inset-0 bg-black/40 z-40"
                onClick={() => setIsOpen(false)}
              />
            )}

            <li
              onMouseEnter={() => setMenModal(true)}
              onMouseLeave={() => setMenModal(false)}
              className="relative"
            >
              <NavLink
                to="/category/men"
                className={({ isActive }) =>
                  `cursor-pointer font-semibold text-sm pb-1 ${isActive
                    ? "text-red-600 border-b-2 border-red-600"
                    : "text-black hover:text-red-500"
                  }`
                }
              >
                MEN
              </NavLink>

              <MenModal open={menModal}
                onClose={() => setMenModal(false)} />
            </li>


            <li
              onMouseEnter={() => setWomenModal(true)}
              onMouseLeave={() => setWomenModal(false)}
              className="relative"
            >
              <NavLink
                to="/category/women"
                className={({ isActive }) =>
                  `cursor-pointer font-semibold text-sm pb-1 ${isActive
                    ? "text-red-600 border-b-2 border-red-600"
                    : "text-black hover:text-red-500"
                  }`
                }
              >
                WOMEN
              </NavLink>

              <WomenModal open={womenModal}
                onClose={() => setWomenModal(false)}
              />
            </li>


            <li
              onMouseEnter={() => setKidModal(true)}
              onMouseLeave={() => setKidModal(false)}
              className="relative"
            >
              <NavLink
                to="/category/kids"
                className={({ isActive }) =>
                  `cursor-pointer font-semibold text-sm pb-1 ${isActive
                    ? "text-red-600 border-b-2 border-red-600"
                    : "text-black hover:text-red-500"
                  }`
                }
              >
                KIDS
              </NavLink>

              <KidsModal open={kidModal} onClose={() => setKidModal(false)} />
            </li>


            <li
              onMouseEnter={() => setBeautyModal(true)}
              onMouseLeave={() => setBeautyModal(false)}
              className="relative"
            >
              <NavLink
                to="/category/beauty"
                className={({ isActive }) =>
                  `cursor-pointer font-semibold text-sm pb-1 ${isActive
                    ? "text-red-600 border-b-2 border-red-600"
                    : "text-black hover:text-red-500"
                  }`
                }
              >
                BEAUTY
              </NavLink>

              <BeautyModals open={beautyModal} onClose={() => setBeautyModal(false)} />
            </li>

            <li
              // onMouseEnter={() => setIsOpen(true)}
              // onMouseLeave={() => setIsOpen(false)}
              className="relative"
            >
              <NavLink
                to="/category/trends"
                className={({ isActive }) =>
                  `cursor-pointer font-semibold text-sm pb-1 ${isActive
                    ? "text-red-600 border-b-2 border-red-600"
                    : "text-black hover:text-red-500"
                  }`
                }
              >
                TRENDS
              </NavLink>

              {/* <MenModal open={isOpen} onClose={() => setIsOpen(false)} /> */}
            </li>

          </ul>

<div className=' border-x'>
    <div className="relative overflow-hidden inline-block cursor-pointer group ">
            <span
              className="absolute inset-0 bg-black translate-x-full 
               group-hover:translate-x-0
               transition-transform duration-700 ease-in-out"
            ></span>

            {/* Text content */}
            <div className="relative z-10 px-4 py-2 text-black group-hover:text-white transition-colors duration-300">
              <p className="font-semibold">BLACK FRIDAY</p>
              <p className="text-sm">Get 45% off!</p>
            </div>
          </div>
</div>
        

        


        </div>
      </div>


      {/* for medium screen  */}
      <div className='block md:block lg:hidden px-6 py-4 shadow-lg bg-white sticky top-0 w-full z-50 space-y-2'>

        <div className='flex items-center justify-between md:justify-arround'>
          <div>
            <GiHamburgerMenu size={20} onClick={() => setOpenHam(true)} />
            <Sidebar open={openHam} onClose={() => setOpenHam(false)} />
          </div>
          <div className='relative'
            onMouseLeave={() => setShowSuggestions(false)}>
            <input type="text" placeholder='Search' value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(true)
              }}
              onFocus={() => searchQuery && setShowSuggestions(true)}
              className='border rounded-sm py-2 px-9 placeholder:px-2 w-[170px] md:w-[260px] outline-none' />
            <div>
              <img src={logo} alt="" className='w-6 absolute top-3 left-2'
                onClick={() => {
                  setSearchQuery('');
                  navigate('/');
                }}
              />
            </div>
            <IoMdSearch className='absolute top-3 left-36 md:left-56' color='gray' size={20} />

            {showSuggestions && searchQuery && (
              <div>
                <div className='absolute bg-white z-50 shadow-lg left-0 top-full w-full h-[150px] max-h-fit overflow-y-auto '>
                  {filteredProducts.length === 0 ? (
                    <p>There is no product </p>
                  ) : (
                    filteredProducts.map(item => (
                      <div key={item._id}
                        className="flex gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          navigate(`/product-details/${item._id}`);
                          setShowSuggestions(false);
                        }}>
                        <img
                          src={item.images?.[0]}
                          alt={item.title}
                          className="w-10 h-10 object-cover rounded"
                        />
                        <div>
                          <p className="text-sm font-medium">{item.name}</p>
                          <p className="text-xs text-gray-500">₹{item.price}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
          <div className='flex gap-5 md:gap-10 items-center'>
            {/* <IoIosNotifications className='' size={22} onClick={() => navigate('/notification')} /> */}
            <div className='relative flex items-center justify-center cursor-pointer'
              onClick={() => navigate(`/wishlist/${userId}`)}>
              {wishlistItem.length > 0 && (<div className='absolute bg-red-600 h-2 w-2 p-2 flex items-center justify-center rounded-full text-white -top-1 -right-2 text-xs'>{wishlistItem.length}</div>)}
              <FaHeart className='cursor-pointer' size={20} />
            </div>
            <div className='relative flex flex-col items-center cursor-pointer hover:border-b-4 hover:border-red-600 hover:pb-1 '
              onMouseEnter={() => setProfile(true)}
              onMouseLeave={() => setProfile(false)}>
              <IoPerson size={20} className=' cursor-pointer' />

              {profile && (
                <Modal isOpen={profile} onClose={() => setProfile(false)} />)}
            </div>
          </div>
        </div>
        {/* <div className='flex justify-center'>
          <ul className='flex gap-5  items-center text-gray-800 font-semibold text-sm justify-between '>
            <li className="relative">
              <NavLink
                to="/category/men"
                className={({ isActive }) =>
                  `cursor-pointer font-semibold text-sm pb-1 ${isActive
                    ? "text-red-600 border-b-2 border-red-600"
                    : "text-black hover:text-red-500"
                  }`
                }
              >
                MEN
              </NavLink>
            </li>

            <li className='relative' >
              <NavLink
                to="/category/women"
                className={({ isActive }) =>
                  `cursor-pointer font-semibold text-sm pb-1 ${isActive
                    ? "text-red-600 border-b-2 border-red-600"
                    : "text-black hover:text-red-500"
                  }`
                }
              >WOMEN
              </NavLink>
            </li>

            <li className='relative' >
              <NavLink to="/category/kids"
                className={({ isActive }) =>
                  `cursor-pointer font-semibold text-sm pb-1 ${isActive
                    ? "text-red-600 border-b-2 border-red-600"
                    : "text-black hover:text-red-500"
                  }`
                }>KIDS
              </NavLink>
            </li>

            <li className='relative'>
              <NavLink
                to="/category/beauty"
                className={({ isActive }) =>
                  `cursor-pointer font-semibold text-sm pb-1 ${isActive
                    ? "text-red-600 border-b-2 border-red-600"
                    : "text-black hover:text-red-500"
                  }`
                }
              > BEAUTY
              </NavLink>
            </li>

            <li className='relative'>
              <NavLink
                to="/category/trends"
                className={({ isActive }) =>
                  `cursor-pointer font-semibold text-sm pb-1 ${isActive
                    ? "text-red-600 border-b-2 border-red-600"
                    : "text-black hover:text-red-500"
                  }`
                }
              >TRENDS
              </NavLink>
            </li>
          </ul>
        </div> */}
      </div>
    </>
  )
}

export default Navbar




























































// import React,{useState} from 'react';
// import LoggedIn from '../../screens/auth/LoggedIn';
// import Registration from '../../screens/auth/Registration';
// // import { useNavigate } from 'react-router-dom';
// const Navbar = () => {
//     // const navigate = useNavigate();
//     const [loginModal , setLoginModal] =useState(false);
//     const [registerModal , setRegisterModal] =useState(false);
//     const [login, setLogin] = useState(false);
//     const [registers, setRegisters] = useState(false);
//     const handleOpenLoginModal = ()=>{
//         setRegisterModal(false);
//         setLoginModal(true);
//     }
//     const register=()=>{
//         setLoginModal(false);
//         setRegisterModal(true);
//     };
//     const handleLoginSucess = ()=>{
//         setLogin(true);
//     }
//     const handleRegisterSuccess = ()=>{
//         setRegisters(true);
//     }
//   return (
//     <div className='bg-slate-400 py-2 px-6 '>
//         <ul className='flex justify-between items-center text-white font-semibold  '>
//           {!login ? ( <li className='hover:text-teal-200 cursor-pointer 'onClick={handleOpenLoginModal}>Login</li>):(<p>You are Logged In !</p>)}
//           <LoggedIn isOpen={loginModal} onClose={()=>setLoginModal(false)} onLoginSuccess={handleLoginSucess} register={register}/>


//           {!registers ? (<li className='hover:text-teal-200 cursor-pointer ' onClick={register}>Register</li>):(<p>Registeration Successful !</p>)}
//           <Registration isOpen={registerModal} onClose={()=>setRegisterModal(false)}  login={handleOpenLoginModal} register={handleRegisterSuccess}/>
//         </ul>
//     </div>
//   )
// }

// export default Navbar