const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/service.controller');

router.post('/add', serviceController.addService);
router.get('/', serviceController.getAllServices);
// مسار تحديث حالة الخدمة (PUT)
router.put('/update-status/:id', serviceController.updateStatus);
// مسار التعديل والحذف للخدمات
router.put('/update/:id', serviceController.updateService);
router.delete('/delete/:id', serviceController.deleteService);
module.exports = router;