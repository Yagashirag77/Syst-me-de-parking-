// routes/paiementRoutes.js
const express = require('express');
const router = express.Router();
const paiementController = require('../controllers/paiementController');

router.post('/pay', paiementController.effectuerPaiement);

module.exports = router;
