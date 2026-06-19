const User = require('../models/User');

exports.addUser = async (req, res) => {
    try {
        // لو المالك مدخلش باسوورد للموظف الجديد، السيستم هيعمله باسوورد افتراضي 123456
        const userData = { 
            ...req.body, 
            password: req.body.password || '123456' 
        };
        const newUser = new User(userData);
        await newUser.save();
        res.status(201).json({ message: "Member added successfully", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Error adding member", error: error.message });
    }
};

exports.getUsers = async (req, res) => {
    try {
        // بنجيب كل الموظفين ونرتبهم من الأحدث للأقدم، وبنخفي المالك (owner) عشان ميظهرش في جدول الموظفين
        const users = await User.find({ role: { $ne: 'owner' } }).sort({ createdAt: -1 });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching members" });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ message: "Member updated", user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Error updating member" });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Member deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting member" });
    }
};