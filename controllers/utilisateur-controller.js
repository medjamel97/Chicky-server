const Utilisateur = require("../models/Utilisateur")
const jwt = require("jsonwebtoken")
const config = require("../config.json")
const Role = require('../middlewares/role')
const bcypt = require("bcrypt")
const nodemailer = require("nodemailer")
const fs = require("fs")

// Upload image------------------------------------------------------
const multer = require("multer")
const upload = multer().single('picture')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/public/images/profile/')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
//-------------------------------------------------------------------

///// LINKS ---------------------------------------------------------

exports.recupererUtilisateurs = async (req, res) => {
  const utilisateurs = await Utilisateur.find({})

  if (utilisateurs) {
    res.status(200).send({ utilisateurs, message: "success" })
  } else {
    res.status(403).send({ message: "fail" })
  }
}

exports.inscription = async (req, res) => {
  const { pseudo, email, mdp, nom, prenom, dateNaissance, idPhoto, sexe, score, bio } = req.body

  // upload(req, res, function (err) {
  //   //console.log("picture", req)
  //   const imgPath = req.files[0]
  // })

  if (await Utilisateur.findOne({ email })) {
    res.status(403).send({ message: "Utilisateur existe deja !" })
  } else {
    const nouveauUtilisateur = new Utilisateur()

    nouveauUtilisateur.pseudo = pseudo
    nouveauUtilisateur.email = email
    nouveauUtilisateur.mdp = await bcypt.hash(mdp, 10)
    nouveauUtilisateur.nom = nom
    nouveauUtilisateur.prenom = prenom
    nouveauUtilisateur.dateNaissance = dateNaissance
    nouveauUtilisateur.idPhoto = idPhoto
    nouveauUtilisateur.sexe = sexe
    nouveauUtilisateur.score = score
    nouveauUtilisateur.bio = bio
    nouveauUtilisateur.isVerified = false

    nouveauUtilisateur.save()

    await configurerDossierUtilisateur(nouveauUtilisateur._id)
    // token creation
    const token = jwt.sign({ _id: nouveauUtilisateur._id, role: Role.Utilisateur }, config.token_secret, {
      expiresIn: "60000", // in Milliseconds (3600000 = 1 hour)
    })

    sendConfirmationEmail(email, token)
    res.status(201).send({
      message: "success",
      utilisateur: nouveauUtilisateur,
      "Token": jwt.verify(token, config.token_secret)
    })
  }
}

exports.connexion = async (req, res) => {
  const { email, mdp } = req.body

  const utilisateur = await Utilisateur.findOne({ email })

  if (utilisateur && (await bcypt.compare(mdp, utilisateur.mdp))) {
    const token = jwt.sign({ email: email }, config.token_secret, {
      expiresIn: "36000000",
    })


    if (!utilisateur.isVerified) {
      res.status(200).send({ utilisateur, message: "email non verifié" })
    } else {
      res.status(200).send({ token, utilisateur, message: "success" })
    }

  } else {
    res.status(403).send({ message: "mot de passe ou email incorrect" })
  }
}

exports.connexionAvecReseauSocial = async (req, res) => {

  const { email, nom } = req.body

  if (email === "") {
    res.status(403).send({ message: "error please provide an email" })
  } else {
    var utilisateur = await Utilisateur.findOne({ email })
    if (utilisateur) {
      console.log("user exists, loging in")
    } else {
      console.log("user does not exists, creating an account")

      utilisateur = new Utilisateur()

      utilisateur.nom = nom
      utilisateur.email = email
      //utilisateur.address =
      //utilisateur.password =
      //utilisateur.phone =
      utilisateur.isVerified = true

      utilisateur.save()
    }

    // token creation
    const token = jwt.sign({ email: email }, config.token_secret, {
      expiresIn: "360000000",
    })

    res.status(201).send({ message: "success", utilisateur , token: token })
  }
}

exports.recupererUtilisateurParToken = async (req, res) => {

  let token = req.body.token

  try {
    token = jwt.verify(token, config.token_secret)
 
  } catch (e) {
    return res.sendStatus(404)
  }
  
  res.send({ token , "utilisateur" : await Utilisateur.findById(token.id) })
}

exports.envoyerConfirmationEmail = async (req, res) => {
  const utilisateur = await Utilisateur.findOne({ "email": req.body.email })

  if (utilisateur) {
    // token creation
    token = creerTokenPourUtilisateur(utilisateur._id, email._id)

    envoyerEmailDeConfirmation(req.body.email, token)

    res.status(200).send({ "message": "L\'email de confirmation a été envoyé a " + utilisateur.email })
  } else {
    res.status(404).send({ message: "Utilisateur innexistant" })
  }
}

