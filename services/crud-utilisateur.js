module.exports = function (app) {

    const connectionString = "mongodb+srv://jamel:jamel@chickycluster.gc7pz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    const MongoClient = require('mongodb').MongoClient

    app.get('/utilisateur/recuperer', (req, res) => {
        console.log("Recuperation")
        MongoClient.connect(connectionString, (err, client) => {
            if (err) return console.error(err)
            console.log('Connected to Database')
            db = client.db('ChickyCluster')
            db.collection('utilisateur').find().toArray()
                .then(result => {
                    console.log(result)
                    res.json(result)
                })
                .catch(error => {
                    console.log(error)
                    res.send("Erreur de recuperation")
                })
        })
    })

    app.get('/utilisateur/ajouter', (req, res) => {
        console.log("Ajout")
        if (req.query['id']) {
            MongoClient.connect(connectionString, (err, client) => {
                if (err) return console.error(err)

                db = client.db('ChickyCluster')
                db.collection('utilisateur').insertOne({
                    _id: req.query['id'],
                    nom: req.query['nom'],
                    prenom: req.query['prenom'],
                    dateNaiss: req.query['dateNaiss'],
                    pdp: req.query['pdp'],
                    sexe: req.query['sexe']
                })
                    .then(result => {
                        console.log(result)
                        res.send("Donnée ajouté avec succés")
                    })
                    .catch(error => {
                        console.log(error)
                        res.send("Erreur d'ajout")
                    })
            })
        } else {
            res.send("id vide");
        }
    })


    app.get('/utilisateur/modifier', (req, res) => {
        console.log("Modification")
        if (req.query['id']) {
            MongoClient.connect(connectionString, (err, client) => {
                if (err) return console.error(err)
                console.log('Connected to Database')

                db = client.db('ChickyCluster')
                db.collection('utilisateur').findOneAndUpdate(
                    {
                        _id: req.query['id']
                    },
                    {
                        $set: {
                            nom: req.query['nom'],
                            prenom: req.query['prenom'],
                            dateNaiss: req.query['dateNaiss'],
                            pdp: req.query['pdp'],
                            sexe: req.query['sexe']
                        }
                    }
                )
                    .then(result => {
                        console.log(result)
                        res.send("Donnée modifié avec succés")
                    })
                    .catch(error => {
                        console.log(error)
                        res.send("Erreur de modification")
                    })
            })
        } else {
            res.send("id vide");
        }
    })

    app.get('/utilisateur/supprimer', (req, res) => {
        console.log("Suppression")
        if (req.query['id']) {
            MongoClient.connect(connectionString, (err, client) => {
                if (err) return console.error(err)

                db = client.db('ChickyCluster')
                db.collection('utilisateur').deleteOne(
                    {
                        _id: req.query['id']
                    }
                )
                    .then(result => {
                        console.log(result)
                        res.send("Donnée supprimé avec succés")
                    })
                    .catch(error => {
                        console.log(error)
                        res.send("Erreur de suppression")
                    })
            })
        } else {
            res.send("id vide");
        }
    })

}