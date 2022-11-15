const express = require("express");

seedElements(minions, "minions");
minionsRouter = express.Router();

minionsRouter.get("/");
