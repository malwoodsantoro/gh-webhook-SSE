const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();

router.get("/", function(req, res) {
  res.send("Welcome to the Webhooks API");
});

router.post("/webhooks", function(req, res) {
  console.log(req.body);
  res.send("Successfully received");
});


module.exports = router;