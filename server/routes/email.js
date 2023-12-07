const express = require("express");
const router = express.Router();
const transporter = require("../scripts/initEmail");
const errorMessage = require("../scripts/errorHandler");
const User = require("../models/user");
const welcomeHTML = require("../emailViews/welcome");

router.post("/subscription", async (req, res) => {
  try {
    const email = req.query.email;
    const name = req.query.name;

    if (!email || !name) throw new Error("Some of the parameters are blank.");

    const newUser = new User({
      email: email,
      name: name,
    });

    await newUser.save();

    await transporter.sendMail({
      from: process.env.SMTP_EMAIL,
      to: "hugofer300@gmail.com",
      subject: "¡Bienvenido a mi Portal de Música!",
      html: welcomeHTML(name),
    });

    res.json({ message: "The user was subscribed successfully.", ok: true });
  } catch (e) {
    errorMessage(res, e, 400);
  }
});

module.exports = router;
