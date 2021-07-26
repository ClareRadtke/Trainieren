const router = require("express").Router();
const Workout = require("../../models/workout");

// TODO:
// View the combined weight of multiple exercises from the past seven workouts on the stats page
// Add exercises to the most recent workout plan.
// Add new exercises to a new workout plan.
// View the total duration of each workout from the past seven workouts on the stats page.

// create workout
router.post("/api/workout", ({ body }, res) => {
  Workout.create(body)
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get("/api/workout", (req, res) => {
  Workout.find({})
    .sort({ date: -1 })
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;
