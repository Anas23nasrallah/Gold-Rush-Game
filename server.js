/*
Author: Anas Nasrallah.
Peupose: Gold Rush Game.
Date: 30.05.20
*/

const express = require('express')
const path = require('path')

const app = express()

app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))


const port = 3000
app.listen(port, function () {
    console.log("Server is up and running smoothly on port " + port)
})