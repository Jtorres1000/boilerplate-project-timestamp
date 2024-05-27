// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get("/api/:date", (req, res) => {

  dateInput = req.params.date

  console.log(`params: ${dateInput}`)

  unix = /^\d+$/.test(dateInput) ? true : false

  if (unix) {
    const timestamp = Number(dateInput); // Convertir la cadena a número // Convertir segundos a milisegundos
    console.log(`unix: ${timestamp}`)
    console.log(`utc: ${new Date(timestamp).toUTCString()}`)
    return res.json({
      unix: timestamp,
      utc: new Date(timestamp).toUTCString()
    });
  }

  if (new Date(dateInput).toUTCString() === "Invalid Date") {
    return res.json({
      error: "Invalid Date"
    })
  }

  console.log(`unix: ${new Date(dateInput).getTime()}`)
  console.log(`utc: ${new Date(dateInput).toDateString()}`)

  res.json(
    {
      unix: Number(new Date(dateInput).valueOf()),
      utc: new Date(dateInput).toUTCString()
      //"utc":"Fri, 25 Dec 2015 00:00:00 GMT"}
    })
})

app.get('/api', (req, res) => {
  console.log(req.query)
  console.log(`unix:${new Date().getTime()}`)
  console.log(`utc${new Date().toUTCString()}`)
  res.json({
    unix: new Date().valueOf(),
    utc: new Date().toUTCString()
  })
})

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
