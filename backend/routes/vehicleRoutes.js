// routes/vehicleRoutes.js
const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');

router.post('/add', vehicleController.addVehicle);
router.get('/:clientId', vehicleController.getVehicles);

module.exports = router;
