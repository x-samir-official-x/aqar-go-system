const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, default: "" },
    // ضفنا الأدوار الجديدة واحتفظنا بالقديم عشان مفيش حاجة تبوظ
    role: { type: String, enum: ['owner', 'member', 'Collector', 'Reviewer', 'Admin'], default: 'Collector' },
    status: { type: String, enum: ['Active', 'Suspended'], default: 'Active' },
    records: { type: Number, default: 0 } 
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);