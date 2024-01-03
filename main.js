const express = require("express");
const routes = require("./routes");
const cors = require("cors");
const app = express();
const upload = require("./multer");
const cloudinary = require("./cloudinary");
require("dotenv").config();
//DATABASE CONNECTION
const patth = require("path");
const db = require("./database/index");
const Login = require("./database/models/login");
const fs = require("fs");
const PORT = process.env.PORT || 5000;
app.options(
  "/api/images/upload",
  cors({
    origin: ["https://first-delivery-services.atac.tn"],
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
    origin: true,
  })
);
app.use(
  cors({
    origin: ["https://first-delivery-services.atac.tn"],
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
    origin: true,
  })
);
app.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Origin",
    "https://first-delivery-services.atac.tn"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  next();
});
app.use(express.json());

app.use(express.static("./dist"));

app.use("/api/results", routes.infoRoutes);

app.post("/api/images/upload", upload.single("image"), async (req, res) => {
  try {
    const uploader = async (path) => await cloudinary.uploads(path, "Results");
    if (req.method === "POST") {
      const urls = [];
      const file = req.file;
      const { path } = file;
      const newPath = await uploader(path);
      urls.push(newPath);
      fs.unlinkSync(path);
      res.send(JSON.stringify({ link: newPath.url }));
    } else {
      res.status(405).json({
        err: "Images not uploaded successfully",
      });
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

app.get("*", (req, res) => {
  res.sendFile(patth.join(__dirname, "./dist/index.html"));
});

app.listen(PORT, (err) => {
  if (!err) {
    console.log(`App Is Listetning On Port nami: ${PORT}`);
  }
});
