const express = require("express");
const path = require("path");

const publicDirectory = path.join(__dirname, "../public/");
const app = express();
const port = 3000;

//Config setup
app.use(express.static(publicDirectory));
app.set("view engine", "hbs");

app.get("/weather", (req, res) => {
  res.send("This is weather page");
//   res.render('index'()=>{

//   })
});

app.get("*", (req, res) => {
  res.send("Sorry this page does not exist");
});

app.listen(port, () => {
  console.log("Server is running on port number " + port);
});
