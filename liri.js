require("dotenv").config();
const keys = require("./keys.js");
const fs = require("fs");
const request = require("request");

const Twitter = require("twitter");
const client = new Twitter(keys.twitter);
const Spotify = require("node-spotify-api");
const spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var inputArray = [];
for(var i = 3; i < process.argv.length; i++){
    inputArray.push(process.argv[i]);
}
var argString = inputArray.join(" ");

function myTweets() {
    client.get('statuses/user_timeline', { screen_name: "TyPhyter" }, function (error, tweets, response) {
        
        if (error) { return console.log(error); }

        for(var i = 0; i < 20; i++){
            console.log(`tweet: ${tweets[i].text}`);
            console.log(`created@: ${tweets[i].created_at}\n`);
        }
    });
}

function spotifyThis(str) {
    let searchString = str || "The Sign Ace of Base";
    spotify.search({ type: 'track', query: searchString }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        let song = data.tracks.items[0];
        let artistsArr = [];
        for(artist in song.artists){
            artistsArr.push(song.artists[artist].name);
        }
        console.log(`\nArtist(s): ${artistsArr.join(', ')}`);
        console.log(`Name: ${song.name}`);
        console.log(`Preview: ${song.preview_url}`);
        console.log(`Album: ${song.album.name}`);
        console.log(`Released: ${song.album.release_date}`)
    });
}

function movieThis(str) {
    let string = str || "Mr. Nobody";
    let url = `http://www.omdbapi.com/?t=${string.split(" ").join("+")}&y=&plot=short&apikey=trilogy`
    request(url, function (error, response, body) {
        if (error) { return console.log(error); }

        if (!error && response.statusCode === 200) {
            let data = JSON.parse(body);
            //console.log(data);
            console.log(`\nTitle: ${data.Title}`);
            console.log(`Released: ${data.Year}`);
            console.log(`IMDB Rating: ${data.Ratings[0].Value}`);
            console.log(`RT Rating: ${data.Ratings[1].Value}`);
            console.log(`Country: ${data.Country}`);
            console.log(`Language: ${data.Language}`);
            console.log(`Plot: ${data.Plot}`);
            console.log(`Actors: ${data.Actors}`);
        }
    });
}

function doIt() {
    fs.readFile("./random.txt", "utf8", function (err, data) {

        if (err) { return console.log(err); }

        //do some stuff with data
        let com = data.split(",")[0];
        let arg = data.split(",")[1];
        runCommand(com, arg);
    });
}


function runCommand(command, argString) {
    switch (command) {

        case "my-tweets":
            myTweets();
            break;

        case "spotify-this-song":
            spotifyThis(argString);
            break;

        case "movie-this":
            movieThis(argString);
            break;

        case "do-what-it-says":
            doIt();
            break;

        default:
            console.log("Unrecognized command, nerd");
    }
}

//TO DO: run inquirer prompt if no command input
runCommand(command, argString);