const Record = require("../models/Record")

exports.getAll = async (req, res) => {
    res.status(201).send({ "records": await Record.find() })
}

exports.recupererParLieu = async (req, res) => {
    console.log("le lieu : " + req.body.lieu)
    res.status(201).send({ "records": await Record.find({ lieu: req.body.lieu }).populate("user") })
}

exports.addOuMettreAjour = async (req, res) => {
    const { idUser, lieu } = req.body

    let record = await Record.findOne({
        user: idUser,
        lieu: lieu,
    })

    if (record) {
        await Record.findOneAndUpdate(
            {
                user: idUser,
                lieu: lieu,
            },
            {
                $set: {
                    date: Date.now()
                }
            }
        )

        res.status(201).send({ message: "updated" })
    } else {
        record = new Record()
        record.date = Date.now()
        record.user = idUser
        record.lieu = lieu

        record.save()

        res.status(201).send({ message: "added" })
    }
}
