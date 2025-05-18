const axios = require("axios");

exports.getTarifEstime = async (req, res) => {
  const { duree } = req.body;

  try {
    const response = await axios.post("http://127.0.0.1:8000/predict", {
      duree: duree
    });

    const tarifEstime = response.data.tarif_estime;
    res.json({ tarifEstime });
  } catch (error) {
    console.error("Erreur IA :", error.message);
    res.status(500).json({ error: "Erreur lors de l’appel à l’API IA" });
  }
};
