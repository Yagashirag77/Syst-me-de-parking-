// routes/qrCodeRoutes.js
const express = require('express');
const qrCodeController = require('../controllers/qrCodeController');
const session = require('express-session');
const router = express.Router();

router.post('/generer', qrCodeController.genererQrCode);


router.get('/:code', qrCodeController.afficherQrCode);

router.delete('/suprimmer/:id', qrCodeController.supprimerQrCode);

router.put('/qrcode/associer', (req, res) => {
  console.log("associer un QR code à un véhicule") ;
  res.send("Inscription route OK ✅");
});

router.get('/qrcode/scan/:code', (req, res) => {
  console.log("lecture d'un QR code");
  res.send("Inscription route OK ✅");
});

module.exports = router;
