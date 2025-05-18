const express = require('express');
const app = express();
const session = require('express-session');

//7ta ngul lih ychre7 lia hadchi
app.use(session({
  secret: 'super_secret', 
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } //  false en local, true uniquement en HTTPS
}));

// const router =  require ('router');
const cors = require('cors');
require('dotenv').config();

const db = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const paiementRoutes = require('./routes/paiementRoutes');
const qrcodeRoutes = require('./routes/qrcodeRoutes');
const bornesRoutes = require('./routes/bornesRoutes');
const IARoutes = require('./routes/IARoutes');




app.use(cors());
app.use(express.json());

// app.use((req, res, next) => {
//   if (req.session && req.session.user) {
//     console.log(`🟢 Session active : utilisateur ID ${req.session.user.id_utilisateur} | utilisateur nom & prenom ${req.session.user.nom} ${req.session.user.prenom}`);
//   } else {
//     console.log('🔴 Aucune session utilisateur active');
//   }
//   next(); // ne pas oublier de passer à la suite
// });

//les routes dyal client (appli)
app.use('/auth', authRoutes);
app.use('/pay', paiementRoutes);
app.use('/qr', qrcodeRoutes);
app.use('/api/ia', IARoutes);

//route dyal cote borne
app.use('/borne', bornesRoutes);

// Middleware global 404 (pour toutes les routes inconnues)
// app.use((req, res, next) => {
//   res.status(404).send('Route not found');
// });

// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Something broke!');
// });




// db.connect()

const port = process.env.PORT || 3000;
app.listen(port, ()=>console.log(`Serveur lance: http://localhost:${port}`));