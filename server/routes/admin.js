const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const express = require("express");
const router = express.Router();

const Admin = require("../models/admin");
const errorMessage = require("../scripts/errorHandler");

router.get("/", async (req, res) => {
  try {
    const token = req.cookies.HR;

    if (!token)
      throw new Error("It's necessary to be logged for execute this action.");

    const adminInfo = await jwt.verify(token, process.env.SECRET);
    if (adminInfo.adminType !== "superAdmin")
      throw new Error("You're not authorized for create new users.");

    const admins = await Admin.find().select("name email type");
    res.json(admins);
  } catch (e) {
    errorMessage(res, e, 502);
  }
});

router.post("/register", async (req, res) => {
  try {
    const name = req.query.name;
    const email = req.query.email;
    const password = req.query.password;
    const type = req.query.type;
    const token = req.cookies.HR;

    if (!name || !password || !email || !type)
      throw new Error("Blank attributes are not permitted.");
    if (!token)
      throw new Error("It's necessary to be logged for execute this action.");

    const adminInfo = await jwt.verify(token, process.env.SECRET);
    if (adminInfo.adminType !== "superAdmin")
      throw new Error("You're not authorized for create new users.");

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newAdmin = new Admin({
      name: name,
      email: email,
      password: hash,
      type: type,
    });

    await newAdmin.save();
    res.json({ message: "User registered successfully.", ok: true });
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
      const token = jwt.sign(
        { name: admin.name, adminType: admin.type },
        process.env.SECRET,
        {
          expiresIn: 1000 * 30,
        }
      );
      res.cookie("HR", token, {
        secure: true,
        maxAge: 1000 * 60 * 60,
        httpOnly: false,
      });
      res.json({ message: "You are logged successfully.", ok: true });
    } else
      res.json({
        message: "Email or password are incorrect.",
        ok: false,
      });
  } catch (error) {
    errorMessage(res, error, 400);
  }
});

router.put("/edit", async (req, res) => {
  try {
    const name = req.query.name;
    const email = req.query.email;
    let password = req.query.password;
    const type = req.query.type;
    const token = req.cookies.HR;

    if (!token)
      throw new Error("It's necessary to be logged for execute this action.");

    if (!email) throw new Error("The user email is required.");

    const adminInfo = await jwt.verify(token, process.env.SECRET);
    if (adminInfo.adminType !== "superAdmin")
      throw new Error("You're not authorized for edit users.");

    const admin = await Admin.findOne({ email: email }).exec();

    if (password) {
      const salt = bcrypt.genSaltSync(10);
      password = bcrypt.hashSync(password, salt);
    }

    const updateAdmin = {
      name: name || admin.name,
      password: password || admin.password,
      type: type || admin.type,
    };

    await Admin.updateOne({ email: email }, updateAdmin);
    res.json({ message: "User was updated successfully.", ok: true });
  } catch (e) {
    errorMessage(res, e, 400);
  }
});

router.delete("/delete", async (req, res) => {
  try {
    const email = req.query.email;
    const token = req.cookies.HR;

    if (!token)
      throw new Error("It's necessary to be logged for execute this action.");

    if (!email) throw new Error("The user email is required.");

    const adminInfo = await jwt.verify(token, process.env.SECRET);
    if (adminInfo.adminType !== "superAdmin")
      throw new Error("You're not authorized for edit users.");

    await Admin.deleteOne({ email: email });
    res.json({ message: "User was deleted successfully.", ok: true });
  } catch (e) {}
});

module.exports = router;
