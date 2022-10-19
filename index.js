const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.post("/webhooks", async (req, res) => {
  res.sendStatus(200)
  console.log('worked!')
});

app.listen(3000, () => console.log(`App is running on port 3000`));