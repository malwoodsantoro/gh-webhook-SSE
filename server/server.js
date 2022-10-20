const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const Sequelize = require("sequelize");
const sequelize = new Sequelize("sqlite://db.sqlite", { sync: true });

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

const Star = sequelize.define("star", {
  pr: Sequelize.TEXT,
  info: Sequelize.STRING,
});

sequelize.sync({ force: true }).then(() => {
  console.log(`Database & tables created!`);

  Star.bulkCreate([
    { pr: "pick up some bread after work", info: "shopping" },
    { pr: "remember to write up meeting notes", info: "work" },
    { pr: "learn how to use node orm", info: "work" },
  ])
    .then(function () {
      return Star.findAll();
    })
    .then(function (responses) {
      console.log(responses);
    });
});

app.use(bodyParser.json());

const port = "5000";
app.set("port", port);

app.get("/stars", function (req, res) {
  Star.findAll().then((stars) => res.json(stars));
});

app.post("/webhooks", function (req, res) {
  console.log("ok");
  Star.create({
    pr: req.body.repository.html_url,
    info: req.body.repository.forks_url,
  });
  res.status(200).send("OK");
});

app.listen(port, () => console.log(`Server running on localhost:${port}`));
