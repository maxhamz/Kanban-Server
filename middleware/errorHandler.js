const { Sequelize } = require('../models');

function errorHandler(err, req, res, next) {
    console.log(">>> ENTERING ERROR VALIDATIONS");
    // console.log(err);
    if (err instanceof Sequelize.ValidationError) {
        let arr = [];
        err.errors.forEach(item => {
            arr.push(item.message)
        })
        res.status(400).json({
            errors: arr
        })
    } else if (err instanceof Sequelize.EmptyResultError) {
        res.status(404).json({
            errors: [err.message]
        })
    } else if (err instanceof Sequelize.DatabaseError) {
        res.status(400).json({
            errors: [err.message]
        })
    } 
    else if (err.name ===  'TokenExpiredError') {
        res.status(401).json({
            errors: [err.message]
        })
    } 
    else if (err.name ===  'JsonWebTokenError') {
        res.status(400).json({
            errors: [err.message]
        })
    }
    else if (err instanceof Error) {
        res.status(err.code).json({
            errors: [err.message],
        })
    } else {
        res.status(500).json({
            errors: ["INTERNAL SERVER ERROR"],
        })
    }
}
module.exports = { errorHandler }