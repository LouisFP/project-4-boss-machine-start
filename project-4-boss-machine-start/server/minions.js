const express = require("express");

const {
  getAllFromDatabase,
  getFromDatabaseById,
  deleteFromDatabasebyId,
  addToDatabase,
  updateInstanceInDatabase,
} = require("./db");

const minionsRouter = express.Router();

// Router params for minion id, find id and check if valid
minionsRouter.param("minionId", (req, res, next, id) => {
  const idToFind = id;
  const minionFromId = getFromDatabaseById("minions", idToFind);
  if (minionFromId) {
    req.minionId = idToFind;
    next();
  } else {
    res.status(404).send();
  }
});

// Get all minions
minionsRouter.get("/", (req, res, next) => {
  res.send(getAllFromDatabase("minions"));
});

// Create minion
minionsRouter.post("/", (req, res, next) => {
  const newMinion = addToDatabase("minions", req.body);
  res.status(201).send(newMinion);
});

// Get minions by id;
minionsRouter.get("/:minionId", (req, res, next) => {
  const minionFromId = getFromDatabaseById("minions", req.minionId);
  res.status(200).send(minionFromId);
});

// Update minion by id
minionsRouter.put("/:minionId", (req, res, next) => {
  let updatedMinionInstance = updateInstanceInDatabase("minions", req.body);
  res.status(201).send(updatedMinionInstance);
});

// Delete minion by id
minionsRouter.delete("/:minionId", (req, res, next) => {
  const deleted = deleteFromDatabasebyId("minions", req.minionId);
  if (deleted) {
    res.status(204);
  } else {
    res.status(500);
  }
  res.send();
});

minionsRouter.param("wordId", (req, res, next, id) => {
  const work = getFromDatabaseById("work", id);
  if (work) {
    req.work = work;
    next();
  } else {
    res.status(400).send();
  }
});

minionsRouter.get("/:minionId/work", (req, res, next) => {
  const allWork = getAllFromDatabase("work");
  const work = allWork.filter((element) => element.id === req.params.minionId);
  res.send(work);
});

minionsRouter.post("/:minionId/work", (req, res, next) => {
  const newWork = req.body;
  newWork.minionId = req.params.minionId;
  const createdWork = addToDatabase("work", newWork);
  res.status(201).send(createdWork);
});

minionsRouter.put("/:minionId/work/:workId", (req, res, next) => {
  if (req.params.minionId !== req.body.minionId) {
    res.status(400).send();
  } else {
    const updatedWork = updateInstanceInDatabase("work", req.body);
    res.send(updatedWork);
  }
});

minionsRouter.delete("/:minionId/work/:workId", (req, res, next) => {
  const deleted = deleteFromDatabasebyId("work", req.params.workId);
  if (deleted) {
    res.status(204);
  } else {
    res.status(500);
  }
  res.send();
});

module.exports = minionsRouter;
