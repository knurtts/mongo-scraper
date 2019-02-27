var express = require("express");
var exphbs = require("express-handlebars");

var PORT = process.env.PORT || 3000;

var app = express();

var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

require("./routes/routes")(app);

app.listen(PORT, function() {
  console.log("App running on port http://localhost:" + PORT);
});
