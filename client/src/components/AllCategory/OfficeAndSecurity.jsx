import React from 'react';
import ph from "../../Assets/Security/ph.png";
import camera from "../../Assets/Security/camera.png";
import usb from "../../Assets/Security/usb.png";
import smart from "../../Assets/Security/smart.png";


const OfficeAndSecurity = ({ open }) => {
    const securityItems = [
        {
            id: 1, img: ph, name: "ELECTRONICS", details: [

                { id: 1, title: "Easy to Customise" },
                { id: 2, title: "Simple and istutive" },
                { id: 3, title: "Highly customisable" },
                { id: 4, title: "Coding skills" },
                { id: 5, title: "Easy to Customise" }

            ],
        },
        {
            id: 2, img: camera, name: "SECURITY TOOLS", details: [
                { id: 1, title: "Benches & Ottomans" },
                { id: 2, title: "Dining Tables" },
                { id: 3, title: "Coffee & Cocktail Tables" },
                { id: 4, title: "Consoles & Desks" },
                { id: 5, title: "Cocktail Tables" }

            ],
        },
        {
            id: 3, img: usb, name: "BRANDED GADGETS", details: [
                { id: 1, title: "Side Tables" },
                { id: 2, title: "Beside Tables" },
                { id: 3, title: "Sideboards & Drawers" },
                { id: 4, title: "Lounge Chairs" },
                { id: 5, title: "Consoles & Desks" }
            ],
        },
        {
            id: 4, img: smart, name: "SMARTWATCH", details: [
                {
                    id: 1, title: "Easy to Customise"
                },
                { id: 2, title: "Simple and istutive" },
                { id: 3, title: "Highly customisable" },
                { id: 4, title: "Coding skills" },
                {
                    id: 5, title: "Easy to Customise"
                }
            ],
        },

    ]
    return (
        <div
            className={`absolute top-0 left-full bg-white w-[900px] h-[340px] shadow-xl p-6
      grid grid-cols-4 gap-6  z-50
      transform transition-all duration-500 ease-in-out
      ${open ? "translate-x-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"}`}
        >
            {securityItems.map((items) =>
            (
                <div className='flex flex-col gap-2 p-4 items-center border-r' key={items.id}>
                    <img src={items.img} alt="" className='h-[100px] w-[100px] object-contain ' />
                    <p className='text-black'>{items.name}</p>

                    <p className=' '>{items.details.map((item) =>(
                        <div className='' key={item.id}>
                            <p className='text-sm text-gray-500'>{item.title}</p>
                        </div>
                    ))}</p>

                </div>
            ))}
        </div>

    )
}

export default OfficeAndSecurity