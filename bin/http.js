/* const env = process.env.NODE_ENV || 'development'

switch(env) {
    case 'development':
        require('dotenv').config({path: process.cwd() + './env'})
        break
    case 'test':
        require('dotenv').config({path: process.cwd() + '/.env.test'})
        break
}



const express = require('express')
const app = express()
const http = require('http').createServer(app)
const cors = require('cors')

const PORT = process.env.PORT || 3001

http.listen(PORT, () => {
    console.log(`LISTENING ON POST ${PORT}`);
})

module.exports = {
    http, app
} */