// models/College.js
import mongoose from "mongoose";

const countSchema = new mongoose.Schema({
  count: { type: Number},
});

const Count =
  mongoose.models.Count || mongoose.model("Count", countSchema);

export default Count;
// module.exports = mongoose.model("Count", countSchema);
