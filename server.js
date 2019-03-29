const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser"); //req.body validate
const passport = require("passport"); //express.authetication
const path = require("path"); //node.path

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
//const logger = require("morgan");

const app = express();

//text to json oject for post
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//config
const db = require("./config/keys").mongoURI;

//database driver
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Clusters Connected - US-Central"))
  .catch(err => console.log(err));

//passport initialize
app.use(passport.initialize());

//passport config file
require("./config/passport")(passport);

//routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

//global variable.NODE_ENV - environment
if (process.env.NODE_ENV === "production") {
  //express.static for production
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.get("/", (req, res) => res.send("Server running on port 5000"));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
