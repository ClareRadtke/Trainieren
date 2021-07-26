const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
  day: {
    type: Date,
    default: Date.now,
  },
  exercises: [
    {
      type: { type: String, required: "Select the type of exercise" },
      name: { type: String, required: "Enter the name of the exercise" },
      duration: { type: Number, required: "Enter the duration" },
      weight: { type: Number },
      reps: { type: Number },
      sets: { type: Number },
    },
  ],
  intensity: {
    type: Number,
    max: 10,
  },
});

//export model
const Workout = mongoose.model("Workout", workoutSchema);
module.exports.Workout = Workout;
