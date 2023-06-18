const express = require("express");
const router = express.Router();

const Blog = require("../models/blog");
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
    const newBlog = new Blog({
      title: blog.title,
      blogContent: blog.content,
    });

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
