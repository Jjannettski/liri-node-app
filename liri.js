var keys = require("./keys.js");
var request = require("request");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var fs = require("fs");


if((process.argv[2]=== "movie-this") && (process.argv[3]!=undefined)) {
  var movieName = process.argv.slice(3,40);
  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";
  console.log(queryUrl);

request(queryUrl, function(error, response,body){
  if(!error && response.statusCode ===200){
    console.log("Title: " + JSON.parse(body).Title);
    console.log("Release Year: " + JSON.parse(body).Year);
    console.log("Imdb Rating: " + JSON.parse(body).imdbRating);
    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
    console.log("Country of Origin: " + JSON.parse(body).Country);
    console.log("Language: " + JSON.parse(body).Language);
    console.log("Plot of the Movie: " + JSON.parse(body).Plot);
    console.log("Cast and Crew: " + JSON.parse(body).Actors);
  }
});
}else{
  var givenMovieName = "Mr. Nobody";
  var movieQueryUrl = "http://www.omdbapi.com/?t=" + givenMovieName + "&y=&plot=short&apikey=40e9cece";
  request(movieQueryUrl, function(error, response,body){
    if(!error && response.statusCode ===200){
      console.log("Title: " + JSON.parse(body).Title);
      console.log("Release Year: " + JSON.parse(body).Year);
      console.log("Imdb Rating: " + JSON.parse(body).imdbRating);
      console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
      console.log("Country of Origin: " + JSON.parse(body).Country);
      console.log("Language: " + JSON.parse(body).Language);
      console.log("Plot of the Movie: " + JSON.parse(body).Plot);
      console.log("Cast and Crew: " + JSON.parse(body).Actors);
    }
  });
}

var client = new Twitter(keys.twitterKeys);
console.log(keys.twitterKeys.consumer_key);
var params = {
  screen_name: '@jjannettski', 
  count : 20,
};

if(process.argv[2]==="my-tweets"){

  var i;

client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    for( i= 0; i < tweets.length; i++){
      console.log(tweets[i].text);
      console.log(tweets[i].created_at);
    }
  }
});
}

var spotifyObject = new Spotify(keys.spotifyKeys);
console.log("We're getting somewhere maybe????");

if(process.argv[2] === "spotify-this-song"){

    var spotifyQuery = process.argv.slice(3,40);

  var queryUrl2 = "https://api.spotify.com/v1/tracks/" + spotifyQuery;
  
  console.log(queryUrl2);
    spotifyObject.search({ type: 'track', query: spotifyQuery}, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
        console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
        console.log("Song Name: " + spotifyQuery);
        console.log("Preview Link: " + data.tracks.items[0].preview_url);
        console.log("Album: " + data.tracks.items[0].album.name);
      });

}

if(process.argv[2]==="do-what-it-says"){
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }
    var output = data.split(",");
      console.log(output[0]);
      console.log(output[1]);
      var command = output[0];
      var trackName = output[1];
    
      console.log(command + trackName);

        var spotifyQuery = trackName;
        var queryUrl2 = "https://api.spotify.com/v1/tracks/" + spotifyQuery;
        
        console.log(queryUrl2);
          spotifyObject.search({ type: 'track', query: spotifyQuery}, function(err, data) {
              if (err) {
                return console.log('Error occurred: ' + err);
              }
             
              console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
              console.log("Song Name: " + spotifyQuery);
              console.log("Preview Link: " + data.tracks.items[0].preview_url);
              console.log("Album: " + data.tracks.items[0].album.name);
            });
      
      })}