const jwt = require("jsonwebtoken");

function login(req, res) {

  const { username, password } = req.body;

  if (username === "admin" && password === "admin123") {

    const token = jwt.sign(
      {
        username: username,
        role: "admin"
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h"
      }
    );

    return res.json({
      success: true,
      message: "Login berhasil",
      token: token,
      redirect: "/dashboard"
    });

  }

  res.status(401).json({
    success: false,
    message: "Username atau password salah"
  });

}

module.exports = {
  login
};