const express = require("express");
const Blog = require("../models/blog");
const errorMessage = require("../scripts/errorHandler");
const transporter = require("../scripts/initEmail");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const newBlogsHTML = require("../emailViews/newBlogs");
const fs = require("fs");
const {
  saveImgBinaries,
  deleteImages,
} = require("../scripts/manipulateImages");

const router = express.Router();
const limitOfBlogs = 20;

// Blogs img manipulate
function saveBlogImgs(blog) {
  blog.headerImg = saveImgBinaries(blog.headerImg);
  blog.blogContent.forEach((element, index) => {
    if (element.type !== "image") return;

    const imgDir = saveImgBinaries(element.content);
    blog.blogContent[index].content = imgDir;
  });
}

function deleteBlogImgs(blog) {
  deleteImages(blog.headerImg);
  blog.blogContent.forEach((element) => {
    if (element.type !== "image") return;
    deleteImages(element.content);
  });
}

// Routers
router.get("/blogs", async (req, res) => {
  try {
    const start = req.query.start;
    const end = req.query.end;

    if (!start || !end) throw new Error("Blank attributes are not permitted.");

    if (start >= end || end - start > limitOfBlogs || start < 0 || end < 0)
      throw new Error(`The blogs petition has not permitted range.`);

    const response = await Blog.find()
      .skip(start)
      .limit(end - start)
      .sort({ createdAt: "desc" })
      .select("title headerImg");
    res.json(response);
  } catch (error) {
    errorMessage(res, error, 400);
  }
});

router.get("/blog/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await Blog.findById(id);
    res.send(response);
  } catch (e) {
    errorMessage(res, error, 404);
  }
});

router.post("/blog", async (req, res) => {
  try {
    const blog = req.body;
    const token = req.cookies.HR;

    if (!blog) throw new Error("The content is blank.");
    if (!token)
      throw new Error("It's necessary to be logged for execute this action.");

    const userInfo = await jwt.verify(token, process.env.SECRET);

    if (
      !(
        userInfo.adminType === "writter" ||
        userInfo.adminType === "editor" ||
        userInfo.adminType === "superAdmin"
      )
    )
      throw new Error("You're not authorized for post new blogs.");

    if (!fs.existsSync(__dirname + "/../public/images"))
      fs.mkdirSync(__dirname + "/../public/images", { recursive: true });

    saveBlogImgs(blog);

    const newBlog = new Blog({
      title: blog.title,
      headerImg: blog.headerImg,
      blogContent: blog.blogContent,
      author: userInfo.name,
    });

    const publishedBlog = await newBlog.save();

    let emails = await User.find();
    emails = emails.map((email) => email.email).join(", ");

    if (emails)
      await transporter.sendMail({
        from: process.env.SMTP_EMAIL,
        to: emails,
        subject: blog.title,
        html: newBlogsHTML(publishedBlog),
      });

    res.json({ message: "Blog saved succesfully", ok: true });
  } catch (error) {
    errorMessage(res, error, 400);
  }
});

router.put("/blog/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const blog = req.body;
    const token = req.cookies.HR;

    if (!blog) throw new Error("The content is blank.");
    if (!token)
      throw new Error("It's necessary to be logged for execute this action.");

    const userInfo = await jwt.verify(token, process.env.SECRET);

    if (
      !(userInfo.adminType === "editor" || userInfo.adminType === "superAdmin")
    )
      throw new Error("You're not authorized for update blogs.");

    if (!fs.existsSync(__dirname + "/../public/images"))
      fs.mkdirSync(__dirname + "/../public/images", { recursive: true });

    saveBlogImgs(blog);

    const updateBlog = {
      title: blog.title,
      headerImg: blog.headerImg,
      blogContent: blog.blogContent,
      author: userInfo.name,
    };

    const response = await Blog.findOneAndUpdate({ _id: id }, updateBlog);
    deleteBlogImgs(response);
    res.send({ message: "Blog updated succesfully", ok: true });
  } catch (error) {
    errorMessage(res, error, 400);
  }
});

router.delete("/blog/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const token = req.cookies.HR;

    if (!token)
      throw new Error("It's necessary to be logged for execute this action.");

    const userInfo = await jwt.verify(token, process.env.SECRET);

    if (
      !(userInfo.adminType === "editor" || userInfo.adminType === "superAdmin")
    )
      throw new Error("You're not authorized for delete blogs.");

    const response = await Blog.findOneAndDelete({ _id: id });
    deleteBlogImgs(response);

    res.json({ message: "Blog deleted succesfully", ok: true });
  } catch (e) {
    errorMessage(res, e, 401);
  }
});

module.exports = router;
