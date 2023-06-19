const express = require("express");
const Blog = require("../models/blog");
const saveImgBinaries = require("../scripts/saveImgBinaries");

const router = express.Router();
const limitOfBlogs = 30;

//Error message function
function errorMessage(res, error) {
  console.error(error);
  res.send("Something went wrong.");
}

//Routers
router.get("/blogs/:limit", (req, res) => {
  const { limit } = req.params;
  try {
    if (limit > limitOfBlogs) throw new Error("The limit exceeds 30 blogs.");

    Blog.find()
      .limit(limit)
      .select("title")
      .then((blogs) => {
        res.send(blogs);
        console.log(blogs);
      })
      .catch((error) => {
        errorMessage(res, error);
      });
  } catch (error) {
    errorMessage(res, error);
  }
});

router.get("/blog/:id", (req, res) => {
  const { id } = req.params;

  try {
    Blog.findById(id)
      .then((blogs) => {
        res.send(blogs);
        console.log(blogs);
      })
      .catch((error) => {
        errorMessage(res, error);
      });
  } catch (error) {
    errorMessage(res, error);
  }
});

router.post("/blog", (req, res) => {
  try {
    const blog = req.body;

    // Save images
    blog.headerImg = saveImgBinaries(blog.headerImg);
    blog.blogContent.forEach((element, index) => {
      if (element.type !== "image") return;

      const imgDir = saveImgBinaries(element.content);
      blog.blogContent[index].content = imgDir;
    });

    // Create model
    const newBlog = new Blog({
      title: blog.title,
      headerImg: blog.headerImg,
      blogContent: blog.blogContent,
    });

    // Save model
    newBlog
      .save()
      .then(() => {
        console.log(newBlog, "\n saved succesfully\n");
        res.send("Blog saved succesfully");
      })
      .catch((error) => {
        errorMessage(res, error);
      });
  } catch (error) {
    errorMessage(res, error);
  }
});

router.put("/blog/:id", (req, res) => {
  const { id } = req.params;
  const blog = req.body;

  try {
    const updateBlog = {
      title: blog.title,
      blogContent: blog.content,
    };

    Blog.updateOne({ _id: id }, updateBlog)
      .then(() => {
        console.log(updateBlog, "\n updated succesfully\n");
        res.send("Blog updated succesfully");
      })
      .catch((error) => {
        errorMessage(res, error);
      });
  } catch (error) {
    errorMessage(res, error);
  }
});

router.delete("/blog/:id", (req, res) => {
  const { id } = req.params;

  try {
    Blog.deleteOne({ _id: id })
      .then(() => {
        console.log("Blog deleted succesfully\n");
        res.send("Blog deleted succesfully");
      })
      .catch((error) => {
        errorMessage(res, error);
      });
  } catch (error) {
    errorMessage(res, error);
  }
});

module.exports = router;
