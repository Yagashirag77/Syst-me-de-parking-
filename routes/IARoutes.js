// routes/vehiculeRoutes.js (optionnel mais utile)
const express = require('express');
const router = express.Router();
const iaController = require('../controllers/IAController');

router.post('/tarif-estime', iaController.getTarifEstime);

module.exports = router;
