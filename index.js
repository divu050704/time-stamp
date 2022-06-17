// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

//For empty request
app.get("/api/", function (req, res) {
  // Get current date
  const date = new Date();
  res.json({ unix: date.getTime(), utc: date.toUTCString() });
});

//
app.get("/api/:date", (request, response) => {
  
  if (new Date(parseInt(request.params.date)) != "Invalid Date") {
    if (isNaN(request.params.date)) {
      const date = new Date(request.params.date);

      response.json({ unix: date.getTime(), utc: date.toUTCString() });
      return;
    } else {
      const date = new Date(parseInt(request.params.date));
      response.json({ unix: date.getTime(), utc: date.toUTCString() });
    }
  }
  else{
    response.json({error: "Invalid Date"});
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
