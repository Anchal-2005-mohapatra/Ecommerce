const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" })
}

exports.userRegister = async (req, res) => {
    try {
        const { name, email, password, role, sellerStatus } = req.body;
        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const saltRounds = 10;
        const hashingPassword = await bcrypt.hash(password, saltRounds);
        const existmail = await User.findOne({ email });
        if (existmail) {
            return res.status(400).json({ message: "email already exists" })
        }
        const user = new User({ name, email, password: hashingPassword, role, sellerStatus });
        await user.save();
        const token = generateToken(user._id);
        res.status(200).json({ message: "user Registerd successfully", user, token });
    }
    catch (err) {
        return res.status(404).json({ error: err.message })
    }
};
exports.getuser = async (req, res) => {
    try {
        const user = await User.find();
        res.json(user);
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
};
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json({
            message: "your data was succesfully fetch",
            data: user
        });

    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
};

exports.userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "The email and password was required" });
        }
        const user = await User.findOne({ email});
        if (!user) return res.status(404).json({ message: "user not found or deactivated" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ message: "the password is wrong!" })
        if (!user.isActive) {
            user.isActive = true;
            await user.save();
        }
        const token = generateToken(user._id);
        return res.status(200).json({ message: "login is sucessfull", user, token })
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deactivateUser = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id, {
            isActive: false
        });

        res.status(200).json({
            message: "Account deactivated successfully"
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Account deleted permanently"
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.userEdit = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json({
            message: "the profile is updated",
            data: user
        });
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
};

exports.updateSellerStatus = async (req, res) => {
    try {
        const seller = await User.findByIdAndUpdate(req.params.id, {
            sellerStatus: req.body.sellerStatus
        }, { new: true });

        res.status(200).json({
            message: "ok",
            data: seller
        })



    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
};
exports.resetpassword = async (req, res) => {
    try {
        const { email, oldPassword, newPassword, confirmPassword } = req.body;
        if (!email || !oldPassword || !newPassword || !confirmPassword) {
            return res.status(400).json({ message: "all field are required" });
        }
        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: "new password and confirm password do not match" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }
        const match = await bcrypt.compare(oldPassword, user.password);
        if (!match)
            return res.status(400).json({ message: "Old password is incorrect!" });
        const isSameAsOld = await bcrypt.compare(newPassword, user.password);
        if (!isSameAsOld) {
            return res.status(400).json({ message: "New Password cannot be same as old password" })
        }

        const hashedNew = await bcrypt.hash(newPassword, 10);
        user.password = hashedNew;
        await user.save();
        res.json({ message: "password updated sucessfully" });
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}