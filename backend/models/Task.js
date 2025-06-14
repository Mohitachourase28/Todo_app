import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    dueDate: Date,
    priority: { type: String, enum: ["Low", "Medium", "High"] },
    category: String,
    status: {
      type: String,
      enum: ["Pending", "Completed"],
      default: "Pending",
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
