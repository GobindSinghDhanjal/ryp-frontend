// models/College.js
import mongoose from "mongoose";

const collegeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String },
  establishedYear: { type: Number },
  image: { type: String },
  university: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "University",
    required: true,
  },
  date: {
    type: Date,
    default: () =>
      new Date(
        new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
      ),
  },
});
const College =
  mongoose.models.College || mongoose.model("College", collegeSchema);

export default College;
// module.exports = mongoose.model("College", collegeSchema);
