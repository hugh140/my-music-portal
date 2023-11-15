const express = require("express");
const Blog = require("../models/blog");
const {
  saveImgBinaries,
  deleteImages,
} = require("../scripts/manipulateImages");

const router = express.Router();
const limitOfBlogs = 20;

// Error message function
function errorMessage(res, error, status) {
  console.error(error);
  res.status(status).json({
    message: `${error}`,
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
router.get("/blogs", (req, res) => {
  try {
    let start = req.query.start;
    let end = req.query.end;

    if (!start || !end) throw new Error("Blank attributes not permitted.");

    if (start >= end || end - start > limitOfBlogs || start < 0 || end < 0)
      throw new Error(`The blogs petition has not permitted range.`);

    Blog.find()
      .skip(start)
      .limit(end)
      .sort({ createdAt: "desc" })
      .select("title headerImg")
      .then((blogs) => {
        res.json(blogs);
      })
      .catch((error) => {
        errorMessage(res, error, 404);
      });
  } catch (error) {
    errorMessage(res, error, 400);
  }
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
  try {
    const blog = req.body;
    if (!blog) throw new Error("The content is blank.");

    saveBlogImgs(blog);

    const newBlog = new Blog({
      title: blog.title,
      headerImg: blog.headerImg,
      blogContent: blog.blogContent,
    });

    newBlog
      .save()
      .then(() => {
        console.log(newBlog, "\n saved succesfully\n");
        res.send("Blog saved succesfully");
      })
      .catch((error) => {
        errorMessage(res, error, 400);
      });
  } catch (error) {
    errorMessage(res, error, 400);
  }
});

router.put("/blog/:id", (req, res) => {
  try {
  const { id } = req.params;
  const blog = req.body;
  if (!blog) throw new Error("The content is blank.");

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
  } catch (error) {
    errorMessage(res, error, 400);
  }
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
