const express = require("express");
const morgan = require("morgan");
const app = require("../server");
const checkMillionDollarIdea = require("./checkMillionDollarIdea");

const {
  getFromDatabaseById,
  getAllFromDatabase,
  deleteFromDatabasebyId,
  addToDatabase,
  updateInstanceInDatabase,
} = require("./db");

seedElements(ideas, "ideas");
const ideasRouter = express.Router();

ideasRouter.use(morgan("short"));

// Router params to select idea id
ideasRouter.param("ideaId", (req, res, next, id) => {
  const idToFind = id;
  const ideaToFind = getFromDatabaseById("ideas", idToFind);
  if (ideaToFind === null) {
    res.status(404).send("Idea not found, sorry!");
  } else {
    req.ideaId = idToFind;
    next();
  }
});

// Get all ideas
ideasRouter.get("/", (req, res, next) => {
  res.status(200).send(getAllFromDatabase("ideas"));
});

// Create a new idea
ideasRouter.post("/", checkMillionDollarIdea, (req, res, next) => {
  const instance = {
    name: req.query.name,
    description: req.query.description,
    numWeeks: Number(req.query.numWeeks),
    weeklyRevenue: Number(req.query.weeklyRevenue),
  };
  addToDatabase("ideas", instance);
  res.status(200).send("Your idea was successfully created!");
});

// Get idea by id
ideasRouter.get("/:ideaId", (req, res, next) => {
  const ideaFromId = getFromDatabaseById("ideas", req.ideaId);
  res.status(200).send(ideaFromId);
});

// Update by id
ideasRouter.put("/:ideaId", checkMillionDollarIdea, (req, res, next) => {
  const updatedInstance = {
    id: req.ideaId,
    name: req.query.name,
    description: req.query.description,
    numWeeks: Number(req.query.numWeeks),
    weeklyRevenue: Number(req.query.weeklyRevenue),
  };
  updateInstanceInDatabase("ideas", updatedInstance);
  res.state(201).send("You have successfully updated the idea!");
});

// Delete by id
ideasRouter.delete("/:ideaId", (req, res, next) => {
  deleteFromDatabasebyId("ideas", req.ideaId);
  res.status(204).send("Your idea was successfully deleted");
});

module.exports = ideasRouter;
