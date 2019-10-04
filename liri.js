let apiKey = "";
// let apiSearch = "";
let apiURL = "";
let axiosResponse = {};


// Include dotenv npm package
require("dotenv").config();

// Include node-spotify-api npm package
// pjp let spotify = new Spotify(keys.spotify);
const keys = require("./keys.js");
const Spotify = require("node-spotify-api");
const spotify = new Spotify(keys.spotify);

// Include axios npm package
const axios = require("axios");

// Include moment.js npm package
const moment = require("moment");

// Include fs npm package
const fs = require("fs");

// Include inquirer npm package
const inquirer = require("inquirer");

// Prompt user for what they want to search through LIRI
inquirer.prompt([
    {
        type: "list",
        name: "command",
        message: "Ask LIRI to:",
        choices: ["Concert-this", "Spotify-this-song", "Movie-this", "Do-what-it-says"]
    }
]).then(function(choice) {
    // ojo
    console.log(JSON.stringify(choice));
    console.log(choice.command);

    // apiKey = "";
    // apiSearch = "";
    // apiURL = "";
    // axiosResponse = {};

    switch (choice.command) {
        case "Concert-this":
            concertThis();
            /*
            inquirer.prompt([
                {
                    type: "input",
                    name: "userArtist",
                    message: "What is the name of the artist/band?",
                    filter: function(str) {return str.toUpperCase();}
                }
            ]).then(function(answer) {
                console.log(JSON.stringify(answer));

                apiKey = "codingbootcamp";
                apiSearch = answer.userArtist;
                apiURL = `https://rest.bandsintown.com/artists/${encodeURIComponent(answer.userArtist)}/events?app_id=${apiKey}`;
                console.log("apiURL: " + apiURL);

                concertThis(apiSearch, apiURL);
                /*
                apiKey = "codingbootcamp";
                apiURL = `https://rest.bandsintown.com/artists/${encodeURIComponent(answer.userArtist)}/events?app_id=${apiKey}`;
                console.log("apiURL: " + apiURL);

                // Run a request with axios to the chosen API 
                axios.get(apiURL)
                    .then(function(response) {
                        // ojo
                        console.log(JSON.stringify(response.data));

                        axiosResponse = response.data;
                        // ojo for bandsintown the response.data is an array!!!
                        console.log("axiosResponse.length: " + axiosResponse.length);
                        bandsInTown.artist = answer.userArtist;

                        for (let i = 0; i < axiosResponse.length; i++) {
                            bandsInTown.venues.push({name: axiosResponse[i].venue.name, country: axiosResponse[i].venue.country, city: axiosResponse[i].venue.city, date: moment(axiosResponse[i].datetime).format("MM/DD/YYYY")});
                        }
                        console.log(JSON.stringify(bandsInTown, null, 2));

                        // Append the Bands In Town info to the "log.txt" file
                        fs.appendFile("log.txt", `\n${choice.command}\n` + JSON.stringify(bandsInTown, null, 2), function(err) {
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
            */

            break;
        case "Spotify-this-song":
            spotifyThis();
            break;
        case "Movie-this":
            // ojo
            console.log("case - Moviethis");
            // Default: "Mr. Nobody"
            break;
        case "Do-what-it-says":
            // ojo
            console.log("case - dothis");
            break;
        default:
            // ojo  DO I NEED A DEFAULT?
            console.log("case - default");
            break;
    }



});


// LIRI concert-this command
// function concertThis(artistName, queryURL) {
function concertThis() {
    //console.log("queryURL: " + queryURL);
    let bandsInTown = {
        artist: "",
        venues: []
    };

    apiKey = "";
    // ojo apiSearch = "";
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
        console.log(JSON.stringify(answer));

        apiKey = "codingbootcamp";
        // apiSearch = answer.userArtist;
        apiURL = `https://rest.bandsintown.com/artists/${encodeURIComponent(answer.userArtist)}/events?app_id=${apiKey}`;
        console.log("apiURL: " + apiURL);

        // Run an Axios request from Bands In Town API 
        axios.get(apiURL)
            .then(function(response) {
                // ojo
                console.log(JSON.stringify(response.data));

                axiosResponse = response.data;
                // ojo for bandsintown the response.data is an array!!!
                console.log("axiosResponse.length: " + axiosResponse.length);

                bandsInTown.artist = answer.userArtist;

                for (let i = 0; i < axiosResponse.length; i++) {
                    bandsInTown.venues.push({name: axiosResponse[i].venue.name, country: axiosResponse[i].venue.country, city: axiosResponse[i].venue.city, date: moment(axiosResponse[i].datetime).format("MM/DD/YYYY")});
                }
                console.log(JSON.stringify(bandsInTown, null, 2));

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

// LIRI concert-this command
function spotifyThis(song) {
    /* This will show the following information about the song in your terminal / bash window
    let songArtist =
    let songName =
    let songLink =
    let songAlbum =

    default --> If no song is provided then your program will default to "The Sign" by Ace of Base.
    */

    // Default: "The Sign" by Ace of Base

    let spotifySongs = {
        artist: "",
        venues: []
    };

    apiKey = "";
    // ojo apiSearch = "";
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
        console.log(JSON.stringify(answer, null, 2));

        // spotify.search({type: "track", query: answer.userSong, limit: 5}, function(err, data) {
        //     if (err) {
        //         return console.log('Error occurred: ' + err);
        //     }

        //     console.log(JSON.stringify(data, null, 2));
        // });
        console.log(answer.userSong)

        spotify.search({type: "track", query: answer.userSong, limit: 1})
            .then(function(response) {
                console.log("response: " + JSON.stringify(response.tracks.items[0].artists[0].name, null, 2)); // Artist
                console.log("response: " + JSON.stringify(response.tracks.items[0].name, null, 2)); // Song
                console.log("response: " + JSON.stringify(response.tracks.items[0].preview_url, null, 2)); // Preview URL
                console.log("response: " + JSON.stringify(response.tracks.items[0].album.name, null, 2)); // Album

            })
            .catch(function(err) {
                console.log('Error occurred: ' + err);
            });

        /*
        apiKey = "codingbootcamp";
        // apiSearch = answer.userArtist;
        apiURL = `https://rest.bandsintown.com/artists/${encodeURIComponent(answer.userArtist)}/events?app_id=${apiKey}`;
        console.log("apiURL: " + apiURL);

        // Run an Axios request from Spotify API 
        axios.get(apiURL)
            .then(function(response) {
                // ojo
                console.log(JSON.stringify(response.data));

                axiosResponse = response.data;
                // ojo for bandsintown the response.data is an array!!!
                console.log("axiosResponse.length: " + axiosResponse.length);

                bandsInTown.artist = answer.userArtist;

                for (let i = 0; i < axiosResponse.length; i++) {
                    bandsInTown.venues.push({name: axiosResponse[i].venue.name, country: axiosResponse[i].venue.country, city: axiosResponse[i].venue.city, date: moment(axiosResponse[i].datetime).format("MM/DD/YYYY")});
                }
                console.log(JSON.stringify(bandsInTown, null, 2));

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
        */
    });
}

/* node liri.js movie-this '<movie name here>' */
function movieThis(movie) {

    apiKey = "trilogy";
    apiURL = "";
    console.log("apiURL: " + apiURL);

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
function doThis() {

    /*
    Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

    It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
    Edit the text in random.txt to test out the feature for movie-this and concert-this.
    */
}









