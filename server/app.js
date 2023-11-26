const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const blogRoutes = require("./routes/blog");
const adminRoutes = require("./routes/admin");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(cookieParser());

app.use("/api", blogRoutes);
app.use("/admin", adminRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Atlas connected"))
  .catch((error) => console.error(error));

app.listen(PORT, () => console.log("Server listening on port ", PORT));
