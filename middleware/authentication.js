const { verifyToken } = require("../helpers/jwt.js")
const { customError } = require("../helpers/customError.js")
const { User } = require("../models")

function authentication(req, res, next) {
    try {
        
        let token = req.headers.access_token
        let payload = verifyToken(token)

        return User.findOne({
            where: {
                id: payload.id
            }
        })
        .then(response => {
            if(response.id === payload.id) {
                req.decoded = payload
                return next()
            } else {
                throw new customError(401, "UNAUTHORIZED ACCESS")
            }
        })
    }
    catch(err) {
        return next(err)
    }
}

module.exports = { authentication }