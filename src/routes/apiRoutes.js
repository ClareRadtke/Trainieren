const router = require("express").Router();
const { Workout } = require("../../models/workout");

// create workout
router.post("/api/workouts", async ({ body }, res) => {
  try {
    const workout = await Workout.create(body);
    if (workout) {
      res.status(200).json(workout);
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

// add exercise
router.put("/api/workouts/:id", async (req, res) => {
  try {
    const update = await Workout.updateOne(
      { _id: req.params.id },
      { $push: { exercises: req.body } }
    );
    res.status(200).json(update);
  } catch (err) {
    res.json(err);
  }
});

// View the total duration of each workout from the past seven workouts on the stats page
// View the combined weight of multiple exercises from the past seven workouts on the stats page
router.get("/api/workouts/range", async ({ body }, res) => {
  try {
    const sevenDaysAgo = new Date(new Date().setDate(new Date().getDate() - 7));
    const workouts = await Workout.aggregate([
      { $match: { day: { $gte: sevenDaysAgo } } },
      {
        $addFields: {
          totalDuration: { $sum: "$exercises.duration" },
        },
      },
    ]);
    if (workouts) {
      res.status(200).json(workouts);
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

// get last workout
router.get("/api/workouts", async ({ body }, res) => {
  try {
    let workout = await Workout.find({});
    workout = await Workout.aggregate([
      {
        $addFields: {
          totalDuration: { $sum: "$exercises.duration" },
        },
      },
    ]);
    if (workout) {
      res.status(200).json(workout);
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
