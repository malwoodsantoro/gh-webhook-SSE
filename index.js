const express = require("express");
const ngrok = require("ngrok");
const app = express();

app.get("/", (res) => {
  res.send("Hello!");
});

app.post("/webhooks", function (req, res) {
  res.send("Pull request!");
});

app.listen(3000, function () {
  console.log("Listening for webhooks on port 3000");

  (async function () {
    const url = await ngrok.connect(3000);
  })();
});
