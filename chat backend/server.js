const express = require("express");
const fs = require("fs");
const app = express();
const cors = require("cors");
const port = 3001;
const config = require("./data.json");
const { log } = require("console");

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    optionsSuccessStatus: 200,
    origin: true,
  })
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  next();
});

app.get("/data", (req, res) => {
  fs.readFile("./data.json", "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(200).json({ error: "Internal server error" });
      return;
    }

    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    } catch (e) {
      console.error(e);
      res.status(200).json({ error: "Invalid JSON" });
    }
  });
});

app.post("/data", (req, res) => {
  const name = req.query.username;
  if (name == null) {
    res.status(200).json({ error: "Enter the Params" });
  }
  fs.readFile("./data.json", "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(200).json({ error: "Internal server error" });
      return;
    }
    try {
      const jsonData = JSON.parse(data);
      console.log(jsonData);
      const newComment = {
        id: 2,
        content: "This is a new comment.",
        createdAt: new Date().toISOString(),
        score: 0,
        user: {
          image: {
            png: "./images/avatars/image-john.png",
            webp: "./images/avatars/image-john.webp",
          },
          username: "john",
        },
        replies: [],
      };
      jsonData.comments.push(newComment);

      const updatedData = JSON.stringify(jsonData);
      fs.writeFile("./data.json", updatedData, "utf-8", (err) => {
        if (err) {
          console.error(err);
          res.status(200).json({ error: "Internal server error" });
          return;
        }
        res.status(200).json({ message: "Commented Successfully" });
      });
    } catch (err) {
      console.error(e);
      res.status(200).json({ error: "Invalid JSON" });
    }
  });
});

app.listen(port, () => {
  console.log(`server running on port ${port} `);
});
