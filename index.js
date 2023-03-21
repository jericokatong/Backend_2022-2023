const dataMember = require("./members.js");
const dataUsers = require("./users.js");
const moment = require("moment");
const express = require("express");
const app = express();
const port = 3000;

const log = (req, res, next) => {
  console.log(`${moment().format()} - ${req.ip} = ${req.originalUrl}`);
};

app.use(log);

app.get("/", (req, res) => {
  res.setHeader("content-type", "text/plain");
  res.send("This is the home page");
});

app.get("/about", (req, res) => {
  res.setHeader("content-type", "text/json");
  res.json({
    status: "success",
    message: "response success",
    description: "Exercise #03",
    date: moment().format(),
    data: dataMember,
  });
});

app.get("/users", (req, res) => {
  res.setHeader("content-type", "text/json");
  res.json(dataUsers);
});

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
