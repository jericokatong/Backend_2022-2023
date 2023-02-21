// const http = require("http");
// const dataMember = require("./members.js");
// const dataUsers = require("./users.js");
// const moment = require("moment");

// const server = http.createServer((req, res) => {
//   const url = req.url;
//   res.statusCode = 200;

//   if (url === "/") {
//     res.setHeader("content-type", "text/plain");
//     res.write("This is the home page");
//   } else if (url === "/about") {
//     res.setHeader("content-type", "text/json");
//     res.write(
//       JSON.stringify({
//         status: "success",
//         message: "response success",
//         description: "Exercise #03",
//         date: moment().format(),
//         data: dataMember,
//       })
//     );
//   } else if (url === "/users") {
//     res.setHeader("content-type", "text/json");
//     res.write(JSON.stringify(dataUsers));
//   }
//   res.end();
// });

// const hostname = "127.0.0.1";
// const port = 3000;
// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });

const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  // res.setHeader("content-type", "text/plain");
  res.write("This is the home page");
});

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
