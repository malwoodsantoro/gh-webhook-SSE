const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Helloa!");
});

app.post("/webhooks", function (req, res) {
  res.send("Pull request!");
});

app.listen(3000, function () {
  console.log("Listening for webhooks on port 3000");

  // (async function () {
  //   const url = await ngrok.connect(3000);
  // })();
});
