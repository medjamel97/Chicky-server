let Musique = require("../models/Musique");
const fs = require("fs");

exports.recupererTout = async (req, res) => {
  res.send({ musiques: await Musique.find() });
};

exports.recupererParId = async (req, res) => {
  res.send({ musique: await Musique.findById(req.body._id) });
};

exports.ajouter = async (req, res) => {
  const { titre, artiste } = req.body;

  const newMusique = new Musique();
  newMusique.titre = titre;
  newMusique.artiste = artiste;
  newMusique.emplacementFichier = req.files.musique[0].filename;
  newMusique.emplacementImageAlbum = req.files.image[0].filename;

  newMusique.save();

  res.status(201).send({ message: "success", musique: newMusique });
};

exports.supprimer = async (req, res) => {
  await Musique.findById(req.body._id)
    .then(function (musique) {
      fs.unlink("./uploads/musique/" + musique.emplacementFichier, (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });

      fs.unlink("./uploads/musique/" + musique.emplacementImageAlbum, (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });

      musique.remove();

      return res.status(201).send({ message: "success" });
    }).catch(function (error) {
      res.status(500).send(error);
    });
};

exports.supprimerTout = async (req, res) => {
  Musique.find({})
    .then(function (musiques) {
      musiques.forEach(function (musique) {
        fs.unlink("./uploads/musique/" + musique.emplacementFichier, (err) => {
          if (err) {
            console.error(err);
            return;
          }
        });

        fs.unlink(
          "./uploads/musique/" + musique.emplacementImageAlbum,
          (err) => {
            if (err) {
              console.error(err);
              return;
            }
          }
        );

        musique.remove();
      });

      return res.status(201).send({ message: "success" });
    })
    .catch(function (error) {
      res.status(500).send(error);
    });
};
