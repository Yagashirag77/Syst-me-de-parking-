const EntreeSortie = require("../models/EntreeSortie");
const QrCode = require("../models/QrCode");
const tarifs = require("../config/tarifs");
// const {  calculerTarif } = require("../utils/calculerTarif");
const Paiement = require("../models/Paiement");
// const e = require("express");

module.exports.validerPaiement = async (req, res) => {
  try {
    const code_unique = req.body.code_unique;
    const qrCode = await QrCode.findBycodeUnique(code_unique);

    if (!qrCode || qrCode.length === 0) {
      return res.status(404).send("QR code introuvable");
    }

    const id_client = qrCode[0].id_client;
    const type_paiement = req.body.type_paiement;

    console.log("type_paiement: ", type_paiement);

    if (type_paiement !== "espece" && type_paiement !== "carte") {
      return res.status(400).send({message: "Type de paiement incorrect"});
    }

    // Correction ici: ajout de await
    const ES = await EntreeSortie.findById(req.body.id_entree_sortie);
    if (!ES) {
      return res.status(404).send("Ticket introuvable");
    }

    console.log("tarif: ", ES.tarif); // Affiche le tarif depuis la base de données
    console.log("montant saisi: ", req.body.montant);

    if (type_paiement === "espece") {
      const montant = parseFloat(req.body.montant);
      const tarif = parseFloat(ES.tarif);

        if (montant < tarif) {
          return res.status(400).send("Le montant saisi est insuffisant");
        }
    }

    const date_paiement = new Date()
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    const paiement = await Paiement.create({
      montant: ES.tarif, // Utilisez toujours le tarif de la base
      methode: type_paiement,
      timestamp: date_paiement,
      id_entree_sortie: req.body.id_entree_sortie,
      id_client: id_client,
    });

    if (!paiement) {
      return res
        .status(500)
        .send("Erreur lors du paiement. Reesayez plus tard");
    }

    const id_paiement = paiement.insertId;
    const id_entree_sortie = req.body.id_entree_sortie;

    if (type_paiement === "card") {
      const { numero, expiration, cvc } = req.body;
      const carte = await Paiement.CreateCarte({
        numero,
        expiration,
        cvc,
        id_paiement,
      });

      if (!carte) {
        return res
          .status(500)
          .send({message: "Erreur lors du paiement. Reesayez plus tard"});
      }
    } else if (type_paiement === "espece") {
      const espece = await Paiement.CreateEspece({
        id_paiement,
      });

      if (!espece) {
        return res
          .status(500)
          .send("Erreur lors du paiement. Reesayez plus tard");
      }
    }

    // mettre a jour le statuts de la sortie "paye"

    const result = await EntreeSortie.updateStatuts(id_entree_sortie, {
        // date_sortie: SortieDate,
        // tarif: tarif,
        statuts: "paye",
      });
    if (!result) {
      return res
        .status(500)
        .send("Erreur lors du paiement. Reesayez plus tard");
    }

    res.status(200).send({ message: "Paiement effectué avec succès" });
  } catch (error) {
    console.error("Erreur lors du paiement: ", error);
    res
      .status(500)
      .send({ message: "Erreur lors du paiement. Reesayez plus tard" });
  }
};
