const express = require("express");

const {
  getAllFromDatabase,
  getFromDatabaseById,
  deleteFromDatabasebyId,
} = require("./db");

seedElements(minions, "minions");
minionsRouter = express.Router();

// Router params for minion id, find id and check if valid
minionsRouter.param("minionId", (req, res, next, id) => {
  const idToFind = id;
  const minionFromId = getFromDatabaseById("minions", idToFind);
  if (minionFromId === null) {
    res.status(404).send("No minion found, sorry!");
  } else {
    req.minionId = idToFind;
    next();
  }
});

// Get all minions
minionsRouter.get("/", (req, res, next) => {
  res.send(getAllFromDatabase("minions"));
});

// Create minion
minionsRouter.post("/", (req, res, next) => {});

// Get minions by id;
minionsRouter.get("/:minionId", (req, res, next) => {
  const minionFromId = getFromDatabaseById("minions", req.minionId);
  res.status(200).send(minionFromId);
});

// Delete minion by id
minionsRouter.delete("/:minionId", (req, res, next) => {
  deleteFromDatabasebyId("minions", req.minionId);
  res.status(204).send("The minion has been successfully deleted!");
});

module.exports = minionsRouter;
