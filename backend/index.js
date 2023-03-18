const express = require("express");
const mysql = require("mysql");

const app = express();
const port = 3000;

//connection à la bdd
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test",
});
db.connect(function (err) {
  if (err) throw err;
  console.log("Connecté à la base de données MySQL!");
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, this is the backend!");
});
// Recupération de données dans la base de donnée

app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/books", (req, res) => {
  const q = "INSERT INTO books (`title`, `desc`, `cover`) VALUES (?)";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.cover, 
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("books has been created successfully");
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
