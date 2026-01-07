import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../../api/axiosConfig";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { MdOutlineDeleteOutline } from "react-icons/md";


const AddressStep = ({ onNext, selectedAddress }) => {
  const { user } = useAuth();
  const userId = user?._id;
  // console.log(userId);
  const [addresses, setAddresses] = useState([]);
  const [activeAddress, setActiveAddress] = useState(null);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    state: "",
    city: "",
    pincode: "",
    address: "",
    landmark: "",
    alternativePhone: "",
  });

  useEffect(() => {
    if (!userId) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }
    fetchAddresses();
  }, [userId]);

  const fetchAddresses = async () => {
    try {
      const res = await axiosInstance.get(`/address/${userId}`);
      setAddresses(res.data);
      //  if (res.data.length && !selectedAddress) {
      //       setSelectedAddress(res.data[0]);
      //     }
    } catch {
      toast.error("Failed to fetch addresses");
    }
  };


  const handleSelectAddress = (address) => {
    setActiveAddress(address);

    // Autofill form
    setForm({
      name: address.name,
      phone: address.phone,
      state: address.state,
      city: address.city,
      pincode: address.pincode,
      address: address.address,
      landmark: address.landmark || "",
      alternativePhone: address.alternativePhone || "",
    });
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });


  const normalize = (str) => str?.trim().toLowerCase() || "";

  const isAddressExisting = (addr) => {
    return addresses.some(a =>
      normalize(a.name) === normalize(addr.name) &&
      normalize(a.phone) === normalize(addr.phone) &&
      normalize(a.state) === normalize(addr.state) &&
      normalize(a.city) === normalize(addr.city) &&
      normalize(a.pincode) === normalize(addr.pincode) &&
      normalize(a.address) === normalize(addr.address) &&
      normalize(a.landmark) === normalize(addr.landmark) &&
      normalize(a.alternativePhone) === normalize(addr.alternativePhone)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId)
      toast.error("The user was not found");

    if (!form.name || !form.phone || !form.state || !form.city || !form.pincode || !form.address) {
      toast.error("Please fill all required fields");
      return;
    }

    if (isAddressExisting(form)) {
      toast.error("This address already exists");
      return;
    }
    try {
      const address = await axiosInstance.post(`/address/add`, { userId, ...form });
      const newAddress = address.data;
      setAddresses(prev => [newAddress, ...prev]);
      setActiveAddress(newAddress);

      toast.success("The Address is added Successfully");


      setForm({
        name: "",
        phone: "",
        state: "",
        city: "",
        pincode: "",
        address: "",
        landmark: "",
        alternativePhone: "",
      });

      // fetchAddresses();
    }
    catch (err) {
      toast.error("Failed to add the address");
    }
  }


  const handleContinue = async () => {
    if (
      form.name &&
      form.phone &&
      form.state &&
      form.city &&
      form.pincode &&
      form.address &&
      !addresses.find(a =>
        a.name === form.name &&
        a.phone === form.phone &&
        a.address === form.address
      )
    ) {
      try {
        const res = await axiosInstance.post(`/address/add`, { userId, ...form });
        const newAddress = res.data;
        setAddresses(prev => [newAddress, ...prev]);
        setActiveAddress(newAddress);
        toast.success("Address added successfully");

        setForm({
          name: "",
          phone: "",
          state: "",
          city: "",
          pincode: "",
          address: "",
          landmark: "",
          alternativePhone: "",
        });

        onNext(newAddress); 
        return;
      } catch (err) {
        toast.error("Failed to save address");
        return;
      }
    }

    if (activeAddress) {
      onNext(activeAddress);
    } else {
      toast.error("Please select or add an address");
    }
  };

  const handleDelete = async (addressId) => {
    console.log("the address id ", addressId)
    try {
      axiosInstance.delete(`/address/${addressId}`);
      setAddresses(prev => prev.filter(a => a._id !== addressId));

      if (activeAddress?._id === addressId) {
        setActiveAddress(null);
      }

      toast.success("Address deleted successfully");
      fetchAddresses();
    }
    catch (err) {
      toast.error("failed to delete the address");
    }
  }

  useEffect(() => {
    if (selectedAddress) {
      setForm(selectedAddress);
      setActiveAddress(selectedAddress);
    }
  }, [selectedAddress])

  return (
    <div className="bg-white shadow p-6 rounded">
      <h2 className="text-lg font-semibold mb-4">Delivery Address</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 gap-4">
          <input type="text" name="name" value={form.name} placeholder="Name" onChange={handleChange} className="border p-2 placeholder:text-sm " />
          <input type='tel' name="phone" value={form.phone} maxLength={10} pattern="[0-9]{10}" placeholder="Phone" onChange={handleChange} className="border p-2 placeholder:text-sm " />
          <select name="state" value={form.state} onChange={handleChange} id="state" className="border p-2 ">
            <option value="">-- Select a State -- </option>
            <option value="Odisha">Odisha</option>
            <option value="Chhattisgarh">Chhattisgarh</option>
            <option value="West_Bengal">West Bengal</option>
            <option value="Telengana">Telengana</option>
            <option value="Jharkhand">Jharkhand</option>
            <option value="Amdhra-Pradesh">Andhra Pradesh</option>
            <option value="MP">Madhya Pradesh</option>
            <option value="Rajasthan">Rajasthan</option>
          </select>
          <input type="text" value={form.city} name="city" placeholder="City/Town/District" onChange={handleChange} className="border p-2 placeholder:text-sm " />
          <input type="text" value={form.pincode} name="pincode" maxLength={6} inputMode="numeric" pattern="[0-9]*" placeholder="Pincode" onChange={handleChange} className="border p-2 placeholder:text-sm " />
        </div>

        <textarea
          name="address"
          value={form.address} placeholder="Full Address"
          onChange={handleChange}
          className="border placeholder:text-sm p-2 w-full mt-4"
        />

        <div className="grid md:grid-cols-2 gap-4">
          <input type="text" value={form.landmark} name="landmark" placeholder="Landmark(Opational)" onChange={handleChange} className="border p-2 placeholder:text-sm " />
          <input type="tel" value={form.alternativePhone} name="alternativePhone" maxLength={10} pattern="[0-9]{10}" placeholder="Aleternative Phone(Opational)" onChange={handleChange} className="border p-2 placeholder:text-sm " />
        </div>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 my-3 rounded" >
          Save Address
        </button>
      </form>
      <div >

        {addresses.map((address) => (
          <div className="flex flex-wrap items-center justify-between gap-3" key={address._id}
            onClick={() => setActiveAddress(address)}
            style={{ border: activeAddress === address ? "2px solid orange" : "1px solid gray", padding: "10px", borderRadius: "5px", marginTop: "10px", cursor: "pointer" }}>
            <div className="flex gap-3">
              <div className="">
                <input type="radio" name="selectedAddress" checked={activeAddress?._id === address._id}
                  onChange={() => handleSelectAddress(address)}
                  onClick={(e) => e.stopPropagation()} /></div>
              <div className="max-w-[350px]">
                {address.name}, {address.phone}. {address.address}, {address.landmark && `${address.landmark}, `} {address.city}, {address.state} - {address.pincode}
              </div>
            </div>
            <MdOutlineDeleteOutline className="text-xl text-red-500 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(address._id);
              }}
            />
          </div>
        ))}
      </div>
      <button
        onClick={handleContinue}
        className="bg-orange-500 text-white px-6 py-3 mt-4 rounded"
      >
        Continue to Payment
      </button>

    </div>
  );
};

export default AddressStep;
