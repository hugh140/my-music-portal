const express = require("express");
const errorMessage = require("../scripts/errorHandler");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
const router = express.Router();
const puppeteer = require("puppeteer");
const transporter = require("../scripts/initEmail");
const User = require("../models/user");
const newSoftwareHTML = require("../emailViews/newSoftware");

router.post("/upload", async (req, res) => {
  try {
    const token = req.cookies.HR;
    const title = req.query.title;

    if (!token)
      throw new Error("It's necessary to be logged for execute this action.");

    if (!title) throw new Error("The title parameter is blank.");

    const files = req.files.pageFiles;
    if (!files) throw new Error("It's necessary upload any file.");

    const userInfo = await jwt.verify(token, process.env.SECRET);

    if (
      !(
        userInfo.adminType === "writter" ||
        userInfo.adminType === "editor" ||
        userInfo.adminType === "superAdmin"
      )
    )
      throw new Error("You're not authorized for post new web apps.");

    const filePath =
      path.join(__dirname, "..", "public", "software", title) + "/";
    if (!files.some((file) => file.name.split("/").at(-1) === "index.html"))
      throw new Error(
        "It's necessary an index.html file for upload the files."
      );

    for (const file of files) {
      await fs.promises.mkdir(
        filePath + file.name.split("/").slice(2, -1).join("/") + "/",
        { recursive: true }
      );
      await file.mv(filePath + file.name.split("/").slice(2).join("/"));
    }
    const pageUrl = path.join(
      process.env.SERVER_URL,
      "/software",
      title,
      "index.html"
    );

    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.goto(pageUrl);
    await page.screenshot({
      path: `public/software/web_screenshots/${title}.jpg`,
      optimizeForSpeed: true,
      quality: 20,
    });
    await browser.close();

    let emails = await User.find();
    emails = emails.map((email) => email.email).join(", ");

    const emailInfo = {
      title: title,
      img: `${process.env.SERVER_URL}/software/web_screenshots/${title}.jpg`,
      url: `${process.env.SERVER_URL}/software/${title}/index.html`,
    };

    await transporter.sendMail({
      from: process.env.SMTP_EMAIL,
      to: emails,
      subject: title,
      html: newSoftwareHTML(emailInfo),
    });

    res.json({ message: "The program was uploaded successfully.", ok: true });
  } catch (e) {
    errorMessage(res, e, 400);
  }
});

router.get("/", async (req, res) => {
  try {
    const dirPath = path.join(__dirname, "..", "public", "software");
    const dir = await fs.promises.readdir(dirPath);
    dir.splice(dir.indexOf("web_screenshots"), 1);
    const pages = dir.map((folder) => ({
      title: folder,
      img: `${process.env.SERVER_URL}/software/web_screenshots/${folder}.jpg`,
      url: `${process.env.SERVER_URL}/software/${folder}/index.html`,
    }));

    res.json(pages);
  } catch (e) {
    errorMessage(res, e, 502);
  }
});

router.put("/update/:name", async (req, res) => {
  try {
    const name = req.params.name;
    const newName = req.query.name;
    const token = req.cookies.HR;

    if (!token)
      throw new Error("It's necessary to be logged for execute this action.");

    if (!name) throw new Error("The name parameter is blank.");

    const files = req.files.pageFiles;
    if (!files) throw new Error("It's necessary upload any file.");

    const userInfo = await jwt.verify(token, process.env.SECRET);

    if (
      !(userInfo.adminType === "editor" || userInfo.adminType === "superAdmin")
    )
      throw new Error("You're not authorized for update blogs.");

    if (!files.some((file) => file.name.split("/").at(-1) === "index.html"))
      throw new Error(
        "It's necessary an index.html file for upload the files."
      );

    const dirPath = path.join(__dirname, "..", "public", "software") + "/";
    await fs.promises.rm(dirPath + name, { recursive: true });
    await fs.promises.rm(dirPath + `web_screenshots/${name}.jpg`, {
      recursive: true,
    });

    const filePath =
      path.join(__dirname, "..", "public", "software", newName) + "/";

    for (const file of files) {
      await fs.promises.mkdir(
        filePath + file.name.split("/").slice(2, -1).join("/") + "/",
        { recursive: true }
      );
      await file.mv(filePath + file.name.split("/").slice(2).join("/"));
    }

    const pageUrl = path.join(
      process.env.SERVER_URL,
      "/software",
      newName,
      "index.html"
    );

    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.goto(pageUrl);
    await page.screenshot({
      path: `public/software/web_screenshots/${newName}.jpg`,
      optimizeForSpeed: true,
      quality: 20,
    });
    await browser.close();

    res.json({ message: "The program was updated successfully.", ok: true });
  } catch (e) {
    errorMessage(res, e, 400);
  }
});

router.delete("/delete/:name", async (req, res) => {
  try {
    const name = req.params.name;
    const token = req.cookies.HR;

    if (!token)
      throw new Error("It's necessary to be logged for execute this action.");

    if (!name) throw new Error("The name parameter is blank.");

    const userInfo = await jwt.verify(token, process.env.SECRET);

    if (
      !(userInfo.adminType === "editor" || userInfo.adminType === "superAdmin")
    )
      throw new Error("You're not authorized for delete blogs.");

    const dirPath = path.join(__dirname, "..", "public", "software") + "/";
    await fs.promises.rm(dirPath + name, { recursive: true });
    await fs.promises.rm(dirPath + `web_screenshots/${name}.jpg`, {
      recursive: true,
    });

    res.json({ message: "The program was deleted successfully.", ok: true });
  } catch (e) {
    errorMessage(res, e, 400);
  }
});

module.exports = router;
