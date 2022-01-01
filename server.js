const express = require("express")
const app = express()

const mongoose = require("mongoose")
const port = process.env.PORT || 3000
const config = require("./config.json")
const bodyParser = require("body-parser")
const path = require("path");
const morgan = require("morgan")

app.use(morgan('dev'))

app.use(express.static('public'));  
app.use('/img', express.static('uploads/images'));
app.use('/vid', express.static('uploads/videos'));
app.use('/mp3', express.static('uploads/musique'));

//************************* SWAGGER */
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
//************************* END SWAGGER */

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use("/api/utilisateur", require("./routes/utilisateur-route"))
app.use("/api/messagerie", require("./routes/messagerie-route"))
app.use("/api/publication", require("./routes/publication-route"))
app.use("/api/commentaire", require("./routes/commentaire-route"))
app.use("/api/evaluation", require("./routes/evaluation-route"))
app.use("/api/musique", require("./routes/musique-route"))
app.use("/api/jaime", require("./routes/jaime-route"))

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

app.use((err, req, res, next) => {
  res.locals.error = err;
  const status = err.status || 500;
  res.status(status);
  res.render('error');
});

app.listen(port, () => console.log(`Server up and running on port ${port} !`))
