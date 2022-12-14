const express = require("express"),
  cors = require('cors'),
  endpoints = require("../endpoints.json"),
  { getAllCategories } = require("./controllers/categories.controllers.js"),
  { getAllUsers } = require("./controllers/users.controllers.js"),
  {
    getReviewById,
    incrementVotes,
    getAllReviews,
    getCommentsByReviewId,
    postComment,
    incrementCommentVotes,
    deleteComment,
  } = require("./controllers/reviews.controllers.js"),
  app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res, next) => res.status(200).send("Welcome to my API"));
app.get("/api", (req, res, next) =>
  res.status(200).send({ endpoints }).catch(next)
);
app.get("/api/categories", getAllCategories);
app.get("/api/users", getAllUsers);
app.get("/api/reviews", getAllReviews);
app.get("/api/reviews/:review_id", getReviewById);
app.get("/api/reviews/:review_id/comments", getCommentsByReviewId);

app.post("/api/reviews/:review_id/comments", postComment);

app.patch("/api/reviews/:review_id", incrementVotes);
app.patch('/api/comments/:comment_id', incrementCommentVotes)

app.delete('/api/comments/:comment_id', deleteComment)

app.all("*", (req, res) => {
  console.log(req);
  res.status(404).send({ msg: "That route does not exist" });
});

app.use((err, req, res, next) => {
  if (err.code === "23503") res.status(404).send({ msg: "Not found" });
  else next(err);
});

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  }
  res.status(400).send({ msg: "Invalid Id" });
});

module.exports = app;
