const EntreeSortie = require("../models/EntreeSortie");
const QrCode = require("../models/QrCode");

module.exports.scannerQrCode = async (req, res) => {
  try {
    const { matricule, code_unique } = req.body;

    const qrCode = await QrCode.findBycodeUnique(code_unique);
    if (!qrCode) {
      return res.status(200).send({message: "QR code introuvable"});
    }

    console.log(qrCode);
    const qr = qrCode[0];
      console.log("🎯 QR code :", qr);

    if (!qr.actif) {
      return res.status(403).send({message: "QR code inactif"});
    }
    console.log(qrCode);

    const entree_sortie = await EntreeSortie.findByIdQrcode(qr.id_qrCode);
    if (!entree_sortie || entree_sortie.length === 0) {
      return res.status(404).send({message: "Aucun ticket associé à ce QR"});
    }

    if (entree_sortie[0].date_entree == null) {
      //AKA 5ona ayd5el
      const id_es = entree_sortie[0].id_entree_sortie;
      console.log("🎯 ID ES :", id_es);
      // const dateEntree =
      //   res.status(200).send("ok");
      const update_entree = await EntreeSortie.updateEntree(id_es, {
        date_entree: new Date().toISOString().slice(0, 19).replace("T", " "),
        matricule_vehicule: matricule,
        statuts: "en cours",
      });


      if (!update_entree || update_entree.affectedRows === 0) {
        return res.status(500).send({message: "Échec de la mise à jour"});
      }

      return res.status(200).send({ message: "Entrée enregistrée" });

      console.log({message: res.message});
    } else {
      console.log(entree_sortie[0]);
      // console.log(entree_sortie[0].date_sortie, entree_sortie[0].statuts, entree_sortie[0].matricule_vehicule);
      console.log("date d entree n est pas nulle");
      const es = entree_sortie[0];

      console.log(" Entrée déjà enregistrée :", es.date_entree);
    
      if (es.matricule_vehicule !== matricule) {
        // console.log({message: res.message});
        return res.status(400).send({ message: "Matricule Incorrect" });
      }

      if (es.date_sortie == null) {
        return res.status(400).send({ message: "Le ticket n'est pas encore clôturé. Veuillez passer par la borne de paiement." });
      }
      
      if (es.statuts !== "paye") {
        return res.status(400).send({ message: "Le ticket n'est pas payé" });
      }
    
      // ✅ Sortie validée
      await QrCode.desactiver(qr.id_qrCode); // si tu veux désactiver le QR
    
      return res.status(200).send({ message: "Sortie enregistrée, Bonne route" });
    }
  } catch (err) {
    console.error("Erreur lors du scan QR :", err);
    res.status(500).send({message: "Erreur serveur"});
  }
};
