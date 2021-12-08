// import file packages up here
const express = require("express");
const morgan = require("morgan");
const axios = require("axios");

const PORT = 3000;
const app = express();

//declare an empty object that will act as our cache
var cache = {};

//create the route that will filter the git requests by properties and employ middleware

app.get("/", (req, res) => {
    var movieID = req.query.i;
    var movieTitle = encodeURI(req.query.t);
    var movieIDUrl = "http://www.omdbapi.com/?i=" + movieID + "&apikey=";
    var movieTitleUrl =
    "http://www.omdbapi.com/?t=" + movieTitle + "&apikey=";

  //These if statements are describing the two pathways that take place based on the object property

  //movieID is caching the information from the path that is associated with the movie ID property
        if (movieID) {
    if (cache.hasOwnProperty(movieID)) {
      res.json(cache[movieID]);
      console.log("movie ID was sent from the cache!");
    } else {
      axios
        .get(movieIDUrl)
        .then(response => {
          cache[movieID] = response.data;
          res.json(cache[movieID]);
        })
        .catch(error => {
          console.log("ERROR!", error);
        });
      res.status(200);
    }

// movieTitle is caching the information from the path with movie Title property
  } else if (movieTitle) {
    if (cache.hasOwnProperty(movieTitle)) {
      res.json(cache[movieTitle]);
      console.log("movie Title was sent from the cache!");
    } else {
      axios
        .get(movieTitleUrl)
        .then(response => {
          cache[movieTitle] = response.data;
          res.json(cache[movieTitle]);
        })
        .catch(error => {
          console.log("ERROR", error);
        });
      res.status(200);
    }
  }
});

// export the module to be able to use the index.js as a listener.
module.exports = app;
