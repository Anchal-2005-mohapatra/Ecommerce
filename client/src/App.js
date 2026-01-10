import React from 'react';
import Home from './screens/users/Home';
import LoggedIn from './screens/nonAuth/LoggedIn';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Registration from './screens/nonAuth/Registation';
import Dashboard from './screens/auth/Dashboard';
import Profile from './screens/auth/Profile';
import { Toaster } from 'react-hot-toast';
import Wishlist from './screens/users/Wishlist';
import Cart from './screens/users/Cart';
import Product from './components/home/Product';
import ForgetPassword from './screens/nonAuth/ForgetPassword';
import AddProduct from './components/home/AddProduct';
import ProductDetails from './screens/users/ProductDetails';
import FooterWrapper from './components/common/FooterWrapper';
import EditProfile from './components/EditProfile/EditProfile';
// import Notification from './screens/users/Notification';
// import Men from './screens/users/Men';
// import Women from './screens/users/Women';
// import Kids from './screens/users/Kids';
// import Trends from './screens/users/Trends';
// import Beauty from "./screens/users/Beauty";
import ContactUs from './screens/users/ContactUs';
import Orders from './screens/users/Orders';
import BuyNow from './components/BuyNow/BuyNow';
import Checkout from './components/BuyNow/Checkout';
import CategoryPage from './components/Pages/CategoryPage';
import PageNotFound from './components/common/PageNotFound';
const App = () => {


  return (
    <div className='bg-gray-100'>
      <BrowserRouter>
        <Navbar />
        <Toaster position="top-center" reverseOrder={false} />
        <Routes >
          <Route path='/' element={<Home />}></Route>
          <Route path='/login' element={<LoggedIn />}></Route>
          <Route path='/register' element={<Registration />}></Route>
          <Route path='/dashboard' element={<Dashboard />}></Route>
          <Route path='/profile' element={<Profile />}></Route>
          <Route path="/wishlist/:userId" element={<Wishlist />}></Route>
          <Route path='/cart/:userId' element={<Cart />}></Route>
          <Route path='/product' element={<Product />} />
          <Route path='/product-details/:id' element={<ProductDetails />} />
          <Route path='/add-product' element={<AddProduct />} />
          <Route path='/forget-password' element={<ForgetPassword />}></Route>
          <Route path='/edit-profile/:userId' element={<EditProfile />} />
          {/* <Route path='/notification' element={<Notification/>}/> */}
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path='/contact-us' element={<ContactUs />} />
          <Route path='/order' element={<Orders />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path='/buy' element={<BuyNow />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
        <FooterWrapper />
      </BrowserRouter>
    </div>
  )
}
export default App