const express = require("express");
const bodyParser = require("body-parser");
const EventEmitter = require("events");
const Sequelize = require("sequelize");

const server = express();
const cors = require("cors");
const SSE = new EventEmitter(); 

server.use(cors({ origin: true }));
server.options("*", cors());

const sequelize = new Sequelize("sqlite://db.sqlite", { sync: true });

server.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

const Star = sequelize.define("star", {
  owner: Sequelize.STRING,
  sender: Sequelize.STRING,
});

sequelize.sync({ force: true }).then(() => {
  console.log(`Database & tables created!`);

  Star.bulkCreate([
    { owner: "malwoodsantoro", sender: "test1" },
    { owner: "malwoodsantoro", sender: "test2" },
    { owner: "malwoodsantoro", sender: "test3" },
  ])
    .then(function () {
      return Star.findAll();
    })
    .then(function (responses) {
      console.log(responses);
    });
});

server.use(bodyParser.json());

const port = "5000";
server.set("port", port);

server.get("/api/stars", function (req, res) {
  Star.findAll().then((stars) => res.json(stars));
});

server.post("/webhooks", function (req, res) {
  SSE.emit("push", "message", { msg: req.body.sender.login });
  Star.create({
    owner: req.body.repository.owner.login,
    sender: req.body.sender.login,
  });
  res.status(200).send("OK");
});

server.get("/stream", (req, res) => {
  res.writeHead(200, {
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
    "Content-Type": "text/event-stream",
  });

  // let data = { name: "event!!" };

  SSE.on("push", function (event, data) {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  });
});

server.listen(port, () => console.log(`Server running on localhost:${port}`));
