import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../../api/axiosConfig";
import { MdOutlineDeleteOutline } from "react-icons/md";

const AddressStep = ({ onNext, selectedAddress }) => {
  const { user } = useAuth();
  const userId = user?._id;
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);
  const [activeAddress, setActiveAddress] = useState(null);
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

  // Fetch addresses on mount
  useEffect(() => {
    if (!userId) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }
    fetchAddresses();
  }, [userId]);

  // Autofill if selectedAddress comes from checkout
  useEffect(() => {
    if (selectedAddress) {
      setActiveAddress(selectedAddress);
      setForm(selectedAddress);
    }
  }, [selectedAddress]);

  // Fetch user addresses
  const fetchAddresses = async () => {
    try {
      const res = await axiosInstance.get(`/address/${userId}`);
      setAddresses(res.data);
    } catch {
      toast.error("Failed to fetch addresses");
    }
  };

  // Select address
  const handleSelectAddress = (address) => {
    setActiveAddress(address);
    setForm(address);
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Check required fields
  const isFormValid = () =>
    form.name && form.phone && form.state && form.city && form.pincode && form.address;

  // Add or update address
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      let savedAddress;

      if (activeAddress?._id) {
        // Update existing address
        const res = await axiosInstance.put(`/address/${activeAddress._id}`, { userId, ...form });
        savedAddress = res.data;

        setAddresses((prev) =>
          prev.map((a) => (a._id === savedAddress._id ? savedAddress : a))
        );
        toast.success("Address updated successfully");
      } else {
        // Add new address
        const res = await axiosInstance.post(`/address/add`, { userId, ...form });
        savedAddress = res.data;

        setAddresses((prev) => [savedAddress, ...prev]);
        toast.success("Address added successfully");
      }

      setActiveAddress(savedAddress);

      // Clear form if it was a new address
      if (!activeAddress?._id) {
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
      }
    } catch {
      toast.error("Failed to save address");
    }
  };

  // Continue to Payment
  const handleContinue = () => {
    if (!activeAddress) {
      toast.error("Please select or add an address");
      return;
    }
    onNext(activeAddress);
  };

  // Delete address
  const handleDelete = async (addressId) => {
    try {
      await axiosInstance.delete(`/address/${addressId}`);
      setAddresses((prev) => prev.filter((a) => a._id !== addressId));
      if (activeAddress?._id === addressId) setActiveAddress(null);
      toast.success("Address deleted successfully");
    } catch {
      toast.error("Failed to delete address");
    }
  };

  return (
    <div className="bg-white shadow p-6 rounded">
      <h2 className="text-lg font-semibold mb-4">Delivery Address</h2>

      {/* Address Form */}
      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={form.name}
            placeholder="Name"
            onChange={handleChange}
            className="border p-2 placeholder:text-sm"
          />
          <input
            type="tel"
            name="phone"
            value={form.phone}
            maxLength={10}
            pattern="[0-9]{10}"
            placeholder="Phone"
            onChange={handleChange}
            className="border p-2 placeholder:text-sm"
          />
          <select
            name="state"
            value={form.state}
            onChange={handleChange}
            className="border p-2"
          >
            <option value="">-- Select a State --</option>
            <option value="Odisha">Odisha</option>
            <option value="Chhattisgarh">Chhattisgarh</option>
            <option value="West_Bengal">West Bengal</option>
            <option value="Telengana">Telengana</option>
            <option value="Jharkhand">Jharkhand</option>
            <option value="Amdhra-Pradesh">Andhra Pradesh</option>
            <option value="MP">Madhya Pradesh</option>
            <option value="Rajasthan">Rajasthan</option>
          </select>
          <input
            type="text"
            name="city"
            value={form.city}
            placeholder="City/Town/District"
            onChange={handleChange}
            className="border p-2 placeholder:text-sm"
          />
          <input
            type="text"
            name="pincode"
            value={form.pincode}
            maxLength={6}
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="Pincode"
            onChange={handleChange}
            className="border p-2 placeholder:text-sm"
          />
        </div>

        <textarea
          name="address"
          value={form.address}
          placeholder="Full Address"
          onChange={handleChange}
          className="border p-2 w-full mt-4 placeholder:text-sm"
        />

        <div className="grid md:grid-cols-2 gap-4 mt-2">
          <input
            type="text"
            name="landmark"
            value={form.landmark}
            placeholder="Landmark (Optional)"
            onChange={handleChange}
            className="border p-2 placeholder:text-sm"
          />
          <input
            type="tel"
            name="alternativePhone"
            value={form.alternativePhone}
            maxLength={10}
            pattern="[0-9]{10}"
            placeholder="Alternative Phone (Optional)"
            onChange={handleChange}
            className="border p-2 placeholder:text-sm"
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 my-3 rounded"
        >
          {activeAddress?._id ? "Update Address" : "Save Address"}
        </button>
      </form>

      {/* Saved Addresses */}
      <div>
        {addresses.map((address) => (
          <div
            key={address._id}
            onClick={() => handleSelectAddress(address)}
            style={{
              border: activeAddress?._id === address._id ? "2px solid orange" : "1px solid gray",
              padding: "10px",
              borderRadius: "5px",
              marginTop: "10px",
              cursor: "pointer",
            }}
            className="flex justify-between items-center"
          >
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="selectedAddress"
                checked={activeAddress?._id === address._id}
                onChange={() => handleSelectAddress(address)}
                onClick={(e) => e.stopPropagation()}
              />
              <div className="max-w-[350px] text-sm">
                {address.name}, {address.phone}, {address.address}
                {address.landmark && `, ${address.landmark}`}, {address.city}, {address.state} - {address.pincode}
              </div>
            </div>
            <MdOutlineDeleteOutline
              className="text-red-500 text-xl cursor-pointer"
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
        className="bg-orange-500 text-white px-6 py-3 mt-4 rounded w-full"
      >
        Continue to Payment
      </button>
    </div>
  );
};

export default AddressStep;
