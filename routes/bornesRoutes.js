// routes/bornePaiementRoutes.js
const express = require('express');
const router = express.Router();
const borneESController = require('../controllers/borneESController');
const bornePaiementController = require('../controllers/bornePaiementController');

router.post('/borne/valider/:id', (req, res) => {
    console.log("valider paiement");
    res.send("Inscription route OK ✅");
});

router.get('/borne/recu/:id', (req, res) => {
    console.log("générer ou afficher reçu");
    res.send("Inscription route OK ✅");
});

router.post('/scan', borneESController.scannerQrCode);
// router.post('/scan', borneController.scannerQrCode);
//borne paiement route

router.post('/verifier', bornePaiementController.VerifierQrCode);


module.exports = router;
