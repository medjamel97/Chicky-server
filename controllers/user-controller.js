const User = require("../models/User")
const jwt = require("jsonwebtoken")
const role = require("../middlewares/role")
const bcrypt = require("bcrypt")
const nodemailer = require("nodemailer")
const os = require("os")
const path = require("path");
const aws = require("../middlewares/aws-controller")

// BASIC ROUTES - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

exports.getAll = async (req, res) => {
    res.send({users: await User.find()})
}

exports.get = async (req, res) => {
    try {
        const id = req.params.userId;
        const user = await User.findById({_id: id}).select("-password");
        res.status(200).json({user});
    } catch (err) {
        res.status(500);
    }
};

// AUTH ROUTES - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

exports.register = async (req, res) => {
    const {username, email, password, firstname, lastname, birthdate, gender, bio} = req.body

    let imageFilename;
    if (req.file) {
        imageFilename = req.file.filename
    }

    if (await User.findOne({email})) {
        res.status(403).send({message: "User already exist !"})
    } else {
        let user = await new User({
            username,
            email,
            password: await bcrypt.hash(password, 10),
            firstname,
            lastname,
            birthdate,
            gender,
            bio,
            imageFilename,
            isVerified: false,
            role: role.User,
        })

        await user.save();

        // token creation
        const token = generateUserToken(user)

        await doSendConfirmationEmail(email, token, req.protocol)

        res.status(200).send({
            message: "success",
            user,
            Token: jwt.verify(token, process.env.JWT_SECRET, {}, {}),
        })
    }
}

exports.login = async (req, res) => {
    const {email, password} = req.body

    email.replace(/\s*/g, "")

    const user = await User.findOne({email})

    if (user && (await bcrypt.compare(password, user.password))) {
        const token = generateUserToken(user)

        if (!user.isVerified) {
            res.status(403).send({user, message: "Email not verified"})
        } else {
            res.status(200).send({token, user, message: "Success"})
        }
    } else {
        res.status(403).send({message: "mot de passe ou email incorrect"})
    }
}

exports.updateProfile = async (req, res) => {
    const {email, username, firstname, lastname, birthdate, gender, bio} = req.body;

    let imageFilename;
    if (req.files) {
        if (req.files.file) {
            imageFilename = "user" + Date.now() + path.extname(req.files.file.name)
        }
    }

    await User.findOneAndUpdate({email}, {
        $set: {
            email, username, firstname,
            lastname, birthdate, gender,
            bio, imageFilename,
        }
    }).then(async (user) => {
        if (imageFilename && user) {
            await aws.upload(req.files.file, imageFilename, "images")
        }
    })

    return res.send({
        message: "Password updated successfully",
        user: await User.findOne({email}).select("-password")
    });
};

exports.updatePassword = async (req, res) => {
    const {password} = req.body;

    await User.findOneAndUpdate({_id: req.params.userId},
        {
            $set: {
                password: await bcrypt.hash(password, 10),
            },
        }
    );

    return res.send({message: "Password updated successfully"});

};

exports.forgotPassword = async (req, res) => {
    const user = await User.findOne({email: req.body.email}).select("-password");

    if (user) {
        const randomNumber = randomIntBetween(1000, 9999);

        // Token creation
        const token = await generateResetToken(randomNumber)

        const success = await sendEmail({
            from: process.env.GMAIL_USER,
            to: req.body.email,
            subject: "Password reset - Kitebi",
            html:
                "<h3>You have requested to reset your password</h3><p>Your reset code is : <b style='color : #22b7f8'>" +
                randomNumber +
                "</b></p>",
        }).catch((error) => {
            console.log(error)
            return res.status(500).send({
                message: "Error : email could not be sent"
            })
        });

        if (success) {
            return res.status(200).send({
                message: "Reset email has been sent to : " + user.email, token
            })
        } else {
            return res.status(500).send({
                message: "Email could not be sent"
            })
        }
    } else {
        return res.status(404).send({message: "User does not exist"});
    }
};

exports.verifyResetCode = async (req, res) => {
    const {typedResetCode} = req.body;

    let openToken
    try {
        openToken = jwt.verify(req.body.token, process.env.JWT_SECRET, {}, {});
    } catch (e) {
        console.log(e)
        return res.status(500).send({message: "Error, could not decrypt token"});
    }

    if (String(openToken.resetCode) === typedResetCode) {
        res.status(200).send({message: "Success"});
    } else {
        res.status(403).send({message: "Incorrect reset code"});
    }
}

exports.resetPassword = async (req, res) => {
    const {
        email,
        password,
    } = req.body;

    try {
        await User.findOneAndUpdate({email},
            {
                $set: {
                    password: await bcrypt.hash(password, 10),
                },
            }
        )
        res.status(200).send({message: "Success"});
    } catch (error) {
        res.status(500).send({error});
    }
}

// UTILITIES FUNCTIONS - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function generateUserToken(user) {
    return jwt.sign(
        {user}, process.env.JWT_SECRET, {
            expiresIn: "100000000", // in Milliseconds (3600000 = 1 hour)
        }, {}
    )
}

function generateResetToken(resetCode) {
    return jwt.sign(
        {resetCode},
        process.env.JWT_SECRET, {
            expiresIn: "100000000", // in Milliseconds (3600000 = 1 hour)
        }, {}
    )
}

async function doSendConfirmationEmail(email, token, protocol) {
    let port = process.env.PORT || 5000

    await sendEmail({
        from: process.env.GMAIL_USER,
        to: email,
        subject: "Confirm your email",
        html:
            "<h3>Please confirm your email using this </h3><a href='" +
            protocol + "://" + os.hostname() + ":" + port + "/auth/confirmation/" + token +
            "'>Link</a>",
    })
}

async function sendEmail(mailOptions) {
    let transporter = await nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASSWORD,
        },
    });

    await transporter.verify(function (error) {
        if (error) {
            console.log(error);
            console.log("Server not ready");
        } else {
            console.log("Server is ready to take our messages");
        }
    })

    await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            return false;
        } else {
            console.log("Email sent: " + info.response);
            return true;
        }
    });

    return true
}

function randomIntBetween(min, max) {
    return Math.floor(
        Math.random() * (max - min + 1) + min
    )
}
