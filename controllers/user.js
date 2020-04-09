// const sequelize = require("sequelize")
const {
    User
} = require("../models")
const {
    hashPassword,
    checkPassword
} = require("../helpers/bcrypt.js")
const {
    createToken
} = require("../helpers/jwt.js")
const {
    customError
} = require("../helpers/customError.js")
const {
    OAuth2Client
} = require('google-auth-library')

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// 3RD PARTY API REQUIREMENT: FREEGEOIP, DETECT LOCATION BY IP
let emailAddress
let passcode
let accessToken
let payload

class UserController {

    static register(req, res, next) {

        console.log(">>> CONTROLLERS: REGISTER USER");
        console.log(req.body);
        User.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(response => {
            console.log("WHAT'S VERDICT?");
            console.log(response);
            if(response) {
                throw new customError(400, 'EMAIL TAKEN')
            } else {
                console.log("LET'S CREATE NEW ONE");
                passcode = hashPassword(req.body.password)
                // console.log(passcode);
                return User.create({
                    email: req.body.email,
                    password: passcode
                })
            }

        })
        .then(response => {
            console.log("USER CREATED");
            res.status(201).json(response)
        })
        .catch(err => {
            return next(err)
        })

    }


    static login(req, res, next) {

        console.log(">>> LOGIN FROM SERVER");
        console.log("REQ BODY IS");
        console.log(req.body);

        let userid

        // blame 
        emailAddress = req.body.email
        passcode = req.body.password

        return User.findOne({
                where: {
                    email: emailAddress
                }
            })
            .then(response => {
                if (response) {
                    userid = response.id
                    let passwordMatchFlag = checkPassword(passcode, response.password)

                    if (passwordMatchFlag) {

                        payload = {
                            id: userid,
                            email: emailAddress
                        }

                        accessToken = createToken(payload)

                        return res.status(200).json({
                            access_token: accessToken,
                            id: response.id,
                            email: response.email
                        })

                    } else {
                        throw new customError(400, "WRONG PASSWORD/EMAIL")
                    }
                } else {
                    throw new customError(400, "WRONG PASSWORD/EMAIL")
                }
            })
            .catch(err => {
                return next(err)
            })
    }


    static googleLogin(req, res, next) {

        accessToken = req.headers.access_token


        return googleClient.verifyIdToken({
                idToken: accessToken,
                audience: process.env.GOOGLE_CLIENT_ID
            })
            .then(ticket => {

                payload = ticket.getPayload();

                // // let userId = payload['sub']
                emailAddress = payload['email']

                return User.findOne({
                    where: {
                        email: emailAddress
                    }
                })


            })
            .then(response => {
                if (response) {
                    return response
                } else {
                    return User.create({
                        email: emailAddress,
                        password: process.env.SECRET
                    })
                }
            })
            .then(response => {

                payload = {
                    id: response.id,
                    email: response.email
                }

                accessToken = createToken(payload)

                return res.status(200).json({
                    access_token: accessToken,
                    id: response.id,
                    email: response.email
                })
            })
            .catch(err => {
                return next(err)
            })
    }


    static fetchAll(req, res, next) {
        console.log(">>> CONTROLLERS/USER: SHOW ALL USERS");
        return User.findAll({
                attributes: {
                    exclude: ['password']
                }
            })
            .then(result => {
                console.log("SUCCESS FETCHING ALL USERS");
                return res.status(200).json({
                    data: result
                })
            })
            .catch(err => {
                console.log("ERROR FETCHING ALL USERS");
                return next(err)
            })
    }

}

module.exports = UserController