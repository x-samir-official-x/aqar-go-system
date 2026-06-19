const User = require('../models/User');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // البحث باستخدام الإيميل (التنظيف لضمان الدقة)
        const user = await User.findOne({ email: email.trim().toLowerCase() });

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // مقارنة الباسورد (لو لسه مشفر أو لا، ده شغال)
        if (user.password !== password) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        return res.json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

// ==========================================
// دالة التسجيل الجديدة (عشان نكريت الحسابات)
// ==========================================
exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // التأكد إن الإيميل مش موجود قبل كده
        const existingUser = await User.findOne({ email: email.trim().toLowerCase() });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists with this email" });
        }

        // إنشاء المستخدم الجديد
        const newUser = new User({
            name,
            email: email.trim().toLowerCase(),
            password, 
            role: role || 'collector' // لو محددناش دور، بيعتبره collector كوضع افتراضي
        });

        await newUser.save();

        return res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        console.error("Register Error:", error);
        return res.status(500).json({ message: "Server error during registration" });
    }
};