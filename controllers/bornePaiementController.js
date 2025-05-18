const EntreeSortie = require("../models/EntreeSortie");
const QrCode = require("../models/QrCode");
const tarifs = require("../config/tarifs");
// const session = require("session");
const { calculerTarif } = require("../utils/calculerTarif");
const paiementController = require("../controllers/paiementController");

module.exports.VerifierQrCode = async (req, res) => {
  try {
    const { matricule, code_unique } = req.body;
    const qrCode = await QrCode.findBycodeUnique(code_unique);
    
    if (!qrCode || qrCode.length === 0 || qrCode[0]== undefined) {
      return res.status(400).send({message: "QR code introuvable"});
    }
    
    console.log({qrCode});

    const qr = qrCode[0];
    //   console.log("🎯 QR code :", qr);

    
    if (!qr.actif) {
      return res.status(403).send({ message: "QR code inactif" });
    }

    const entree_sortie = await EntreeSortie.findByIdQrcode(qr.id_qrCode);
    if (!entree_sortie || entree_sortie.length === 0) {
      return res.status(404).send("Aucun ticket associé à ce QR");
    }

    if (entree_sortie[0].date_entree == null) {
      return res.status(500).send({
        message:
          "Erreur serveur, reessayez plus tard (date d'entree est nulle)",
      });
    }

    if (entree_sortie[0].matricule_vehicule != matricule) {
      return res.status(403).send({ message: "matricule doesnt match" });
    }
    const SortieDate = new Date().toISOString().slice(0, 19).replace("T", " ");
    //calculer tarif
    const tarif = calculerTarif(entree_sortie[0].date_entree, SortieDate);

    if (tarif == null) {
      return res.status(500).send({
        message:
          "une erreur est survenue lors de la calcule du tarif, reesayez plus tard.",
      });
    }

    const id_es = entree_sortie[0].id_entree_sortie;

    const update_sortie = await EntreeSortie.updateSortie(id_es, {
      date_sortie: SortieDate,
      tarif: tarif,
      statuts: "calculee",
    });

    if (!update_sortie || update_sortie.affectedRows === 0) {
      return res.status(500).send({message: "Échec de la mise à jour"});
    }
    //afficher le ticket dans la borne de paiement
    res.status(200).send({ message: "Scan effectué",
      id_entree_sortie: id_es,
      date_entree: entree_sortie[0].date_entree,
      date_sortie: SortieDate,
      tarif: tarif,
      statuts: "calculee"
     });
  } catch (error) {
    console.error("Erreur lors du payement: ", error);
    res
      .status(500)
      .send({ message: "Erreur lors du paiement. Reesayez plus tard" });
  }
};
