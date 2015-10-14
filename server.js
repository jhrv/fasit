'use strict'

var express = require('express')
var app = express()
var path = require('path')
var logger = require('morgan')

app.use(logger('combined'))

// serve static html
app.use(express.static(__dirname + "/frontend/build"))

var port = 6969

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', function (req, res){
    res.sendFile(path.resolve(__dirname, 'frontend/build/index.html'))
})

app.listen(port, function () {
    console.log('serving at', port)
})
