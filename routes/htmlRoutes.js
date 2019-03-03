const db = require("../models");
const axios = require("axios");


module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Article.find({}).then(function(dbArticles) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbArticles
      });
    });
  });


  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
