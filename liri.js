// Include inquirer npm package
const inquirer = require("inquirer");

// Include fs npm package
const fs = require("fs");

// Include dotenv npm package
require("dotenv").config();

// Include node-spotify-api npm package
const keys = require("./keys.js");
const Spotify = require("node-spotify-api");
const spotify = new Spotify(keys.spotify);

// Include axios npm package
const axios = require("axios");

// Include moment.js npm package
const moment = require("moment");

let apiKey = "";
let apiURL = "";
let axiosResponse = {};
let i = 0;


// Prompt user for what they want to search through LIRI
inquirer.prompt([
  {
    type: "list",
    name: "command",
    message: "Ask LIRI to:",
    choices: ["Concert-this", "Spotify-this-song", "Movie-this", "Do-what-it-says", "Exit"]
  }
]).then(function(choice) {
  switch (choice.command) {
    case "Concert-this":
      concertThis();
      break;
    case "Spotify-this-song":
      spotifyThis();
      break;
    case "Movie-this":
      // movieThis();
      break;
    case "Do-what-it-says":
      // doWhatItSays();
      break;
    case "Exit":
      break;
  }
});

// LIRI Concert-this command
function concertThis() {
  let bandsInTown = {
    artist: "",
    venues: []
  };
  let str = "";

  apiKey = "";
  apiURL = "";
  axiosResponse = {};

  // Prompt user for the name of the artist/band
  inquirer.prompt([
    {
      type: "input",
      name: "userArtist",
      message: "What is the name of the artist/band?",
      filter: function(str) {return str.toUpperCase();}
    }
  ]).then(function(answer) {

    apiKey = "codingbootcamp";
    apiSearch = answer.userArtist;
    apiURL = `https://rest.bandsintown.com/artists/${encodeURIComponent(apiSearch)}/events?app_id=${apiKey}`;

    // Run Axios request from Bands In Town API
    axios.get(apiURL)
      .then(function(response) {
        axiosResponse = response.data;

        bandsInTown.artist = answer.userArtist;

        for (i = 0; i < axiosResponse.length; i++) {
          bandsInTown.venues.push({name: axiosResponse[i].venue.name, country: axiosResponse[i].venue.country, city: axiosResponse[i].venue.city, date: moment(axiosResponse[i].datetime).format("MM/DD/YYYY")});
        }

        console.table(bandsInTown.venues, ["name", "country", "city", "date"]);

        // Append the Bands In Town info to the "log.txt" file
        fs.appendFile("log.txt", `\nConcert-this:\n` + JSON.stringify(bandsInTown, null, 2), function(err) {
          // If an error was experienced we will log it.
          if (err) {
            console.log(err);
          }
        });
      })
      .catch(function(error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log("---------------Data---------------");
          console.log(error.response.data);
          console.log("---------------Status---------------");
          console.log(error.response.status);
          console.log("---------------Status---------------");
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an object that comes back with details pertaining to the error that occurred.
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  });
}

// LIRI Spotify-this-song command
function spotifyThis() {
  // Default: If no song is provided then your program will default to "The Sign" by Ace of Base.

  let spotifySongs = [];
  let str = "";

  apiKey = "";
  apiURL = "";
  axiosResponse = {};

  // Prompt user for the name of the artist/band
  inquirer.prompt([
    {
      type: "input",
      name: "userSong",
      message: "What is the name of the song?",
      filter: function(str) {return str.toUpperCase();}
    }
  ]).then(function(answer) {
    if (answer.userSong === null || typeof answer.userSong === "undefined" ) {
      answer.userSong = "The Sign";
    }

    spotify.search({type: "track", query: answer.userSong})
      .then(function(response) {
        axiosResponse = response.tracks.items;

        for (i = 0; i < axiosResponse.length; i++) {
          spotifySongs.push({artist: axiosResponse[i].artists[0].name, name: axiosResponse[i].name, link: axiosResponse[i].preview_url, album: axiosResponse[i].album.name}) 
        }

        console.table(spotifySongs, ["artist", "name"]);

        // Append the Spotify's Song info to the "log.txt" file
        fs.appendFile("log.txt", `\nSpotify-this-song:\n` + JSON.stringify(spotifySongs, null, 2), function(err) {
          // If an error was experienced we will log it.
          if (err) {
            console.log(err);
          }
        });
      })
      .catch(function(err) {
        console.log('Error occurred: ' + err);
      });
  });
}

/* node liri.js movie-this '<movie name here>' */
// LIRI Movie-this command
function movieThis() {

  apiKey = "trilogy";
  apiURL = "";
  //console.log("apiURL: " + apiURL);

  /*
  let movieTitle =
  let movieYear =
  let movieRating =
  let movieRottenTomatoesRating =
  let movieCountry =
  let movieLanguage =
  let moviePlot =
  let movieActors =

  default --> If the user doesn't type a movie in, the program will output data for the movie 'Mr.Nobody.'

  If you haven't watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/
  It's on Netflix!
  */



}

/* node liri.js do-what-it-says */
// LIRI Do-what-it-says command
function doWhatItSays() {

  /*
  Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

  It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
  Edit the text in random.txt to test out the feature for movie-this and concert-this.
  */


}




