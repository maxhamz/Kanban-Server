const {
    ProjectUser
} = require("../models")
const {
    customError
} = require("../helpers/customError.js")

function authorization(req, res, next) {
    let projectId = +req.params.projectid
    let userId = req.decoded.id
    console.log("AUTHORIZATION");
    console.log(req.params);
    return ProjectUser.findOne({
            where: {
                ProjectId: projectId,
                UserId: userId
            }
        })
        .then(response => {
            if (response) {
                console.log("PROJECT-USER FOUND");
                if (response.UserId === req.decoded.id) {
                    console.log("AUTHORIZATION SUCCESS");
                    return next()
                } else {
                    throw new customError(401, "UNAUTHORIZED")
                }
            } else {
                throw new customError(404, "NOT FOUND")
            }
        })
        .catch(err => {
            return next(err)
        })
}

module.exports = {
    authorization
}