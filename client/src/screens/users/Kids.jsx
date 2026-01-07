import React from 'react';
import kid from "../../Assets/hero/kid.jpg"

const Kids = () => {
  return (
    <div>
        <img src={kid} alt="" className='h-[300px] lg:h-[660px] w-full object-center bg-center bg-cover' />
    </div>
  )
}

export default Kids