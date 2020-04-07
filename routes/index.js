const router = require('express').Router()
const userRoute = require("./user")
const projectRoute = require('./project')

router.use("/users", userRoute)
router.use('/projects', projectRoute)

module.exports = router