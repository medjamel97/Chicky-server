const Utilisateur = require("../models/Utilisateur");
const bcypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtsecret = require("../config/DB");
const nodemailer = require("nodemailer");

const multer = require("multer");
//const upload = multer({ dest: "../uploads/" });
const fs = require("fs");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("req files", file);

    const utilisateurID = req.params.id;
    const dir = `./uploads/utilisateur/utilisateur-${utilisateurID}/profil-pic/`;
    fs.exists(dir, (exist) => {
      if (!exist) {
        return fs.mkdir(dir, (error) => cb(error, dir));
      }
      return cb(null, dir);
    });
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
  //limits: { fileSize: maxsize },
  fileFilter: function (req, file, cb) {
    // Set the filetypes, it is optional
    var filetypes = filetype;
    var mimetype = filetypes.test(file.mimetype);

    var extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype) {
      return cb(null, true);
    }
    cb(
      "Error: File upload only supports the " +
      "following filetypes - " +
      filetypes
    );
  },
});

var upload = multer({ storage: storage }).any();

exports.recupererUtilisateurs = async (req, res) => {
  console.log("body");
  const { email, mdp } = req.body;

  const utilisateurs = await Utilisateur.find({});

  if (utilisateurs) {
    res.status(200).send({ utilisateurs, message: "success" });
  } else {
    res.status(403).send({ message: "fail" });
  }
};

exports.inscription = async (req, res) => {
  const { pseudo, email, mdp, nom, prenom, dateNaissance, idPhoto, sexe, score, bio } = req.body;

  // upload(req, res, function (err) {
  //   //console.log("picture", req);
  //   const imgPath = req.files[0];
  // });

  const checkUtilisateur = await Utilisateur.findOne({ email });
  if (checkUtilisateur) {
    res.status(403).send({ message: "utilisateur existe dejas !" });
  } else {
    const nouveauUtilisateur = new Utilisateur();

    mdpEncrypted = await bcypt.hash(mdp, 10);

    nouveauUtilisateur.pseudo = pseudo;
    nouveauUtilisateur.email = email;
    nouveauUtilisateur.mdp = mdpEncrypted;
    nouveauUtilisateur.nom = nom;
    nouveauUtilisateur.prenom = prenom;
    //nouveauUtilisateur.dateNaissance = dateNaissance;
    nouveauUtilisateur.idPhoto = idPhoto;
    nouveauUtilisateur.sexe = sexe;
    nouveauUtilisateur.score = score;
    nouveauUtilisateur.bio = bio;

    nouveauUtilisateur.save();

    SetupUtilisateurFolder(nouveauUtilisateur._id);
    // token creation
    const token = jwt.sign({ id: nouveauUtilisateur._id }, jwtsecret.token_secret, {
      expiresIn: "360000",
    });
    // SendEmail(email, token);
    res.status(201).send({ message: "success", utilisateur: nouveauUtilisateur, token });
  }
};

exports.connexion = async (req, res) => {
  console.log("body");
  const { email, mdp } = req.body;

  const utilisateur = await Utilisateur.findOne({ email });

  if (utilisateur && (await bcypt.compare(mdp, utilisateur.mdp))) {
    const token = jwt.sign({ id: utilisateur._id, email }, jwtsecret.token_secret, {
      expiresIn: "360000",
    });
    res.status(200).send({ token, utilisateur, message: "success" });
  } else {
    res.status(403).send({ message: "mot de passe ou email incorrect" });
  }
};

exports.modifierProfil = async (req, res) => {
  const { pseudo, email, mdp, nom, prenom, dateNaissance, idPhoto, sexe, score, bio } = req.body;

  let utilisateur = await Utilisateur.findOneAndUpdate(
    { email: email },
    {
      $set: {
        pseudo: pseudo,
        //email: email,
        //mdp : mdp,
        nom: nom,
        prenom: prenom,
        //dateNaissance: dateNaissance,
        idPhoto: idPhoto,
        sexe: sexe,
        score: score,
        bio: bio
      }
    }
  );

  res.send({ utilisateur });
};

exports.modifierPhotoProfil = async (req, res) => {
  console.log(req.body)
  const id = req.params.id;
  upload(req, res, async function (err) {
    if (err) {
      res.send({ err });
    }

    console.log("req", id);
    const path = req.files[0].originalname;
    const utilisateur = await Utilisateur.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          avatar: path,
        },
      }
    );
    res.send({ utilisateur });
  });
};

//for publication model
exports.CreatePublication = async (req, res) => { };

exports.confirmation = async (req, res) => {
  // const token = req.params;
  // const id = token.Utilisateur.findOne({ _id: id });
};

async function SendEmail(email, token) {
  // create reusable transporter object using the default SMTP transport

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 465,

    secure: true,
    //service: "Gmail",
    auth: {
      utilisateur: "yessine.jemaa@esprit.tn", // generated ethereal utilisateur
      mdp: "26241998a", // generated ethereal password
    },
  });
  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
      console.log("not ready");
    } else {
      console.log("Server is ready to take our messages");
    }
  });
  const url = "http://localhost:6000/api/utilisateurs/confirm/" + token;
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" ', // sender address
    to: email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>" + url, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

async function SetupUtilisateurFolder(id) {
  const dir = `./uploads/utilisateurs/utilisateur-${id}`;

  fs.mkdir(dir, function () {
    fs.exists(dir, function (exist, err) {
      if (exist) {
        const dir2 = `./uploads/developers/developer-${id}/profile-pic`;
        fs.mkdir(dir2, function () {
          console.log("folder created");
        });
      }
    });
  });
}
