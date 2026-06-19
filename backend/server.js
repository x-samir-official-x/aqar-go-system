const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// ==========================================
// Middleware
// ==========================================
app.use(cors()); // أساسي عشان الفرونت إند يكلم الباك إند
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
// تأكد إن مسارات الملفات دي مظبوطة حسب مكان server.js
const authRoutes = require('./routes/auth.routes');
const propertyRoutes = require('./routes/property.routes');
const serviceRoutes = require('./routes/service.routes');
const userRoutes = require('./routes/user.routes');

app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/users', userRoutes);

// مسار تجريبي للتأكد إن السيرفر شغال
app.get('/api', (req, res) => {
    res.json({ message: "Welcome to Aqar-Go Backend API! 🚀" });
});

// ==========================================
// 3. تشغيل السيرفر
// ==========================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});