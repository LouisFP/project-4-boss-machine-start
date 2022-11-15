const express = require("express");
const morgan = require("morgan");
const app = require("../server");

const {
  getAllFromDatabase,
  deleteAllFromDatabase,
  createMeeting,
  addToDatabase,
} = require("./db");
const ideasRouter = require("./ideas");

seedElements(meetings, "meetings");
const meetingsRouter = express.Router();

ideasRouter.use(morgan("short"));

// Get all meetings
meetingsRouter.get("/", (req, res, next) => {
  res.status(200).send(getAllFromDatabase("meetings"));
});

// Create meetings
meetingsRouter.post("/", (req, res, next) => {
  const meetingToCreate = createMeeting();
  addToDatabase("meetings", meetingToCreate);
  res.status(200).send("Your new meeting has been successfully created!");
});

// Delete all meetings
meetingsRouter.delete("/", (req, res, next) => {
  deleteAllFromDatabase("meetings");
  res.status(204).send("All meetings have been successfully deleted!");
});

module.exports = meetingsRouter;
