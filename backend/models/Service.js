const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    governorate: { type: String, required: true },
    city: { type: String, required: true },
    provider: { type: String, default: "" },
    phone: { type: String, default: "" },
    price: { type: Number, default: 0 },
    description: { type: String, default: "" },
    addedBy: { type: String, required: true },
    addedByRole: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);