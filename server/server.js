const express = require("express");
const bodyParser = require("body-parser");
const server = express();
const cors = require("cors");
server.use(cors({credentials: true, origin: true}));
server.options('*', cors())
const Sequelize = require("sequelize");
const sequelize = new Sequelize("sqlite://db.sqlite", { sync: true });

server.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
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

server.use(bodyParser.json());

const port = "5000";
server.set("port", port);

server.get("/api/stars", function (req, res) {
  Star.findAll().then((stars) => res.json(stars));
});

server.post("/webhooks", function (req, res) {
  Star.create({
    pr: req.body.repository.html_url,
    info: req.body.repository.forks_url,
  });
  res.status(200).send("OK");
});

const SEND_INTERVAL = 1000;

const writeEvent = (res) => {
  res.write("it's something", () => {
    console.log('ok')
  })
};

const sendEvent = (req, res) => {
  res.writeHead(200, {
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Content-Type": "text/event-stream",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
  });

  setInterval(() => {
    writeEvent(res);
  }, SEND_INTERVAL);

  writeEvent(res);
};

server.get("/stream", (req, res) => {
  if (req.headers.accept === "text/event-stream") {
    sendEvent(req, res);
  } else {
    res.json({ message: "Ok" });
  }
});

server.listen(port, () => console.log(`Server running on localhost:${port}`));
