// A: package.json!

// what command do we run to start an npm project?
// A: npm init

// what does the below chunk of code do?
// A: imports libraries
let fishs;
let fishObject;
let fishArray;

const express = require("express"); // imports express
const multer = require("multer"); // imports multer -- handles file upload
const bodyParser = require("body-parser"); // imports body parser -- allows us to have a body in server request

const cookieParser = require("cookie-parser");

// translates bits and bytes (literal memory and data) to something readable by the server
const urlEncodedParser = bodyParser.urlencoded({ extended: true });

// what is app?
// A: instance of express
const app = express();

// what is this configuring?
// A: destination for where files should be uploaded
const upload = multer({
  dest: "public/uploads",
});

// let database = new nedb({
//   filename: "database.txt",
//   autoload: true,
// });
// let fishcollected = new nedb({
//   filename: "fishcollected.txt",
//   autoload: true,
// });
// let templeResponse = new nedb({
//   filename: "templeResponse.txt",
//   autoload: true,
// });
// what do each of these statements do?
const fs = require("fs");

app.use(express.static("public")); // set the default folder for any static files such as assets, css, html
app.use(urlEncodedParser); // middleware to make sure the bits and bytes can be understood by the app
app.set("view engine", "ejs"); // allows us to use ejs

fs.readFile("public/fishdatabase.json", function (err, data) {
  fishObject = JSON.parse(data);
  fishArray = fishObject.fishes;
});

// what is this?
// A: route that handles when the client makes a request to /
app.get("/", (req, res) => {
  // response.send("server working");

  // what steps do we need in order to use a template ejs file?
  //

  res.render("index.ejs", {});
  // make sure to comment out the res.send() code above
});

app.post("/collectfish", (req, res) => {
  res.redirect("/collect");
});

app.get("/fishingSite", (req, res) => {
  // response.send("server working");
  // what steps do we need in order to use a template ejs file?
  let randomFish = getRandomFish();
  res.render("fishing-site.ejs", { randomFish });
});

function getRandomFish() {
  const randomIndex = Math.floor(Math.random() * fishArray.length);
  let randomFish = fishArray[randomIndex];
  return randomFish;
}

app.get("/random", (req, res) => {
  console.log("accesing random");
  let randomFish = getRandomFish();
  res.json(randomFish);
});

app.get("/collect", (req, res) => {
  res.render("collect.ejs", {});
});

// res.render("collect.ejs", {});
// make sure to comment out the res.send() code above

app.get("/temple", (req, res) => {
  res.render("temple.ejs", {});
});
app.listen(6001, () => {
  console.log("server started on port 6001");
});
// app.listen(5000, function() {

// })
// secret comment for later in the demo:
// @seald-io/nedb

// function foo() {
//   console.log("hello")
// }
// const foo = () => {
//   console.log("hello")
// }
// foo()
