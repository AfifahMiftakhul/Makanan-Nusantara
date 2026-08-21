const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);


// ===============================
// GET CATEGORIES
// ===============================

async function getCategories(req, res) {

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

}


// ===============================
// POST CATEGORY
// ===============================

async function createCategory(req, res) {

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

}


// ===============================
// PUT CATEGORY
// ===============================

async function updateCategory(req, res) {

  const { id } = req.params;

  const { name } = req.body;


  if (!name) {

    return res.status(400).json({
      message: "Nama category wajib diisi"
    });

  }


  const { data, error } = await supabase
    .from("categories")
    .update({
      name
    })
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

}


// ===============================
// DELETE CATEGORY
// ===============================

async function deleteCategory(req, res) {

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

}


module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
};