// app.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const qrCodeRoutes = require('./routes/qrCodeRoutes');
const vehicleRoutes = require('./routes/vehicleRoutes');
const paiementRoutes = require('./routes/paiementRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/qrcode', qrCodeRoutes);
app.use('/api/vehicle', vehicleRoutes);
app.use('/api/payment', paiementRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
