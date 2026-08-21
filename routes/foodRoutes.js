const express = require("express");

const router = express.Router();

const verifyToken =
  require("../middleware/authMiddleware");

const {
  getFoods,
  createFood,
  updateFood,
  deleteFood
} = require("../controllers/foodController");


// GET FOODS
// Customer boleh melihat
router.get("/foods", getFoods);


// POST FOOD
// Admin
router.post(
  "/foods",
  verifyToken,
  createFood
);


// PUT FOOD
// Admin
router.put(
  "/foods/:id",
  verifyToken,
  updateFood
);


// DELETE FOOD
// Admin
router.delete(
  "/foods/:id",
  verifyToken,
  deleteFood
);


module.exports = router;