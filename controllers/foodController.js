const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);


// ===============================
// GET FOODS
// ===============================

async function getFoods(req, res) {

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

}


// ===============================
// POST FOOD
// ===============================

async function createFood(req, res) {

  const {
    category_id,
    name,
    region,
    price,
    description
  } = req.body;


  if (
    !category_id ||
    !name ||
    !region ||
    !price ||
    !description
  ) {

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

}


// ===============================
// PUT FOOD
// ===============================

async function updateFood(req, res) {

  const { id } = req.params;

  const {
    category_id,
    name,
    region,
    price,
    description
  } = req.body;


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

}


// ===============================
// DELETE FOOD
// ===============================

async function deleteFood(req, res) {

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

}


module.exports = {
  getFoods,
  createFood,
  updateFood,
  deleteFood
};