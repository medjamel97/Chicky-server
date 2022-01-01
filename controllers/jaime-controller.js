const Jaime = require("../models/Jaime");
const Musique = require("../models/Musique");
const Musique = require("../models/Musique");

exports.ajouterOuSupprimer = async (req, res) => {
  const { idUtilisateur, idMusique } = req.body;

  let jaime = await Jaime.findOne({
    utilisateur: idUtilisateur,
    musique: idMusique,
  });
  let musique = await Musique.findById(idMusique);

  if (jaime) {
    musique.update(
      { _id: utilisateur },
      {
        $pull: {
          jaimes: [jaime._id],
        },
      }
    )

    jaime.remove();
  } else {
    jaime = new Jaime();
    jaime.date = Date.now();
    jaime.utilisateur = idUtilisateur;
    jaime.musique = idMusique;

    musique.update(
        { _id: utilisateur },
        {
          $push: {
            jaimes: [jaime._id],
          },
        }
      )

    jaime.save();
  }

  res.status(201).send({ message: "success" });
};
