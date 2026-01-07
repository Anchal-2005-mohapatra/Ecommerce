const express = require("express");
const router = express.Router();
 
const {userRegister, userLogin,deactivateUser, deleteUser, userEdit, updateSellerStatus, getuser,getUserById, resetpassword} = require("../controllers/userController");
router.post("/register", userRegister);
router.post("/login", userLogin);

router.get('/get', getuser);;
router.get('/get/:id',getUserById);

router.put('/update/:id', userEdit,);
router.put('/sellers-update/:id',updateSellerStatus);
router.post('/reset', resetpassword);

router.put('/deactivate/:id', deactivateUser);
router.delete('/delete/:id', deleteUser);

module.exports = router;