import React from "react";
import f1 from "../../Assets/Furniture/f1.jpg";
import f2 from "../../Assets/Furniture/f2.jpg";
import f3 from "../../Assets/Furniture/f3.jpg";
import f4 from "../../Assets/Furniture/f4.jpg";
import f5 from "../../Assets/Furniture/f5.jpg";
import f6 from "../../Assets/Furniture/f1.jpg";

const Furniture = ({ isOpen }) => {

  const furnitureItems = [
    { title: "World Class Sofa", img: f1 },
    { title: "Wireless Speaker", img: f2 },
    { title: "Table Lamp", img: f3 },
    { title: "Laptop Bags", img: f4 },
    { title: "Dining Table", img: f5 },
    { title: "Luxury Sofa", img: f6 },
  ];

  return (
    <div
                className={`absolute top-0 left-full bg-white w-[900px] h-[420px] shadow-xl p-6
      grid grid-cols-3 gap-6  z-50
      transform transition-all duration-500 ease-in-out
      ${isOpen ? "translate-x-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"}`}
            >     
      {furnitureItems.map((item) => (
        <div
          key={item.title}
          className="flex flex-col items-center cursor-pointer"
        >
          <div className="h-[120px] w-full flex items-center justify-center">
            <img
              src={item.img}
              alt={item.title}
              className="h-full object-contain"
            />
          </div>

          <p className="text-blue-500 text-sm mt-2 hover:underline">
            {item.title}
          </p>
        </div>
      ))}
    </div>

  );
};

export default Furniture;
