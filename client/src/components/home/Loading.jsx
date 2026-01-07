import React, { useState, useEffect } from 'react';
import './spinner.css';

const Loading = () => {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false)
        }, 660)
    }, [])
    return (
        <>

            {loading ? 
               ( <div className='loader '>
                    <h1 className='spin'></h1>
                </div>):null
             }</>

    )
}

export default Loading