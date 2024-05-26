// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

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

app.get("/api/:date", (req, res)=> {
  date = req.params.date
  
  unix = /^\d+$/.test(date) ? true : false

  if (unix) {
    const timestamp = Number(date); // Convertir la cadena a número
    const fecha = new Date(timestamp); // Convertir segundos a milisegundos
  
    return res.json({
      unix: timestamp,
      utc: fecha.toUTCString()
    });
  }

  fecha = new Date(date)
  res.json(
    {
      unix: `${fecha.getTime()}`,
      utc: `${fecha.toUTCString()}`
      //"utc":"Fri, 25 Dec 2015 00:00:00 GMT"}
})
})



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
