const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// ==========================================
// 1. الاتصال بقاعدة بيانات MongoDB
// ==========================================
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Connected to MongoDB Successfully!'))
    .catch((err) => console.error('❌ MongoDB Connection Failed:', err.message));

// ==========================================
// 2. مسارات المشروع (Routes)
// ==========================================
// تأكد إن ملف auth.routes.js موجود جوه فولدر routes
const authRoutes = require('./routes/auth.routes');
app.use('/api/auth', authRoutes);

// مسار تجريبي
app.get('/api', (req, res) => {
    res.json({ message: "Welcome to Aqar-Go Backend API! 🚀" });
});

// استدعاء مسارات العقارات
const propertyRoutes = require('./routes/property.routes');
app.use('/api/properties', propertyRoutes);

// استدعاء مسارات الخدمات
const serviceRoutes = require('./routes/service.routes');
app.use('/api/services', serviceRoutes);

// ==========================================
// 3. تشغيل السيرفر
// ==========================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
const userRoutes = require('./routes/user.routes');
app.use('/api/users', userRoutes);