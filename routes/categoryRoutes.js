const express = require("express");

const router = express.Router();

const verifyToken =
  require("../middleware/authMiddleware");

const {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
} = require("../controllers/categoryController");


// GET CATEGORY
// Bisa diakses customer/admin
router.get(
  "/categories",
  getCategories
);


// POST CATEGORY
router.post(
  "/categories",
  verifyToken,
  createCategory
);


// PUT CATEGORY
router.put(
  "/categories/:id",
  verifyToken,
  updateCategory
);


// DELETE CATEGORY
router.delete(
  "/categories/:id",
  verifyToken,
  deleteCategory
);


module.exports = router;