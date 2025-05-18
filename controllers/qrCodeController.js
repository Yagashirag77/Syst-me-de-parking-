const QRCode = require("../models/QrCode");
const Qr = require("qrcode");
const session = require("express-session");
const { v4: uuid } = require("uuid");
// const Vehicule = require("../models/Vehicule");
const Utilisateur = require("../models/Utilisateur");
const Client = require("../models/Client");
// const Parking = require("../models/Parking");
const Paiement = require("../models/Paiement");
const EntreeSortie = require("../models/EntreeSortie");
const BornePaiement = require("../models/BornePaiement");
const QrCode = require("../models/QrCode");

module.exports.genererQrCode = async (req, res) => {
  //chufu wach b3da client oula gerant

  const client = await Client.findByUtilisateurId(
    req.session.user.id_utilisateur
  );
  if (!client) {
    console.error("Erreur recherche client :", err);
    return res.status(500).send("Erreur base de données");
  }

  //QR valeur
  const nom = req.session.user.nom.toUpperCase();
  const prenom = req.session.user.prenom.toUpperCase();
  const digit = uuid();
  const concatString = `${nom.slice(0, 3)}${prenom.slice(0, 3)}-${digit.slice(
    0,
    6
  )}`;
  console.log(concatString);
  const dateCreation = new Date().toISOString().slice(0, 19).replace("T", " ");

  const qrCode = await QrCode.create({
    id_client: client[0].id_client,
    code_unique: concatString,
    actif: true,
    date_creation: dateCreation,
  });

  if (!qrCode) {
    console.error("Erreur création du QR code :", err);
    return res.status(500).send("Erreur base de données");
  }

  // const qrCodeId = qrCode.insertId;
  const entreeSortie = await EntreeSortie.create({
    id_qrCode: qrCode.insertId,
    // date_entree: dateCreation,
    statuts: "Generee",
  });

  if (!entreeSortie) {
    console.error("Erreur creation entree sortie :", err);
    return res.status(500).send("Erreur base de données");
  }

  res.status(200).send({ qrCode, entreeSortie });

  // console.log({user:req.session.user.id_utilisateur});
};

module.exports.afficherQrCode = async (req, res) => {
  const code = req.params.code;

  try {
    const image = await Qr.toDataURL(code);
    res.status(200).send({ code, image: image });
  } catch (err) {
    console.log("Erreur lors de la generation de l'image: ", err),
      res.status(500).send("Erreur lors de la generation de l'image");
  }
};

module.exports.supprimerQrCode = (req, res) => {
  QrCode.delete(req.params.id, (err, result) => {
    if (err) {
      console.error("Erreur suppression QR code :", err);
      return res.status(500).send("Erreur base de données");
    } else {
      res.status(200).send("code supprimé");
    }
  });
};

// module.exports.findQRcodeByCode = async (code, req, res) => {
//     QrCode.findBycodeUnique(req.code, (err, result) => {
//         if(err){
//             console.error("Erreur recherche QR code :", err);
//             return res.status(500).send("Erreur base de données");
//         }
//         else{
//             res.status(200).send(result);
//         }
//     })
// };

// module.exports.ScannerQrCode = (req, res) => {

// };
