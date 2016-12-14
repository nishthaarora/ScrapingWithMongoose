var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.
var mongoose = require("mongoose");
// importing API routes
var apiRoutes = require('./routes/api-routes');
// Scrapes our HTML
var cheerio = require("cheerio");
var Promise = require("bluebird");
// requiring model
var Article = require('./models/Article');
var Note = require('./models/Note');

mongoose.promise = Promise;
app.use(bodyParser.urlencoded({
  extended: false
}));

// Static file support with public folder
app.use(express.static("public"));
app.use('/', apiRoutes);

// mongoose.connect('mongodb://localhost/scrapingWithMongoose');
mongoose.connect(' mongodb://heroku_7xq2fkkm:eo8vl6utpntev2cnd5f1n792om@ds133338.mlab.com:33338/heroku_7xq2fkkm');
var db = mongoose.connection
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});
// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});



app.listen(process.env.PORT || 3000, function() {
	console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});