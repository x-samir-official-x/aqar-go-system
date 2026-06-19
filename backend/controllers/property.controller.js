const Property = require('../models/Property');

// 1. دالة إضافة عقار جديد
exports.addProperty = async (req, res) => {
    try {
        const newProperty = new Property(req.body);
        await newProperty.save(); // حفظ في MongoDB
        
        res.status(201).json({ message: "Property added successfully!", property: newProperty });
    } catch (error) {
        console.error("Error adding property:", error);
        res.status(500).json({ message: "Failed to add property", error: error.message });
    }
};

// 2. دالة جلب كل العقارات (عشان نعرضها في الداش بورد)
exports.getAllProperties = async (req, res) => {
    try {
        // بنجيب كل العقارات ونرتبها من الأحدث للأقدم
        const properties = await Property.find().sort({ createdAt: -1 }); 
        res.status(200).json(properties);
    } catch (error) {
        console.error("Error fetching properties:", error);
        res.status(500).json({ message: "Failed to fetch properties" });
    }
};

// دالة لتغيير حالة العقار (Approve / Reject)
exports.updateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        // 1. التحديث بالطريقة الجديدة عشان نلغي التحذير
        const updatedProperty = await Property.findByIdAndUpdate(
            id,
            { status: status },
            { returnDocument: 'after', runValidators: true } 
        );

        // 2. لو ملقاش العقار
        if (!updatedProperty) {
            return res.status(404).json({ message: "Property not found!" });
        }

        // 3. لو كله تمام
        res.status(200).json({ message: "Status updated successfully", property: updatedProperty });
        
    } catch (error) {
        console.error("Error updating property status:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
// دالة لتعديل عقار
exports.updateProperty = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProperty = await Property.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ message: "Property updated successfully", property: updatedProperty });
    } catch (error) {
        res.status(500).json({ message: "Failed to update property" });
    }
};

// دالة لمسح عقار
exports.deleteProperty = async (req, res) => {
    try {
        const { id } = req.params;
        await Property.findByIdAndDelete(id);
        res.status(200).json({ message: "Property deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete property" });
    }
};