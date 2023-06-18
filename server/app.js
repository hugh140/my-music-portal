const express = require("express");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blog");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", blogRoutes);
app.use(express.static('public'));

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Atlas connected"))
  .catch((error) => console.error(error));

app.listen(PORT, () => console.log("Server listening on port ", PORT));