exports.confirmation = async (req, res) => {

  let token

  try {
    token = jwt.verify(req.params.token, config.token_secret)
  } catch (e) {
    return res.status(400).send({ message: 'Le lien verification a peut être expireé, Veuillez revérifier votre email.' })
  }

  Utilisateur.findById(token._id, function (err, utilisateur) {
    if (!utilisateur) {
      return res.status(401).send({ message: 'Aucun utilisateur, Veuillez proceder a l\'inscription.' })
    } else if (utilisateur.isVerified) {
      return res.status(200).send({ message: 'Cet utilisateur a deja été verifié, Veuillez vous connecter' })
    } else {
      utilisateur.isVerified = true
      utilisateur.save(function (err) {
        if (err) {
          return res.status(500).send({ message: err.message })
        } else {
          return res.status(200).send({ message: 'Votre compte a été verifié' })
        }
      })
    }
  })
}

exports.motDePasseOublie = async (req, res) => {
  const codeDeReinit = req.body.codeDeReinit
  const utilisateur = await Utilisateur.findOne({ "email": req.body.email })

  if (utilisateur) {
    // token creation
    const token = jwt.sign({ _id: utilisateur._id, email: utilisateur.email }, config.token_secret, {
      expiresIn: "3600000", // in Milliseconds (3600000 = 1 hour)
    })

    envoyerEmailReinitialisation(req.body.email, token, codeDeReinit)

    res.status(200).send({ "message": "L'email de reinitialisation a été envoyé a " + utilisateur.email })
  } else {
    res.status(404).send({ "message": "Utilisateur innexistant" })
  }
}

exports.changerMotDePasse = async (req, res) => {
  const { email, nouveauMotDePasse } = req.body

  nouveauMdpEncrypted = await bcypt.hash(nouveauMotDePasse, 10)

  let utilisateur = await Utilisateur.findOneAndUpdate(
    { email: email },
    {
      $set: {
        mdp: nouveauMdpEncrypted
      }
    }
  )

  res.send({ utilisateur })
}

exports.modifierProfil = async (req, res) => {
  const { pseudo, email, mdp, nom, prenom, dateNaissance, idPhoto, sexe, score, bio } = req.body

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
  )

  res.send({ utilisateur })
}

exports.modifierPhotoProfil = async (req, res, next) => {

  await upload(req, res, function (err) {
    if (err) {
      res.send({ err });
    }
    console.log(req.file);
  })
  
  /*upload(req, res, async function (err) {
    if (err) {
      res.send({ err });
    }

    console.log("req", id);
    const path = req.files[0].originalname;
    res.send("")
  });*/

  /*

  var obj = {
    name: req.body.name,
    desc: req.body.desc,
    img: {
      data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
      contentType: 'image/jpeg'
    }
  }*/
};

exports.supprimerUtilisateur = async (req, res) => {
  console.log(req.body)

  const utilisateur = await Utilisateur.findById(req.body._id).remove()

  res.send({ utilisateur })
}

exports.supprimerToutUtilisateur = async (req, res) => {
  Utilisateur.remove({}, function (err, utilisateur) {
    if (err) {
      return handleError(res, err)
    }
    return res.status(204).send({ message: "Aucun element" })
  })
}


///// FUNCTIONS ---------------------------------------------------------

async function creerTokenPourUtilisateur(_id, email) {
  return jwt.sign({ _id: _id, email: email }, config.token_secret, {
    expiresIn: "100000000", // in Milliseconds (3600000 = 1 hour)
  })
}

async function envoyerEmailReinitialisation(email, codeDeReinit) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'chicky.app@gmail.com',
      pass: 'this-is-chicky-gmail-password'
    }
  })

  transporter.verify(function (error, success) {
    if (error) {
      console.log(error)
      console.log("Server not ready")
    } else {
      console.log("Server is ready to take our messages")
    }
  })

  const mailOptions = {
    from: 'chicky.app@gmail.com',
    to: email,
    subject: 'Reinitialisation de votre mot de passe - Chicky',
    html: "<h3>Vous avez envoyé une requete de reinitialisation de mot de passe </h3><p>Entrez ce code dans l'application pour proceder : <b style='color : blue'>" + codeDeReinit + "</b></p>"
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent : ' + info.response)
    }
  })
}

async function envoyerEmailDeConfirmation(email, token) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'chicky.app@gmail.com',
      pass: 'this-is-chicky-gmail-password'
    }
  })

  transporter.verify(function (error, success) {
    if (error) {
      console.log(error)
      console.log("Server not ready")
    } else {
      console.log("Server is ready to take our messages")
    }
  })

  const urlDeConfirmation = "http://localhost:3000/api.chicky.com/utilisateur/confirmation/" + token

  const mailOptions = {
    from: 'chicky.app@gmail.com',
    to: email,
    subject: 'Confirmation de votre email',
    html: "<h3>Veuillez confirmer votre email en cliquant sur ce lien : </h3><a href='" + urlDeConfirmation + "'>Confirmation</a>"
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent: ' + info.response)
    }
  })
}

async function configurerDossierUtilisateur(id) {
  const dir = `./uploads/utilisateurs/utilisateur-${id}`

  fs.mkdir(dir, function () {
    fs.exists(dir, function (exist, err) {
      if (exist) {
        const dir2 = `./uploads/developers/developer-${id}/profile-pic`
        fs.mkdir(dir2, function () {
          console.log("folder created")
        })
      }
    })
  })
}