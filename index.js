const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
const port = 3000;

const users = require("./users.js");
const upload = multer({ dest: "public/" });

// middleware untuk log dengan morgan
app.use(morgan("combined"));

// body parser untuk urlencoded dan json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// middleware untuk file statik pada folder public
app.use(express.static(path.join(__dirname, "public")));

// cors
app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// endpoint list data user
app.get("/users", (req, res) => {
  res.json({ users });
});

// endpoint beri data user sesuai permintaan nama
app.get("/users/:name", (req, res) => {
  const hasil = users.filter((e) => {
    if (e.name.toLocaleLowerCase() === req.params.name.toLocaleLowerCase()) {
      return e;
    }
  });

  res.json(hasil == "" ? { message: "Data user tidak ditemukan" } : { hasil });
});

// endpoint untuk tambah record baru pada users tetapi hanya bersifat sementara
// kalau server di restart maka perubahan yang dilakukan akan hilang karena file users.js asli tidak diubah
app.post("/users", (req, res) => {
  const { id, name } = req.body;
  if (id == "" && name == "") {
    res.json({ message: "Masukkan data yang akan diubah" });
  } else {
    users.push({
      id: req.body.id,
      name: req.body.name,
    });
    res.json(users);
  }
});

// endpoint untuk upload single file gambar dengan key untuk req body yaitu 'file'
app.post("/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  if (file) {
    let target = path.join(__dirname, "/public", file.originalname);
    console.log(target);
    fs.renameSync(file.path, target);
    res.send("file berhasil di-upload");
  } else {
    res.send("file gagal di-upload");
  }
});

// endpoint untuk melakukan edit pada data yang dipilih dengan parameter nama
app.put("/users/:name", (req, res) => {
  if (req.body.name == "") {
    res.json({ message: "error, tidak memasukkan data pada request body" });
  }
  users.forEach((e) => {
    if (req.params.name.toLocaleLowerCase() == e.name.toLocaleLowerCase()) {
      e.name = req.body.name;
      res.json(e);
    }
  });
  res.json({ message: "tidak menemukan nama yang sesuai" });
});

// endpoint untuk hapus data dengan parameter nama
app.delete("/users/:name", (req, res) => {
  users.forEach((e, i) => {
    if (req.params.name.toLocaleLowerCase() == e.name.toLocaleLowerCase()) {
      users.splice(i, 1);
      res.json(users);
    }
  });
  res.json({ message: "tidak menemukan nama yang sesuai" });
});

// middleware 404
app.use((req, res, next) => {
  res.json({
    status: "error",
    message: "resource tidak ditemukan",
  });
});

// middleware error handling
const errorHandling = (err, req, res, next) => {
  res.json({
    status: "error",
    message: "terjadi kesalahan pada server",
  });
};
app.use(errorHandling);

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
