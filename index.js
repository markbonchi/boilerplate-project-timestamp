// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
// var Port = 3000;

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// API endpoint for time... 
app.get("/api/:time", (req, res, next) => {
  req.unix = Date.parse(req.params.time);
  if (!req.unix) {
    req.time = new Date(parseInt(req.params.time));
    req.unix = req.params.time
  } else {
    req.time = new Date(req.unix)
  }
  next()
}, (req, res) => {
  res.json({ "unix": req.unix, "utc": req.time.toUTCString() })
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log(`Your app is listening on port ${listener.address().port}`);
});

// var listener = app.listen(Port, function () {
//   console.log(`Your app is listening on port ${Port}`);
// });
