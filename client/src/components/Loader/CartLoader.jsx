import React from 'react'

const CartLoader = () => {
    return (
        <div className='animate-pulse border rounded-lg p-3 space-y-2 grid md:flex gap-4'>

            <div className='md:w-[70%]'>
                <div className='grid md:grid-cols-2 w-full gap-4'>
                    <div className='grid gap-2 items-center'>
                        <div className='h-[150px] w-[150px]  rounded-lg bg-gray-300'>
                        </div>
                        <div className='flex items-center gap-3 space-y-2'>
                            <div className='h-10 w-10 rounded-full border bg-gray-300 p-2'></div>
                            <div className='h-10 w-16 border bg-gray-300 p-2'></div>
                            <div className='h-10 w-10 rounded-full border bg-gray-300 p-2'></div>
                        </div>
                    </div>

                    <div className='flex flex-col gap-3 w-full  '>
                        <div className='h-10 w-full bg-gray-300 p-2'></div>
                        <div className='bg-gray-300 h-5 w-1/2'></div>
                    </div>
                </div>
                <div className='md:flex py-2 flex-end justify-end'>
                    <div className='bg-gray-300 p-4 h-10 w-1/4'></div>
                </div>
            </div>


            <div className='p-6 md:w-[30%] space-y-2'>
                <div className='bg-gray-300 h-5 w-full'></div>
             
                <div className='flex justify-between'>
                    <div className='bg-gray-300 h-4 w-1/3'></div>
                    <div className='bg-gray-300 h-4 w-3'></div>
                </div>
                  <div className='flex justify-between'>
                    <div className='bg-gray-300 h-4 w-1/3'></div>
                    <div className='bg-gray-300 h-4 w-3'></div>
                </div>
                   <div className='flex justify-between'>
                    <div className='bg-gray-300 h-4 w-1/3'></div>
                    <div className='bg-gray-300 h-4 w-3'></div>
                </div>
                 <div className='flex justify-between'>
                    <div className='bg-gray-300 h-4 w-1/3'></div>
                    <div className='bg-gray-300 h-4 w-3'></div>
                </div>

            </div>

        </div>
    )
}

export default CartLoader