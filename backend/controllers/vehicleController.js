// controllers/vehicleController.js
const Vehicle = require('../models/vehicle');

exports.addVehicle = (req, res) => {
  const { immatriculation, type, client_id } = req.body;

  Vehicle.add({ immatriculation, type, client_id }, (err, result) => {
    if (err) return res.status(500).json({ error: 'Erreur ajout véhicule' });

    res.status(201).json({ message: 'Véhicule ajouté' });
  });
};

exports.getVehicles = (req, res) => {
  const clientId = req.params.clientId;

  Vehicle.getByClient(clientId, (err, results) => {
    if (err) return res.status(500).json({ error: 'Erreur récupération véhicule' });

    res.json(results);
  });
};
