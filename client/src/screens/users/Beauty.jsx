import React from 'react'
import beauty from "../../Assets/hero/beauty.jpg";

const Beauty = () => {
  return (
    <div>
        <div>
            <img src={beauty} alt="" className='h-[300px] lg:h-[660px] w-full object-center bg-center bg-cover'/>
        </div>
    </div>
  )
}

export default Beauty