// models/Course.js
import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  description: String,
  duration: Number,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Course", courseSchema);
