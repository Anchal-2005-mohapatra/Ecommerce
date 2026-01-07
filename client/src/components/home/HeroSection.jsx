import React from 'react';
import bg from "../../Assets/hero/bg.webp";
import bg1 from "../../Assets/hero/bg1.jpg";
import bg2 from "../../Assets/hero/bg2.jpg";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const HeroSection = () => {
  return (
    <div className="relative w-full">
      
      
      <button className="custom-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 h-12 w-12
        bg-white/80 hover:bg-black  text-black hover:text-white p-3 rounded-full transition flex items-center justify-center">
        <FaChevronLeft size={20} />
      </button>

      <button className="custom-next h-12 w-12 flex items-center justify-center absolute right-4 top-1/2 -translate-y-1/2 z-10 
        bg-white/80 hover:bg-black text-black hover:text-white p-3 rounded-full transition">
        <FaChevronRight size={20} />
      </button>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
        navigation={{
          nextEl: '.custom-next',
          prevEl: '.custom-prev',
        }}
        className="h-[300px] md:h-[450px] lg:h-[660px]"
      >
        {[bg, bg1, bg2].map((image, index) => (
          <SwiperSlide key={index} className="h-full">
            <div
              className="h-full w-full bg-center object-center bg-cover bg-no-repeat"
              style={{ backgroundImage: `url(${image})` }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSection;
