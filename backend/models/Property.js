const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    governorate: { type: String, required: true },
    city: { type: String, required: true },
    district: { type: String, default: "" },
    owner: { type: String, default: "" },
    phone: { type: String, default: "" },
    price: { type: Number, default: 0 },
    area: { type: Number, default: 0 },
    mapLink: { type: String, default: "" },
    description: { type: String, default: "" },
    addedBy: { type: String, required: true }, // اسم اللي ضاف العقار
    addedByRole: { type: String, required: true }, // دوره (Member/Owner)
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' }
}, { timestamps: true }); // بيسجل وقت الإضافة وتحديث الحالة تلقائياً

module.exports = mongoose.model('Property', propertySchema);