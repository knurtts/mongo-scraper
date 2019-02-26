var express = require("express");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../models");

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/mongoHeadlines", { useNewUrlParser: true });

app.get("/", function(req, res) {
    //put the scrapper here which will run everytime the page loads
    axios.get("https://www.pcgamer.com/news/").then(function(response) {
        var $ = cheerio.load(response.data);

        console.log(response.data);
        $(".listingResults .listingResult").each(function(i, element) {
            var result = {};


        })
    })
});

app.get("/articles/:id", function(req, res) {
    //get all articles from the database
});

app.post("/postnote/:id", function(req, res) {
    //post a new note to an article using the article's id
});

