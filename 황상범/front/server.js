const express = require("express");
const app = express();
const nunjucks = require("nunjucks");
const cookieParser = require("cookie-parser");
const router = require("./routes/user.route");

app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
});

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use((req, res, next) => {
  try {
    const { token } = req.cookies;

    const [header, payload, signature] = token.split(".");

    const pl = JSON.parse(Buffer.from(payload, "base64").toString("utf-8"));
    // console.log(pl);

    req.user = pl;
  } catch (e) {
  } finally {
    next();
  }
});

app.use(router);

app.use((error, req, res, next) => {
  res.status(500).json(error.message);
});

app.listen(3005, () => {
  console.log("front server start");
});
