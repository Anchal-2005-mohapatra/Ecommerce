const express = require("express");
const router = express.Router();
const { addAddress, getAddressesByUser, deleteAddress } = require("../controllers/addressController");

router.post("/add", addAddress);
router.get('/:userId', getAddressesByUser);
router.delete('/:addressId', deleteAddress)

module.exports = router;
