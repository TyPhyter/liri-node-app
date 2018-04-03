require("dotenv").config();
const keys = require("./keys.js");
const fs = require("fs");

const Twitter = require("twitter");
const client = new Twitter(keys.twitter);
const Spotify = require("node-spotify-api");
const spotify = new Spotify(keys.spotify);


//saving initial, plan to repeat input loop after all base requirements completed
var initialCommand = process.argv[2];
var initialArg = process.argv[3];

function myTweets() {
    client.get('statuses/user_timeline', { screen_name: "TyPhyter" }, function (error, tweets, response) {
        if (error) { return console.log(error); }
        console.log(tweets);
        //console.log(response);  // Raw response object. 
    });
}

function spotifyThis(searchString) {
    spotify.search({ type: 'track', query: searchString }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log(data.tracks.items[0]);
    });
}

function movieThis(searchString) {
    request();
}

function doIt() {
    fs.readFile("./test.txt", "utf8", function (err, data) {

        if (err) { return console.log(err); }

        //do some stuff with data
        let com = data.split(" ")[0];
        let arg = data.split(" ")[1];
        runCommand(com, arg);
    });
}


function runCommand(command, args) {
    switch (command) {

        case "my-tweets":
            myTweets();
            break;

        case "spotify-this-song":
            spotifyThis(initialArg);
            break;

        case "movie-this":
            movieThis(initialArg);
            break;

        case "do-what-it-says":
            doIt();
            break;

        default:
            console.log("Unrecognized command, nerd");
    }
}

runCommand(initialCommand);