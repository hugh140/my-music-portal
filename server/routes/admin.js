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

    if (!name || !password || !email)
      throw new Error("Blank attributes are not permitted.");
    if (!token)
      throw new Error("It's necessary to be logged for execute this action.");

    jwt.verify(token, process.env.SECRET);

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newAdmin = new Admin({
      name: name,
      email: email,
      password: hash,
    });

    await newAdmin.save();
    res.send("User registered successfully.");
  } catch (error) {
    errorMessage(res, error, 400);
  }
});

router.post("/login", async (req, res) => {
  try {
    const email = req.query.email;
    const password = req.query.password;

    if (!email || !password)
      throw new Error("Blank attributes are not permitted.");

    const admin = await Admin.findOne({ email: email }).exec();
    if (bcrypt.compareSync(password, admin.password)) {
      const token = jwt.sign({ name: admin.name }, process.env.SECRET, {
        expiresIn: 1000 * 30,
      });
      res.cookie("HR", token, {
        secure: true,
        maxAge: 1000 * 60 * 60,
      });
      res.json({ message: "You are logged successfully.", ok: true });
    } else
      res.send({
        message: "Email or password are incorrect.",
        ok: false,
      });
  } catch (error) {
    errorMessage(res, error, 400);
  }
});

module.exports = router;
