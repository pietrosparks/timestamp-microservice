var express = require('express');
var app = express();
var moment = require('moment')
var port = process.env.PORT || 4000;
var ejs = require('ejs');

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.set('view-engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
});

app.get("/t/:timestamp", (req, res) => {

    if (moment.unix(req.params.timestamp).isValid()) {
     
        const timeObj = {};
        timeObj.unix = req.params.timestamp;
        timeObj.naturalDate = moment(req.params.timestamp,'X').format('MMMM Do YYYY');
        res.render('result.html', {time:timeObj})
    } else if (moment(req.params.timestamp).isValid()) {
        const timeObj = {};
        timeObj.unix = moment(req.params.timestamp).unix();
        timeObj.naturalDate = moment(req.params.timestamp).format('MMMM Do YYYY');
        res.render('result.html',{time: timeObj})

    }
    else {
        const timeObj = {};
        timeObj.error = 'Not valid input'
        res.render('result.html',{time: timeObj})
    }



})

// listen for requests :)
var listener = app.listen(port, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});