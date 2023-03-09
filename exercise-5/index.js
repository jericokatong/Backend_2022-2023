const express = require("express");
const users = require("./users.js");
const morgan = require("morgan");
const app = express();
const port = 3000;

// middleware untuk log dengan morgan
app.use(morgan("combined"));

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/users/:name", (req, res) => {
  users.forEach((e) => {
    if (req.params.name.toLowerCase() === e.name.toLowerCase()) {
      res.json(e);
    }
  });
  res.json({
    message: "Data user tidak ditemukan",
  });
});

// middleware error handling
const errorHandling = (err, req, res, next) => {
  res.json({
    status: "error",
    message: "terjadi kesalahan pada server",
  });
};

// middleware 404
app.use((req, res, next) => {
  res.json({
    status: "error",
    message: "resource tidak ditemukan",
  });
});

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
