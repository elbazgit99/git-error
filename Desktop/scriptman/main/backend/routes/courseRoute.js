import express from "express";
import {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} from "../controller/courseController.js";

const courseRouters = express.Router();

courseRouters.get("/courses", getAllCourses);
courseRouters.get("/courses/:id", getCourseById);
courseRouters.post("/courses", createCourse);
courseRouters.delete("/courses/:id", deleteCourse);
courseRouters.patch("/courses/:id", updateCourse);

export default courseRouters;
