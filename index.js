const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.post("/webhooks", async (req, res) => {
  res.status(200).send("Pull request!");
});

app.listen(3000, () => console.log(`App is running on port 3000`));