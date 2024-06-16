const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {

  res.send("Welcome to the base/home page");
});

app.get("/express", (req, res) => {
  res.send("Made it to the express page");
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});