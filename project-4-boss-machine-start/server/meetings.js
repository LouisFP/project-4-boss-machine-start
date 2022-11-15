const express = require("express");

const {
  getAllFromDatabase,
  deleteAllFromDatabase,
  createMeeting,
  addToDatabase,
} = require("./db");

const meetingsRouter = express.Router();

// Get all meetings
meetingsRouter.get("/", (req, res, next) => {
  res.send(getAllFromDatabase("meetings"));
});

// Create meetings
meetingsRouter.post("/", (req, res, next) => {
  const meetingToCreate = addToDatabase("meetings", createMeeting());
  res.status(201).send(meetingToCreate);
});

// Delete all meetings
meetingsRouter.delete("/", (req, res, next) => {
  deleteAllFromDatabase("meetings");
  res.status(204).send();
});

module.exports = meetingsRouter;
