// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
let express = require("express");


// Start up an instance of app
let app = express();



/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());


// Initialize the main project folder
app.use(express.static('website'));


// get temperature data
app.post("/temperatureData",
  (req, res) => {
  projectData = req.body;
  console.log(projectData);
  console.log("all done");
  res.send()
});


// send project data
app.get("/ProjectData",
  (req, res) => {
    res.send(projectData);
    console.log("sending data is done");
});

// Setup Server
app.listen(4000, () => console.log("server is runing"));
