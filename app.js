if(process.env.NODE_ENV === "development") {
    console.log("HELLO");
    require("dotenv").config()
}

const express = require("express")
const app = express()
const  { errorHandler } = require("./middleware/errorHandler.js")
const PORT = process.env.PORT || 3000
const cors = require("cors")
const router = require("./routes/index.js")
const morgan = require('morgan')

app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(router)

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`LISTENING ON PORT ${PORT}`);
})