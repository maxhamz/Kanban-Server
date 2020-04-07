const {customError} = require('../helpers/customError')
const {Project} = require('../models')

function po_authorization(req, res, next) {

    let projectId = +req.params.id
    let userId = req.decoded.id

    console.log(">>> PO AUTHORIZATION");
    Project.findByPk(projectId)
        .then(response => {
            if(response) {
                console.log("PROJECT FOUND");
                if(response.UserId === userId) {
                    console.log("AUTHORIZATION SUCCESS");
                    next()
                } else {
                    throw new customError(401, 'UNAUTHORIZED')
                }
            } else {
                throw new customError(404, 'NOT FOUND')
            }
        })
        .catch(err => {
            next(err)
        })

}

module.exports = {po_authorization}