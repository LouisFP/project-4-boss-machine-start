const express = require("express");

const {
  getFromDatabaseById,
  getAllFromDatabase,
  deleteFromDatabasebyId,
  addToDatabase,
  updateInstanceInDatabase,
} = require("./db");

const ideasRouter = express.Router();

const checkMillionDollarIdea = require("./checkMillionDollarIdea");

// Router params to select idea id
ideasRouter.param("ideaId", (req, res, next, id) => {
  const idToFind = id;
  const ideaToFind = getFromDatabaseById("ideas", idToFind);
  if (ideaToFind) {
    req.ideaId = idToFind;
    next();
  } else {
    res.status(404).send();
  }
});

// Get all ideas
ideasRouter.get("/", (req, res, next) => {
  res.send(getAllFromDatabase("ideas"));
});

// Create a new idea
ideasRouter.post("/", checkMillionDollarIdea, (req, res, next) => {
  const newIdea = addToDatabase("ideas", req.body);
  res.status(201).send(newIdea);
});

// Get idea by id
ideasRouter.get("/:ideaId", (req, res, next) => {
  const ideaFromId = getFromDatabaseById("ideas", req.ideaId);
  res.send(ideaFromId);
});

// Update by id
ideasRouter.put("/:ideaId", checkMillionDollarIdea, (req, res, next) => {
  const updatedInstance = updateInstanceInDatabase("ideas", req.body);
  res.status(201).send(updatedInstance);
});

// Delete by id
ideasRouter.delete("/:ideaId", (req, res, next) => {
  const deleted = deleteFromDatabasebyId("ideas", req.ideaId);
  if (deleted) {
    res.status(204);
  } else {
    res.status(500);
  }
  res.send();
});

module.exports = ideasRouter;
