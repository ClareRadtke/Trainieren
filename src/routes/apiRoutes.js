const router = require("express").Router();
const { Workout } = require("../../models/workout");

// create workout
router.post("/api/workouts", async ({ body }, res) => {
  try {
    const workout = await Workout.create(body);
    console.log(workout);
    if (workout) {
      res.status(200).json(workout);
      console.log(workout);
    }
  } catch (err) {
    console.log(err);
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
    console.log(update);
    res.status(200).json(update);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

// View the total duration of each workout from the past seven workouts on the stats page
// View the combined weight of multiple exercises from the past seven workouts on the stats page
router.get("/api/workouts/range", async ({ body }, res) => {
  try {
    let workouts = await Workout.find({});
    workouts = await Workout.aggregate([
      {
        $addFields: {
          totalDuration: { $sum: "$exercises.duration" },
        },
      },
    ]);
    if (workouts) {
      console.log("previous workouts Dashboard: ", workouts);
      res.status(200).json(workouts);
    }
  } catch (err) {
    console.log(err);
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
      console.log("last workout: ", workout);
      res.status(200).json(workout);
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
