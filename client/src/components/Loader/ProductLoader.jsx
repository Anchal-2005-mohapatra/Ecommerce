import React from 'react'

const ProductLoader = () => {
    return (
        <div className='animate-pulse border rounded-lg p-3 space-y-3'>

            <div className='w-full bg-no-repeat bg-cover bg-center h-[300px] rounded-lg bg-gray-300'>
            </div>

            <div className='bg-gray-300 h-10 w-1/2'></div>

            <div className='flex-1 space-y-1'>
                <div className='bg-gray-300  h-4 w-full'>
                </div>
                <div className='bg-gray-300 h-4 w-full'></div>
                <div className='bg-gray-300 h-4 w-full'>
                </div>
            </div>

            <div className='w-1/2 h-5 bg-gray-300'> </div>

           <div className='flex items-center justify-center w-full'>
            <div className='h-10 w-full rounded-lg bg-gray-300'></div>
           </div> 
        </div>
    )
}

export default ProductLoader