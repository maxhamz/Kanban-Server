if(process.env.NODE_ENV === "development") {
    console.log("HELLO");
    require("dotenv").config()
}

const express = require("express")
const app = express()

const  { errorHandler } = require("./middleware/errorHandler.js")
const PORT = process.env.PORT || 3001
// const io = require('socket.io')(http)
const cors = require("cors")
app.io = require('socket.io')()
const http = require('http').createServer(app)
app.io.attach(http)

const router = require("./routes/index.js")(app.io)
const morgan = require('morgan')

app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(router)

// io.on('connection', function(socket) {
//     console.log("A USER CONNECTS");
//     socket.emit('success', {message: 'welcome!'})
//     // socket.on('disconnect', function() {
//     //     console.log("A USER DISCONNECTS");
//     // })
// })

app.use(errorHandler)

http.listen(PORT, () => {
    console.log(`LISTENING ON PORT ${PORT}`);
})