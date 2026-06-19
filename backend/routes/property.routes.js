const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/property.controller');

// مسار إضافة عقار جديد (POST)
router.post('/add', propertyController.addProperty);

// مسار جلب كل العقارات (GET)
router.get('/', propertyController.getAllProperties);

// مسار تحديث حالة العقار (PUT)
router.put('/update-status/:id', propertyController.updateStatus);

// مسار التعديل والحذف
router.put('/update/:id', propertyController.updateProperty);
router.delete('/delete/:id', propertyController.deleteProperty);
module.exports = router;