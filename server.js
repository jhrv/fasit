'use strict'

var express = require('express')
var path = require('path')
var logger = require('morgan')

var app = express()

app.use(logger('combined'))
app.use(express.static(__dirname + "/frontend/build"))

var port = 6969

app.get('*', function (req, res){
    res.sendFile(path.resolve(__dirname, 'frontend/build/index.html'))
})

app.listen(port, function () {
    console.log('serving at', port)
})
