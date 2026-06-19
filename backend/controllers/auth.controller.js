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