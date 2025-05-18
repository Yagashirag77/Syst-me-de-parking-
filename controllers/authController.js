const Utilisateur = require("../models/Utilisateur");
const Client = require("../models/Client");
// const Gerant = require("../models/Gerant");
const bycrypt = require("bcryptjs");
const session = require("express-session");

module.exports.register = async (req, res) => {
  try {
    const { nom, prenom, email, password, role } = req.body;
    const hashedPassword = await bycrypt.hash(password, 10);

    const utilisateur = await Utilisateur.create(
      { nom, prenom, email, password: hashedPassword });

    if (!utilisateur) {
        console.error("Erreur création utilisateur :", err);
        return res.status(500).send("Erreur base de données");
      }
    const client = await Client.create(utilisateur.id_utilisateur);
    if(!client){
        console.error("Erreur création client :", err);
        return res.status(500).send("Erreur base de données");
      }
      return res.status(201).json({ message: "Client créé", client });

        // const id_utilisateur = result.insertId;

        // if (role === "client") {

        // } else if (role === "gerant") {
        //   const gerant = await Gerant.create(utilisateur.id_utilisateur);
        //   return res.status(201).json({ message: "Gérant créé", gerant });
        // } else {
        //   return res.status(400).json({ message: "Rôle invalide" });
        // }
      // }
    // );
  } catch (error) {
    console.error("Erreur serveur :", error);
    return res.status(500).send("Erreur serveur");
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("email:" + email + " password:" + password);
    const utilisateur = await Utilisateur.findByEmail(email);
    if (!utilisateur) {
      return res.status(500).send("Erreur est survenue, reesayerz plus tard");
    }
    // res.status(200).send(result);
    // console.log({ password });
    mdp = utilisateur[0].password;
    const match = await bycrypt.compare(password, mdp);
    if (match) {
      req.session.user = utilisateur[0];
      return res.status(200).send("connected");
    } else {
      return res.status(401).send({ message: "Mot de passe incorrect" });
    }
  } catch (error) {
    console.error("Erreur serveur :", error);
    res.status(500).send("Erreur serveur", error);
  }
};

module.exports.logout = (req, res) => {
  try {
    req.session.destroy();
    res.status(200).send({ message: "Deconnecte" });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports.current = (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).send("Non connecté");
    }
    res.status(200).json({ utilisateur: req.session.user });
  } catch (error) {
    res.status(500).send(error);
  }
};
