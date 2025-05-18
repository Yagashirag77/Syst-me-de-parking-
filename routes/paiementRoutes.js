// routes/paiementRoutes.js
const express = require('express');
const router = express.Router();
const paiementController = require('../controllers/paiementController');

// // Gestion des entrées/sorties
// router.post('/entree-sortie/entree', (req, res) => {
//   console.log("créer une entrée de véhicule");
//   res.send("Inscription route OK ✅");        
// });

// router.post('/entree-sortie/sortie', (req, res) => {
//   console.log("clôturer la sortie");
//   res.send("Inscription route OK ✅");
// });

// router.get('/entree-sortie/:id', (req, res) => {
//   console.log("récupérer les infos de ticket");
//   res.send("Inscription route OK ✅");
// });

// // Paiement
// router.post('/paiement', (req, res) => {
//   console.log("enregistrer un paiement");
//   res.send("Inscription route OK ✅");
// });

router.get('/clients/:id/paiements', (req, res) => {
  console.log("paiements d'un client");
  res.send("Inscription route OK ✅");
});

router.post('/valider', paiementController.validerPaiement);


module.exports = router;
