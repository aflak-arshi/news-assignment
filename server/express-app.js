const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const rp = require('request-promise');

app.use(logger('dev'));
app.use(bodyParser.json({
    limit: '50mb'
}));
app.use(bodyParser.urlencoded({
    extended: false,
    limit: '50mb'
}));

app.use('/uploads', express.static('./server/uploads'));

// CORS Config
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

app.get('/news', (req, res) => {
    const options = {
        method: 'GET',
        uri: 'https://newsapi.org/v2/top-headlines?' + 'country=us&' +
            'apiKey=',
        json: true // Automatically parses the JSON string in the response
    };
    rp(options)
        .then(function (repos) {
            res.json({
                'success': repos
            })
            console.log('User has %d repos', repos.length);
        })
        .catch(function (err) {
            // API call failed...
        });
});

module.exports = app;