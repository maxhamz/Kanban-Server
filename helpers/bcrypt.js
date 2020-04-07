const bcrypt = require("bcryptjs")
const salt = bcrypt.genSaltSync(10)

function hashPassword(inputted) {
    return bcrypt.hashSync(inputted, salt)
}


function checkPassword(inputted, stored) {
    return bcrypt.compareSync(inputted, stored)
}

module.exports = {
    hashPassword,
    checkPassword
}