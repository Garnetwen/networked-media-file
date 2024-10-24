const express = require("express");
const parser = require("body-parser");
const multer = require("multer");
const encodedParser = parser.urlencoded({ extended: true });
const uploadProcessor = multer({ dest: "public/upload" });
// initialize express
const app = express();

// initialize public folder for assets
app.use(express.static("public"));
// initialize body parser with the app
app.use(encodedParser);

// initialize template engine to look at views folder for rendering
app.set("view engine", "ejs");

// TODO INCLASS: SET UP ROUTES!
app.get("/", (req, res) => {
  res.render("index.ejs", {});
});
app.get("/posts", (req, res) => {
  res.render("posts.ejs", {});
});
app.get("/podium", (req, res) => {
  res.render("podium.ejs", {});
});
app.get("/helpsite", (req, res) => {
  res.render("helpsite.ejs", {});
});
app.get("/about", (req, res) => {
  res.render("about.ejs", {});
});

// render the post page
app.get("/artsite", (req, res) => {
  // pass data that contains all of the posts in the server
  // to the posts page
  let dataContainer = {
    arrayToBeSent: data,
  };

  res.render("art.ejs", dataContainer);
});
app.get("/map", (req, res) => {
  res.render("map.ejs", {});
});
let notes = [];
app.post("/map", (req, res) => {
  console.log(req.query.user);
  res.send("thank you for submitting " + req.query.user);
  notes.push({
    username: req.query.user,
    message: req.query.note,
  });
});
app.get("/map", (req, res) => {
  let allnotes = "";

  for (let i = 0; i < notes.length; i++) {
    allnotes += note[i].username + " says " + note[i].message + "<br />";
  }
  res.send(allnotes);
});

// array that stores all of the data on the server
let data = [];
let postNum = 0;

// new route to handle uploaded data
app.post("/upload", uploadProcessor.single("theimage"), (req, res) => {
  let now = new Date();

  // message object that holds the data from the form
  let message = {
    text: req.body.text,
    date: now.toLocaleString(),
    postNumber: postNum,
  };

  // checks to see if a file has been uplaoded
  if (req.file) {
    message.imgSrc = "upload/" + req.file.filename;
  }

  postNum++;

  // adding the most recent message to the top of the array
  data.unshift(message);

  res.redirect("/artsite");
});

app.get("/delete", (req, res) => {
  // splice
  // removes an element based on its index
  // second param of how many things to remove
  // data.splice(req.query.postId, 1)
  // console.log(req.query.postId)
  data.forEach((d) => {
    // console.log(d.postNumber);
    // console.log(req.query.postId);
    if (d.postNumber == req.query.postId) {
      data.splice(req.query.postId, 1);
    }
  });

  res.redirect("/artsite");
});

// setting up the server to start
// LAST PIECE OF CODE
// for projects going forward, it CANNOT be 80
app.listen(3333, () => {
  console.log("server starts on 3333");
});
