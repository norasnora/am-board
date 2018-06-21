// content of index.js
var namedays, extNamedays = require('vardadienas');
var http = require('http');
const express = require('express');
var request = require("request")
const app = express();

const port = process.env.PORT || 3000;

const server = app.listen(port);
var today = new Date();
var dd = today.getDate();


var url = "http://noskrien.lv/proc/tmp_am_zinas.php"



server.timeout = 1000 * 60 * 10; // 10 minutes

// Use middleware to set the default Content-Type
app.use(function (req, res, next) {
    res.header('Content-Type', 'application/json');
    next();
});

app.get('/api/main', (req, res) => {
    res.send(JSON.stringify(namedays[dd]));
})

app.get('/api/aktualitates', (req, res) => {
    // Set Content-Type differently for this particular API
    res.set({'Content-Type': 'application/json'});
	request({
    url: url,
    json: true
	}, function (error, response, body) {

	    if (!error && response.statusCode === 200) {
	        res.send(body) // Print the json response
	    }
	})
})