import React from 'react'
import Product from "../../components/home/Product";
import HeroSection from "../../components/home/HeroSection";
// import AddProduct from '../../components/home/AddProduct';

const Home = () => {
  return (
    <div className="min-h-screen ">
      
        <HeroSection/>
        {/* <AddProduct/> */}
        <Product/>
    </div>
  )
}

export default Home