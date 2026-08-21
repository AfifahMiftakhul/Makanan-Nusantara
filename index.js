require("dotenv").config();

const express = require("express");
const { createClient } = require("@supabase/supabase-js");

const app = express();

app.use(express.json());
app.use(express.static("public"));

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// ===============================
// LOGIN ADMIN
// ===============================

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "admin123") {
    return res.json({
      success: true,
      message: "Login berhasil",
      redirect: "/dashboard"
    });
  }

  res.status(401).json({
    success: false,
    message: "Username atau password salah"
  });
});

// GET semua foods
app.get("/foods", async (req, res) => {
  const { data, error } = await supabase
    .from("foods")
    .select("*");

  if (error) {
    return res.status(500).json({
      message: "Gagal mengambil data foods",
      error: error.message
    });
  }

  res.json(data);
});

// POST tambah food
app.post("/foods", async (req, res) => {
  const { category_id, name, region, price, description } = req.body;

  if (!category_id || !name || !region || !price || !description) {
    return res.status(400).json({
      message: "Semua data food wajib diisi"
    });
  }

  const { data, error } = await supabase
    .from("foods")
    .insert([
      {
        category_id,
        name,
        region,
        price,
        description
      }
    ])
    .select();

  if (error) {
    return res.status(500).json({
      message: "Gagal menambahkan food",
      error: error.message
    });
  }

  res.status(201).json({
    message: "Food berhasil ditambahkan",
    data
  });
});

// PUT update food
app.put("/foods/:id", async (req, res) => {
  const { id } = req.params;
  const { category_id, name, region, price, description } = req.body;

  const { data, error } = await supabase
    .from("foods")
    .update({
      category_id,
      name,
      region,
      price,
      description
    })
    .eq("id", id)
    .select();

  if (error) {
    return res.status(500).json({
      message: "Gagal mengupdate food",
      error: error.message
    });
  }

  if (!data || data.length === 0) {
    return res.status(404).json({
      message: "Food tidak ditemukan"
    });
  }

  res.json({
    message: "Food berhasil diupdate",
    data
  });
});

// DELETE food
app.delete("/foods/:id", async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from("foods")
    .delete()
    .eq("id", id)
    .select();

  if (error) {
    return res.status(500).json({
      message: "Gagal menghapus food",
      error: error.message
    });
  }

  if (!data || data.length === 0) {
    return res.status(404).json({
      message: "Food tidak ditemukan"
    });
  }

  res.json({
    message: "Food berhasil dihapus",
    data
  });
});

// GET semua categories
app.get("/categories", async (req, res) => {
  const { data, error } = await supabase
    .from("categories")
    .select("*");

  if (error) {
    return res.status(500).json({
      message: "Gagal mengambil data categories",
      error: error.message
    });
  }

  res.json(data);
});

// POST tambah category
app.post("/categories", async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      message: "Nama category wajib diisi"
    });
  }

  const { data, error } = await supabase
    .from("categories")
    .insert([
      {
        name
      }
    ])
    .select();

  if (error) {
    return res.status(500).json({
      message: "Gagal menambahkan category",
      error: error.message
    });
  }

  res.status(201).json({
    message: "Category berhasil ditambahkan",
    data
  });
});

// PUT update category
app.put("/categories/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      message: "Nama category wajib diisi"
    });
  }

  const { data, error } = await supabase
    .from("categories")
    .update({ name })
    .eq("id", id)
    .select();

  if (error) {
    return res.status(500).json({
      message: "Gagal mengupdate category",
      error: error.message
    });
  }

  if (!data || data.length === 0) {
    return res.status(404).json({
      message: "Category tidak ditemukan"
    });
  }

  res.json({
    message: "Category berhasil diupdate",
    data
  });
});

// DELETE category
app.delete("/categories/:id", async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from("categories")
    .delete()
    .eq("id", id)
    .select();

  if (error) {
    return res.status(500).json({
      message: "Gagal menghapus category",
      error: error.message
    });
  }

  if (!data || data.length === 0) {
    return res.status(404).json({
      message: "Category tidak ditemukan"
    });
  }

  res.json({
    message: "Category berhasil dihapus",
    data
  });
});

const PORT = process.env.PORT || 3000;

// Halaman utama
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// Halaman login admin
app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/public/login.html");
});

// Halaman dashboard
app.get("/dashboard", (req, res) => {
  res.sendFile(__dirname + "/public/dashboard.html");
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});