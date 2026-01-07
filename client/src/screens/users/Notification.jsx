import React from 'react';
import empty from "../../Assets/Images/emptyNotifications.png";

const Notification = () => {
    return (
        <>
            <div className='flex justify-center items-center min-h-screen'>
                <div className='flex flex-col items-center justify-center p-4 h-[400px] w-[70%] bg-white '>
                    <div className='flex items-center justify-center  py-5'>
                        <img src={empty} alt="" className='bg-cover bg-center object-cover' />
                    </div>
                    <div className='space-y-3 flex items-center flex-col '>
                        <p className='text-black text-xl font-medium'>All caught up!</p>
                        <p>There is no notifications for you.</p>
                    </div>

                </div>
            </div>
        </>

    )
}

export default Notification