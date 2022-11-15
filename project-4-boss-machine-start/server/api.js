const express = require("express");
const app = require("../server");
const apiRouter = express.Router();
const minionsRouter = require("./minions.js");
const ideasRouter = require("./ideas");
const meetingsRouter = require("./meetings");

app.use("/minions", minionsRouter);
app.use("/ideas", ideasRouter);
app.use("/meetings", meetingsRouter);

module.exports = apiRouter;
