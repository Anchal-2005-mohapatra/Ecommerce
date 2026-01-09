const express = require("express");
const router = express.Router();
const { addAddress, getAddressesByUser, deleteAddress, updateAddress } = require("../controllers/addressController");

router.post("/add", addAddress);
router.get('/:userId', getAddressesByUser);
router.delete('/:addressId', deleteAddress);
router.put('/:addressId', updateAddress)

module.exports = router;
