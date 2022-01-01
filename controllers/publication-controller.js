let Publication = require("../models/Publication");

exports.recupererTout = async (req, res) => {
  res.send({ publication: await Publication.find() });
};

exports.recupererMes = async (req, res) => {
  res.send({ publications: await Publication.find({ user: req.body.user }) });
};

exports.ajouter = async (req, res) => {
  const { description, utilisateur } = req.body;

  const nouvellePublication = new Publication();

  nouvellePublication.idPhoto = req.file.filename;
  nouvellePublication.description = description;
  nouvellePublication.utilisateur = utilisateur;

  nouvellePublication.save();

  res
    .status(201)
    .send({ message: "success", publication: nouvellePublication });
};

exports.modifier = async (req, res) => {
  const { _id, idPhoto, description } = req.body;

  let publication = await Publication.findOneAndUpdate(
    { _id: _id },
    {
      $set: {
        idPhoto: idPhoto,
        description: description,
      },
    }
  );

  res.status(201).send({ message: "success", publication: publication });
};

exports.supprimer = async (req, res) => {
  await Publication.findById(req.body._id)
    .then(function (publication) {
      fs.unlink("./uploads/images/" + publication.idPhoto, (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });
      publication.remove();

      return res.status(201).send({ message: "success" });
    })
    .catch(function (error) {
      res.status(500).send(error);
    });
};

exports.supprimerTout = async (req, res) => {
    Publication.find({})
      .then(function (publications) {
        publications.forEach(function (publication) {
          fs.unlink("./uploads/images/" + publication.idPhoto, (err) => {
            if (err) {
              console.error(err);
              return;
            }
          });
  
          fs.unlink(
            "./uploads/publication/" + publication.emplacementImageAlbum,
            (err) => {
              if (err) {
                console.error(err);
                return;
              }
            }
          );
  
          publication.remove();
        });
  
        return res.status(201).send({ message: "success" });
      })
      .catch(function (error) {
        res.status(500).send("one of the queries failed", error);
      });
  };
