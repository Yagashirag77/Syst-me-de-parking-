const tarifs = require("../config/tarifs");

const calculerTarif = (date_entree_str, date_sortie_str) => {
console.log(date_entree_str);
console.log(date_sortie_str);

  const dateEntree = new Date(date_entree_str).getTime() / (1000 * 60);
  const dateSortie = new Date(date_sortie_str).getTime() / (1000 * 60);

  console.log("dateEntree: ", dateEntree);
  console.log("dateSortie: ", dateSortie);

  // différence en millisecondes
//   const diffMs = dateSortie - dateEntree;

  // convertie en minutes
  const diffMinutes = dateSortie - dateEntree;

  console.log("duree en minutes: ", diffMinutes);

  let tarif = 0;
  if (diffMinutes <= 5) {
      tarif = 0;
  }
  if (diffMinutes > 5 && diffMinutes <= 60) {
    tarif = tarifs["5_60"];
  } else if (diffMinutes > 60 && diffMinutes < 720) {
    const time_units = Math.floor(diffMinutes / 60);
    tarif = tarifs["61+"] * time_units;
  } else {
    // tarif = tarifs["forfait"];
    let time_units = Math.floor(diffMinutes / 720);
    let tarif_12h = tarifs["forfait"] * time_units;
    let minutes_restantes = diffMinutes % 720;
    let min_units = Math.floor(minutes_restantes/60);
    let tarif_restant = tarifs["61+"] * min_units;
    tarif = tarif_12h + tarif_restant;
  }
  console.log(tarif);   
  return tarif;
};

module.exports = { calculerTarif };
