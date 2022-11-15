const checkMillionDollarIdea = (req, res, next) => {
  if (req.query.numWeeks * req.query.weeklyRevenue) {
    next();
  } else {
    res.send("Not a million dollar idea!");
  }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
