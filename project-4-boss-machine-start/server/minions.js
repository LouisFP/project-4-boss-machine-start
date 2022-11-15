const express = require("express");
const morgan = require("morgan");
const app = require("../server");

const {
  getAllFromDatabase,
  getFromDatabaseById,
  deleteFromDatabasebyId,
  addToDatabase,
  updateInstanceInDatabase,
} = require("./db");

seedElements(minions, "minions");
const minionsRouter = express.Router();

minionsRouter.use(morgan("short"));

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
  res.status(200).send(getAllFromDatabase("minions"));
});

// Create minion
minionsRouter.post("/", (req, res, next) => {
  const instance = {
    name: req.query.name,
    title: req.query.title,
    salary: Number(req.query.salary),
  };
  addToDatabase("minions", instance);
  res.status(200).send("Your minion was successfully added!");
});

// Get minions by id;
minionsRouter.get("/:minionId", (req, res, next) => {
  const minionFromId = getFromDatabaseById("minions", req.minionId);
  res.status(200).send(minionFromId);
});

// Update minion by id
minionsRouter.put("/:minionId", (req, res, next) => {
  const updateInstance = {
    id: req.idToFind,
    name: req.query.name,
    title: req.query.title,
    salary: Number(req.query.salary),
  };
  updateInstanceInDatabase("minions", updateInstance);
  res.state(201).send("You have successfully updated the minion!");
});

// Delete minion by id
minionsRouter.delete("/:minionId", (req, res, next) => {
  deleteFromDatabasebyId("minions", req.minionId);
  res.status(204).send("The minion has been successfully deleted!");
});

module.exports = minionsRouter;
