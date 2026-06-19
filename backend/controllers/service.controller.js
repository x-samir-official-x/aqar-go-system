const Service = require('../models/Service');

exports.addService = async (req, res) => {
    try {
        const newService = new Service(req.body);
        await newService.save();
        res.status(201).json({ message: "Service added successfully!", service: newService });
    } catch (error) {
        console.error("Error adding service:", error);
        res.status(500).json({ message: "Failed to add service", error: error.message });
    }
};

exports.getAllServices = async (req, res) => {
    try {
        const services = await Service.find().sort({ createdAt: -1 });
        res.status(200).json(services);
    } catch (error) {
        console.error("Error fetching services:", error);
        res.status(500).json({ message: "Failed to fetch services" });
    }
};

// دالة لتغيير حالة الخدمة (Approve / Reject)
exports.updateStatus = async (req, res) => {
    try {
        const { id } = req.params; 
        const { status } = req.body; 

        const updatedService = await Service.findByIdAndUpdate(
            id, 
            { status: status }, 
            { new: true }
        );

        if (!updatedService) {
            return res.status(404).json({ message: "Service not found" });
        }

        res.status(200).json({ message: `Service status updated to ${status}`, service: updatedService });
    } catch (error) {
        console.error("Error updating status:", error);
        res.status(500).json({ message: "Failed to update status" });
    }
};
// دالة لتعديل خدمة
exports.updateService = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedService = await Service.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ message: "Service updated successfully", service: updatedService });
    } catch (error) {
        res.status(500).json({ message: "Failed to update service" });
    }
};

// دالة لمسح خدمة
exports.deleteService = async (req, res) => {
    try {
        const { id } = req.params;
        await Service.findByIdAndDelete(id);
        res.status(200).json({ message: "Service deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete service" });
    }
};