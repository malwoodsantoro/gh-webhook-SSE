const express = require("express");
const routes = require("./routes");
const bodyParser = require('body-parser');
const app = express();


app.use(bodyParser.json());

const port = "3000"
app.set("port", port);

app.use('/', routes);

app.listen(port, () => console.log(`Server running on localhost:${port}`));