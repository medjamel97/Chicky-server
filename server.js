const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;
const DBconfig = require("./config/DB");
const bodyParser = require("body-parser");
const Utilisateurs = require("./routes/Utilisateurs");
var path = require("path");

app.use(express.static(path.join(__dirname, "/uploads")));
app.use("/uploads", express.static("./uploads"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api.chicky.com/utilisateur", Utilisateurs);

mongoose.Promise = global.Promise;
mongoose.connect(DBconfig.DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(
    (x) => {
      console.log("Connecté a la base de données");
    },
    (err) => {
      console.log("Connexion a la base de données echouée", err);
    }
  );

if (process.env.NODE_ENV === "production") {
  console.log("app in production mode");
  app.use(express.static("client/build"));
  app.get("/*", function (req, res) {
    res.sendFile(
      path.join(__dirname, "client", "build", "index.html"),
      function (err) {
        if (err) res.status(500).send(err);
      }
    );
  });
}

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
