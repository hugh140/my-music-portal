const { Schema, model } = require("mongoose");

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    headerImg: {
      type: String,
      required: true,
    },
    blogContent: {
      type: Array,
      required: true,
    },
    author: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

module.exports = model("Blog", blogSchema);
