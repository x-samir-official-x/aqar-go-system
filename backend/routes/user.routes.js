const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.post('/add', userController.addUser);
router.get('/', userController.getUsers);
router.put('/update/:id', userController.updateUser);
router.delete('/delete/:id', userController.deleteUser);

module.exports = router;