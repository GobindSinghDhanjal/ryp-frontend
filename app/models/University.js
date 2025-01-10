// models/University.js
import mongoose from "mongoose";

const universitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String,},
  location: { type: String, },
  establishedYear: { type: Number },
  website: { type: String },
  contactEmail: { type: String },
  contactPhone: { type: String },
  accreditation: { type: String },
  programsOffered: [{ type: String }],
  campusSize: { type: String },
  date: {
    type: Date,
    default: () =>
      new Date(
        new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
      ),
  },
  studentsEnrolled: { type: Number },
  image: { type: String }
});

const University =
  mongoose.models.University || mongoose.model("University", universitySchema);

export default University;

// module.exports = mongoose.model('University', universitySchema);
