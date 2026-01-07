import React, { useState } from 'react';
import axiosInstance from '../../api/axiosConfig';
import toast from 'react-hot-toast';

const AddProduct = () => {
    const [image, setImage] = useState(null);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");

    const sellerId = localStorage.getItem('userId');
    const uploadToCloudinary = async (file) => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "Newperset");
        data.append("cloud_name", "dx5g8psvf");

        const res = await fetch(
            `https://api.cloudinary.com/v1_1/dx5g8psvf/image/upload`,
            {
                method: "POST",
                body: data
            }
        );

        const result = await res.json();
        return result.secure_url;
    };

    const submitProduct = async (e) => {
        e.preventDefault();

        try {
            if(!image){
              return toast.error("Please upload an image");
            }

         
           const imgUrl = await uploadToCloudinary(image);
          
            const res = await axiosInstance.post("/product/create", {
                name,
                price,
                description,
                image: imgUrl,   
                seller: sellerId 
            });

            toast.success("Product created!");
            console.log(res.data);

        } catch (err) {
            console.log(err);
            toast.error("Upload failed!");
        }
    };

    return (
        <form onSubmit={submitProduct} className="p-6 space-y-3">
            <input
                type="text"
                placeholder="Product Name"
                onChange={(e) => setName(e.target.value)}
                className="border p-2 w-full"
            />

            <input
                type="number"
                placeholder="Price"
                onChange={(e) => setPrice(e.target.value)}
                className="border p-2 w-full"
            />

            <textarea
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
                className="border p-2 w-full"
            />

            <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                className="border p-2 w-full"
            />

            <button className="bg-blue-600 text-white px-4 py-2 rounded">
                Add Product
            </button>
        </form>
    );
};

export default AddProduct;
