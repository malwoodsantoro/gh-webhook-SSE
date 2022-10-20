const express = require('express');
const router = express.Router();

router.get("/", function(res) {
  res.send("Welcome to the Webhooks API");
});

router.post("/webhooks", function(req, res) {
  console.log(req.body)
});


module.exports = router;