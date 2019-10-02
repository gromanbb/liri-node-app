// Dotenv node package
var dotenv = require("dotenv");
// ojo
console.log("dotenv: " + dotenv.config().parsed);

// Node-spotify-api node package
var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);
var spotify = keys.spotify;
// ojo
console.log("spotify id: " + spotify.id + "; spotify key: " + spotify.secret);

// Axios node package
const axios = require("axios");
// ojo
console.log("axios: " + axios);

// Moment.js none package
var moment = require("moment");
//moment().format();
// ojo
console.log("moment(): " + moment);

// FS code node package for reading and writing files
var fs = require("fs");
// ojo
console.log("fs: " + fs);

// Inquirer node package for handling user input
var inquirer = require("inquirer");
inquirer
	.prompt([
		/* Pass your questions in here */
	])
	.then(answers =>
	{
		// Use user feedback for... whatever!!
	});

/*  node liri.js concert-this <artist/band name here> */
function concert_this (artist)
{
	var apiKey = "codingbootcamp";
	var apiURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=" + apiKey;
	console.log("apiURL: " + apiURL);

	/*
		// Run the axios.get function...
		// The axios.get function takes in a URL and returns a promise (just like $.ajax)
		axios
		.get("https://en.wikipedia.org/wiki/Kudos_(granola_bar)")
		.then(function(response) {
		// If the axios was successful...
		// Then log the body from the site!
		console.log(response.data);
		})
		.catch(function(error) {
		if (error.response) {
			// The request was made and the server responded with a status code
			// that falls out of the range of 2xx
			console.log(error.response.data);
			console.log(error.response.status);
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
	
		// var venueName =
		// var venueLocation = 
		// var eventDate =
	
		// Date of the Event (use moment to format this as "MM/DD/YYYY")
		// moment().format();
	
		// Important: There is no need to sign up for a Bands in Town api_id key. Use the codingbootcamp as your app_id.
		//   For example, the URL used to search for "Celine Dion" would look like the following:
		//   https://rest.bandsintown.com/artists/celine+dion/events?app_id=codingbootcamp
	*/

}

/* node liri.js spotify-this-song '<song name here>' */
function spotify_this_song (song)
{
	var apiKey = "";

	/* This will show the following information about the song in your terminal / bash window
	var songArtist =
	var songName =
	var songLink =
	var songAlbum =

	default --> If no song is provided then your program will default to "The Sign" by Ace of Base.
	*/

}

/* node liri.js movie-this '<movie name here>' */
function movie_this (movie)
{

	var apiKey = "trilogy";
	var apiURL = "";
	console.log("apiURL: " + apiURL);

	/*
	var movieTitle =
	var movieYear = 
	var movieRating = 
	var movieRottenTomatoesRating = 
	var movieCountry = 
	var movieLanguage = 
	var moviePlot = 
	var movieActors = 

	default --> If the user doesn't type a movie in, the program will output data for the movie 'Mr.Nobody.'

	If you haven't watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/
	It's on Netflix!
	*/

}

/* node liri.js do-what-it-says */
function do_what_it_says ()
{

	/*
	Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

	It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
	Edit the text in random.txt to test out the feature for movie-this and concert-this.
	*/
}









