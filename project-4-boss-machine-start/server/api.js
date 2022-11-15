const express = require("express");
const app = require("../server");
const apiRouter = express.Router();
const minionsRouter = require("./minions.js");

app.use("/minions", minionsRouter);

module.exports = apiRouter;
