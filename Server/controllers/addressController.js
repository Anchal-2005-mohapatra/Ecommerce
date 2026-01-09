const Address = require("../models/addressModel");
const mongoose = require("mongoose");

exports.addAddress = async (req, res) => {
    try {
        const {
            userId, name, phone, state, city, pincode, address, landmark, alternativePhone,
        } = req.body;

        if (
            !userId || !name || !phone || !state || !city || !pincode || !address
        ) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid userId" });
        }

        const newAddress = new Address({
            userId,
            name,
            phone,
            state,
            city,
            pincode,
            address,
            landmark,
            alternativePhone,
        });

        await newAddress.save();
        res.status(201).json(newAddress);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAddressesByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    const addresses = await Address.find({ userId }).sort({ createdAt: -1 });

    return res.status(200).json(addresses);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.deleteAddress = async (req, res) => {
  try {
    const { addressId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(addressId)) {
      return res.status(400).json({ message: "Invalid addressId" });
    }

    const deleted = await Address.findByIdAndDelete(addressId);

    if (!deleted) {
      return res.status(404).json({ message: "Address not found" });
    }

    return res.status(200).json({
      message: "Address deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// PUT /address/:addressId
exports.updateAddress = async (req, res) => {
  try {
    const { addressId } = req.params;
    const {
      userId,
      name,
      phone,
      state,
      city,
      pincode,
      address,
      landmark,
      alternativePhone,
    } = req.body;

    if (!mongoose.Types.ObjectId.isValid(addressId)) {
      return res.status(400).json({ message: "Invalid addressId" });
    }

    const updatedAddress = await Address.findByIdAndUpdate(
      addressId,
      {
        userId,
        name,
        phone,
        state,
        city,
        pincode,
        address,
        landmark,
        alternativePhone,
      },
      { new: true } // return the updated document
    );

    if (!updatedAddress) {
      return res.status(404).json({ message: "Address not found" });
    }

    return res.status(200).json(updatedAddress);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
