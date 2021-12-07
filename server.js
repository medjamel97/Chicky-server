const express = require("express")
const app = express()

const mongoose = require("mongoose")
const port = process.env.PORT || 3000
const config = require("./config.json")
const bodyParser = require("body-parser")
const path = require("path");


app.use(express.static('public'));  
app.use('/img', express.static('uploads/images'));
//*************************   swag */
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


 swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Express API for JSONPlaceholder',
    version: '1.0.0',
    description:
      'This is a REST API application made with Express. It retrieves data from JSONPlaceholder.',
    license: {
      name: 'Licensed Under MIT',
      url: 'https://spdx.org/licenses/MIT.html',
    },
    contact: {
      name: 'JSONPlaceholder',
      url: 'https://jsonplaceholder.typicode.com',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server',
    },
  ],
  
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./routes/*.js'],
};
const swaggerSpec = swaggerJSDoc(options);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



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
