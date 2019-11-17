#### liri-node-app
Homework 8: LIRI Bot Assignment
---
# LiriBot

### Overview

LiriBot is a text-based Command Line Interface (CLI) that allows users to execute commands for requesting data from the Bands in Town, Spotify or OMDB APIs, and see the results or error messages on the screen.

### Before You Begin

1. LiriBot will search Bands in Town for concerts, Spotify for songs, and OMDB for movies, so you'll need to register or sign up as a developer in order to obtain the proper credentials (i.e. API Keys).

   - Bands in Town
     - Step One: Go to the [BandsInTown API](https://manager.bandsintown.com/support/bandsintown-api)
     - Step Two: Scroll down to the Step-by-Step section and there you can request an API key

   - Spotify
     - Step One: Go to the [Spotify API](https://developer.spotify.com/my-applications/#!/)
     - Step Two: Either login to your existing Spotify account or create a new free one and log in.
     - Step Three: Once logged in, navigate to <https://developer.spotify.com/my-applications/#!/applications/create> to create a new application. Fill out the form. When finished, click the "complete" button.
     - Step Four: On the next screen, scroll down to where you see your client id and client secret. Copy these values down somewhere. You'll need them later in order to use the Spotify API and the [node-spotify-api package](https://www.npmjs.com/package/node-spotify-api).

   - OMDB
     - Step One: Go to the [OMDB API](http://www.omdbapi.com/apikey.aspx)
     - Step Two: Fill out the required information to receive an API key

2. The following Node.js Modules need to be installed before running LiriBot:

   - [DotEnv](https://www.npmjs.com/package/dotenv)
- [Inquirer](https://www.npmjs.com/package/inquirer)
   - [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)
- [Axios](https://www.npmjs.com/package/axios)
   
  - Axios is used to grab data from the [OMDB API](http://www.omdbapi.com) and the [Bands In Town API](http://www.artists.bandsintown.com/bandsintown-api)
   - [Moment](https://www.npmjs.com/package/moment) 

   Below is the line of code that you'll need to use:

    ```
 npm install dotenv inquirer node-spotify-api axios moment
    ```

### What each Command does

LiriBot will display the following menu of commands:

​   ![Demo](https://github.com/gromanbb/liri-node-app/blob/master/demo/liri-menu.png)

1. `node liri.js concert-this <artist/band name here>`

  * This will search the Bands in Town Artist Events API (`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=<Your API key>"`) for an artist and render the following information about each event to the terminal:

     * Name of the venue
     * Venue location
     * Date of the Event (use moment to format this as "MM/DD/YYYY")
     
  ![Demo](https://github.com/gromanbb/liri-node-app/blob/master/demo/liri-concert-this.png)
     
 2.`node liri.js spotify-this-song '<song name here>'`

  * This will show the following information about the song in your terminal/bash window

     * Artist(s)
     * The song's name
     * A preview link of the song from Spotify
     * The album that the song is from

  ![Demo](https://github.com/gromanbb/liri-node-app/blob/master/demo/liri-spotify-this.png)
     
 3. `node liri.js movie-this '<movie name here>'`

  * This will output the following information to your terminal/bash window:

    * Title of the movie.
    * Year the movie came out.
    * IMDB Rating of the movie.
    * Rotten Tomatoes Rating of the movie.
    * Country where the movie was produced.
    * Language of the movie.
    * Plot of the movie.
    * Actors in the movie.

4. `node liri.js do-what-it-says`

  * LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

    * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
     







