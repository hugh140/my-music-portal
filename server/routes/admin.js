const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const express = require("express");
const router = express.Router();

const Admin = require("../models/admin");
const errorMessage = require("../scripts/errorHandler");

router.post("/register", async (req, res) => {
  try {
    const name = req.query.name;
    const email = req.query.email;
    const password = req.query.password;
    const token = req.cookies.HR;

    if (!name) throw new Error('El campo "name" está vacío.');
    if (!email) throw new Error('El campo "email" está vacío.');
    if (!password) throw new Error('El campo "password" está vacío.');

    jwt.verify(token, process.env.SECRET);

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newAdmin = new Admin({
      name: name,
      email: email,
      password: hash,
    });

    await newAdmin.save();
    res.send("Nuevo usuario registrado correctamente.");
  } catch (error) {
    errorMessage(res, error, 400);
  }
});

router.post("/login", async (req, res) => {
  try {
    const email = req.query.email;
    const password = req.query.password;

    if (!email) throw new Error('El campo "email" está vacío.');
    if (!password) throw new Error('El campo "password" está vacío.');

    const admin = await Admin.findOne({ email: email }).exec();
    if (bcrypt.compareSync(password, admin.password)) {
      const token = jwt.sign({ name: admin.name }, process.env.SECRET, {
        expiresIn: "1h",
      });
      res.cookie("HR", token);
      res.json({ message: "Ha iniciado sesión correctamente.", ok: true });
    } else
      res.send({
        message: "Su email o contraseña son incorrectos.",
        ok: false,
      });
  } catch (error) {
    errorMessage(res, error, 400);
  }
});

module.exports = router;
