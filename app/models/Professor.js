// models/Professor.js
import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  rating: { type: Number, min: 1, max: 5 },
  comment: { type: String },
  date: {
    type: Date,
    default: () =>
      new Date(
        new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
      ),
  },
});

const professorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  department: { type: String },
  gender: {
    type: String,
    enum: ["Male", "Female"],
    required: true,
  },
  title: {
    type: String,
    enum: [
      "Assistant Professor",
      "Associate Professor",
      "Professor",
      "Ph.D. Scholar",
    ],
    required: true,
  },
  image: { type: String },
  college: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "College",
    required: true,
  },
  date: {
    type: Date,
    default: () =>
      new Date(
        new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
      ),
  },
  subjects: [{ type: String }], // Array of subjects the professor teaches
  feedbacks: [feedbackSchema], // Array of feedback objects
});

// module.exports = mongoose.model("Professor", professorSchema);
const Professor =
  mongoose.models.Professor || mongoose.model("Professor", professorSchema);

export default Professor;
