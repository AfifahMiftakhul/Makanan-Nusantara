require("dotenv").config();

const express = require("express");

const authRoutes =
  require("./routes/authRoutes");

const foodRoutes =
  require("./routes/foodRoutes");

const categoryRoutes =
  require("./routes/categoryRoutes");


const app = express();


// ===============================
// MIDDLEWARE
// ===============================

app.use(express.json());

app.use(
  express.static("public")
);


// ===============================
// ROUTES API
// ===============================

app.use(authRoutes);

app.use(foodRoutes);

app.use(categoryRoutes);


// ===============================
// HALAMAN UTAMA
// ===============================

app.get("/", (req, res) => {

  res.sendFile(
    __dirname + "/public/index.html"
  );

});


// ===============================
// HALAMAN LOGIN
// ===============================

app.get("/login", (req, res) => {

  res.sendFile(
    __dirname + "/public/login.html"
  );

});


// ===============================
// HALAMAN DASHBOARD
// ===============================

app.get("/dashboard", (req, res) => {

  res.sendFile(
    __dirname + "/public/dashboard.html"
  );

});


// ===============================
// SERVER
// ===============================

const PORT =
  process.env.PORT || 3000;


app.listen(PORT, () => {

  console.log(
    `Server berjalan di http://localhost:${PORT}`
  );

});