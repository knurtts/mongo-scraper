const db = require("../models");
const axios = require("axios");
const cheerio = require("cheerio");


module.exports = function(app) {
  app.get("/scrape", function(req, res) {
    //put the scrapper here which will run everytime the page loads
    axios.get("https://www.pcgamer.com/news/").then(function(response) {
      var $ = cheerio.load(response.data);

      $(".listingResults.news .listingResult").each(function(i, element) {
        var result = {};
        result.headline = $(this).find("h3").text();
        result.summary = $(this).find(".synopsis").text().replace(/(\r\n|\n|\r)/gm, " ");
        result.link = $(this).children("a").attr("href");
        // result.note = "";
        
        db.Article.create(result, {unique: true}).then(function(dbArticle) {
          console.log(dbArticle);
        }).catch(function(err) {
          console.log("ERROR");
          
          console.log(err);  
        });        
      });
    });
    res.send("Tada!");
  });

  app.get("/articles/", function (req, res) {
    //get all articles from the database
    db.Article.find({}).then(function(data) {
      res.json(data);
    }).catch(function(err) {
      console.log("Error getting all articles:");
      console.log(err);
    });
  });

  app.get("/postnote/:id", function (req, res) {
    //get an article by _id and populate its note
    db.Article.findOne({_id: req.params.id})
      .populate("note")
      .then(function(dbArticle) {
        res.json(dbArticle);
      }).catch(function(err) {
        console.log(err);
      })
  });

  app.post("/postnote/:id", function (req, res) {
    //saving/updating an article's note
    db.Note.create(req.body)
      .then(function(dbNote) {
        // let data = {};
      return db.Article.findOneAndUpdate({id: req.params.id}, {$set: {note: dbNote._id}}, {new: true})
      .then(function(dbArticle) {
        // res.send(dbArticle);
        res.json(dbArticle);
      }).catch(function(err) {
        console.log("Error with updating a note:");
        console.log(err);
      });
    })
  });

  app.put("/postnote/:id", function (req, res) {
    //saving/updating an article's note
    db.Note.create(req.body)
      .then(function(dbNote) {
        // let data = {};
      return db.Article.findOneAndUpdate({id: req.params.id}, {$set: {note: dbNote._id}}, {new: true})
      .then(function(dbArticle) {
        // res.send(dbArticle);
        res.json(dbArticle);
      }).catch(function(err) {
        console.log("Error with updating a note:");
        console.log(err);
      });
    })
  });


};