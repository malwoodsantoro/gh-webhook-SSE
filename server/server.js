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

const Push = sequelize.define("push", {
  pr: Sequelize.TEXT,
  info: Sequelize.STRING,
});

sequelize.sync({ force: true }).then(() => {
  console.log(`Database & tables created!`);

  Push.bulkCreate([
    { pr: "pick up some bread after work", info: "shopping" },
    { pr: "remember to write up meeting notes", info: "work" },
    { pr: "learn how to use node orm", info: "work" },
  ])
    .then(function () {
      return Push.findAll();
    })
    .then(function (responses) {
      console.log(responses);
    });
});

app.use(bodyParser.json());

const port = "3000";
app.set("port", port);

app.get("/", function (req, res) {
  Push.findAll().then((notes) => res.json(notes));
});

app.post("/webhooks", function (req, res) {
  console.log('ok')
  console.log(req.body);
});

app.listen(port, () => console.log(`Server running on localhost:${port}`));
