const express = require("express");
const errorMessage = require("../scripts/errorHandler");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
const router = express.Router();
const puppeteer = require("puppeteer");

router.post("/upload", async (req, res) => {
  try {
    const token = req.cookies.HR;
    const title = req.query.title;

    if (!token)
      throw new Error("It's necessary to be logged for execute this action.");

    if (!title) throw new Error("The title is blank.");

    const files = req.files.pageFiles;
    if (!files) throw new Error("It's necessary upload any file.");

    jwt.verify(token, process.env.SECRET);

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
      quality: 20
    });
    await browser.close();

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

module.exports = router;
