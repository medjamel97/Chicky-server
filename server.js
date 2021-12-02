const express = require("express")
const app = express()

const mongoose = require("mongoose")
const port = process.env.PORT || 3000
const config = require("./config.json")
const bodyParser = require("body-parser")
const path = require("path");

app.use(express.static(path.join(__dirname, "/uploads")))
app.use("/uploads", express.static("./uploads"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// app.use(logger('dev'))
// app.use(express.static(path.join(__dirname),'public'));

const routeUtilisateur = require("./routes/utilisateur-route")
const routePublication = require("./routes/publication-route")
const routeCommentaire = require("./routes/commentaire-route")
const routeConversation = require("./routes/conversation-route")
const routeMessage = require("./routes/message-route")

app.use("/api.chicky.com/utilisateur", routeUtilisateur)
app.use("/api.chicky.com/publication", routePublication)
app.use("/api.chicky.com/commentaire", routeCommentaire)
app.use("/api.chicky.com/conversation", routeConversation)
app.use("/api.chicky.com/message", routeMessage)

mongoose.Promise = global.Promise
mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(
    () => {
      console.log("Connecté a la base de données")
    },
    (err) => {
      console.log("Connexion a la base de données echouée", err)
    }
  )

if (process.env.NODE_ENV === "production") {
  console.log("app in production mode")
  app.use(express.static("client/build"))
  app.get("/*", function (req, res) {
    res.sendFile(
      path.join(__dirname, "client", "build", "index.html"),
      function (err) {
        if (err) res.status(500).send(err)
      }
    )
  })
}

app.listen(port, () => console.log(`Server up and running on port ${port} !`))
