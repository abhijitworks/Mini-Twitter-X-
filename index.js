const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send("Welcome to the home page!");
});

app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts: posts });
});

app.get("/posts/new", (req, res) => {
  res.render("new.ejs", { posts: posts });
});

app.post("/posts", (req, res) => {
  let { username, content } = req.body;
  let id = uuidv4();
  posts.push({ id, username, content });
  res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => p.id === id);
  res.render("show.ejs", { post });
});

app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;
  let post = posts.find((p) => p.id === id);
  post.content = newContent;
  console.log(post);
  res.redirect("/posts");
});

app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((p) => p.id !== id);
  res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => p.id === id);
  res.render("edit.ejs", { post });
});

let posts = [
  {
    id: uuidv4(),
    username: "abhijitpayra",
    content: "Hello World! I love coding.",
  },
  {
    id: uuidv4(),
    username: "adrija",
    content: "How are you? Whats up?",
  },
  {
    id: uuidv4(),
    username: "rahul",
    content: "kaise ho? Saab badhiya? milkaar achha laga.",
  },
];

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
