const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const blogRoutes = require("./routes/blog");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use("/api", blogRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Atlas connected"))
  .catch((error) => console.error(error));

app.listen(PORT, () => console.log("Server listening on port ", PORT));
