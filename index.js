import express from "express";
import bodyParser from "body-parser";
import { render } from "ejs";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let blogs = new Array();
blogs = [];

app.post("/delete", (req, res) => {
  //console.log(req.body);
  let idx = Number(req.body["index"]);
  blogs.splice(idx, 1);
  res.redirect("/view");
});

app.post("/view", (req, res) => {
  // console.log(req.body);
  let idx = Number(req.body["index"]);
  blogs[idx].title = req.body["title"];
  blogs[idx].content = req.body["blog"];
  res.redirect("/");
});

app.post("/update", (req, res) => {
  //console.log(req.body);
  let newTitle = req.body["title"];
  let newContent = req.body["content"];
  let id = Number(req.body["id"]);

  let obj = {
    newTitle,
    newContent,
    id,
  };

  res.render("update.ejs", { obj });
});

app.post("/submit", (req, res) => {
  //console.log(req.body);
  let title = req.body["title"];
  let content = req.body["blog"];

  if (title == "" || content == "") {
    res.redirect("/");
  } else {
    blogs.push({
      title,
      content,
    });
    res.redirect("/view");
  }
});

app.get("/view", (req, res) => {
  res.render("view.ejs", { myBlogs: blogs });
});

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.listen(port, (req, res) => {
  console.log(`Server running on port ${port}`);
});
