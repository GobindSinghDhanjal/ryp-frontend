import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: false,
    },
    message: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: () =>
        new Date(
          new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
        ),
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Notification ||
  mongoose.model("Notification", notificationSchema);
