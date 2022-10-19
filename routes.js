const express = require('express');

const router = express.Router();

router.get("/", function(req, res) {
  res.send("Welcome to the Webhooks API");
});

router.post("/webhooks", function(req, res) {
  res.end("Successfully received");
});


module.exports = router;