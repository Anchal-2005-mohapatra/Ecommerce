import React from 'react';


const Furniture = ({isOpen,onClose}) => {
    if(!isOpen)
        return null;
  return (
    <div>Furniture</div>
  )
}

export default Furniture