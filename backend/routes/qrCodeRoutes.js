// routes/qrCodeRoutes.js
const express = require('express');
const router = express.Router();
const qrCodeController = require('../controllers/qrCodeController');

router.post('/generate', qrCodeController.generate);

module.exports = router;
