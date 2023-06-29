const express = require("express");
const Blog = require("../models/blog");
const {
  saveImgBinaries,
  deleteImages,
} = require("../scripts/manipulateImages");

const router = express.Router();
const limitOfBlogs = 30;

// Error message function
function errorMessage(res, error, status) {
  console.error(error);
  res.status(status).json({
    message: `Error: ${error}`,
    status: status,
  });
}

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
router.get("/blogs/:limit", (req, res) => {
  const { limit } = req.params;

  if (limit > limitOfBlogs) throw new Error();

  Blog.find()
    .limit(limit)
    .select("title headerImg")
    .then((blogs) => {
      res.send(blogs);
      console.log(blogs);
    })
    .catch((error) => {
      errorMessage(res, error, 404);
    });
});

router.get("/blog/:id", (req, res) => {
  const { id } = req.params;

  Blog.findById(id)
    .then((blogs) => {
      res.send(blogs);
      console.log(blogs);
    })
    .catch((error) => {
      errorMessage(res, error, 404);
    });
});

router.post("/blog", (req, res) => {
  const blog = req.body;
  saveBlogImgs(blog);

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
      errorMessage(res, error, 400);
    });
});

router.put("/blog/:id", (req, res) => {
  const { id } = req.params;
  const blog = req.body;
  saveBlogImgs(blog);

  const updateBlog = {
    title: blog.title,
    headerImg: blog.headerImg,
    blogContent: blog.blogContent,
  };

  Blog.findOneAndUpdate({ _id: id }, updateBlog)
    .then((blog) => {
      deleteBlogImgs(blog);

      console.log(updateBlog, "\n updated succesfully\n");
      res.send("Blog updated succesfully");
    })
    .catch((error) => {
      errorMessage(res, error, 400);
    });
});

router.delete("/blog/:id", (req, res) => {
  const { id } = req.params;

  Blog.findOneAndDelete({ _id: id })
    .then((blog) => {
      deleteBlogImgs(blog);

      console.log("Blog deleted succesfully\n");
      res.send("Blog deleted succesfully");
    })
    .catch((error) => {
      errorMessage(res, error, 400);
    });
});

module.exports = router;
