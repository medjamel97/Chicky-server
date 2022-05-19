const Record = require("../models/Record")

exports.getAll = async (req, res) => {
    res.status(200).send({"records": await Record.find().populate("user")})
}

exports.getByLocation = async (req, res) => {
    console.log("locationName : " + req.body.locationName)
    res.status(200).send({"records": await Record.find({locationName: req.body.locationName}).populate("user")})
}

exports.addOrUpdate = async (req, res) => {
    const {idUser, locationName, longitude, lattitude} = req.body

    let record = await Record.findOne({
        user: idUser,
        locationName
    })

    if (record) {
        await Record.findOneAndUpdate(
            {
                user: idUser,
                locationName
            },
            {
                $set: {
                    date: Date.now(),
                    longitude,
                    lattitude,
                }
            }
        )

        record = await Record.findOne({
            user: idUser,
            locationName
        }).populate("user");
        res.status(200).send({message: "updated", record})
    } else {
        record = new Record()
        record.date = Date.now()
        record.user = idUser
        record.locationName = locationName
        record.longitude = longitude
        record.lattitude = lattitude

        record.save()
    }
}


exports.deleteAll = async (_req, res) => {
    await Record.find({})
        .then(function (records) {
            records.forEach(function (record) {
                record.remove()
                res.status(200).send({message: "All records have been deleted"})
            })
                .catch(function (error) {
                    res.status(500).send(error)
                })
        })
}

