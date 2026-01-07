import React, { useState } from 'react';
import men from "../../Assets/hero/men.jpg";

const Men = () => {
    
    return (
        <div>
            <img src={men} alt="" className='h-[300px] lg:h-[660px] w-full bg-cover object-center bg-center ' />
        </div>
    )
}

export default Men