const db = require("../models");
const axios = require("axios");
const cheerio = require("cheerio");


module.exports = function(app) {
  app.get("/scrape", function(req, res) {
    //put the scrapper here which will run everytime the page loads
    axios.get("https://nerd-news.com/category/video-games/").then(function(response) {
      var $ = cheerio.load(response.data);
      // console.log(response.data);
      $(".small-12.medium-8.columns .row .medium-8.columns").each(function(i, element) {
        var result = {};
        result.headline = $(this).children("h5").text();
        // result.summary = $(this).children(".synopsis").text();
        // result.link = $(this).children("a").attr("href");
        console.log(result);
        
      });
    });
  });

  app.get("/articles/:id", function (req, res) {
    //get all articles from the database
  });

  app.post("/postnote/:id", function (req, res) {
    //post a new note to an article using the article's id
  });
};