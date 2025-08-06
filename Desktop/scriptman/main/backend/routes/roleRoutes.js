import express from "express";
import { createRole, getRoles, getRole } from "../controller/roleController.js";

const roleRoutes = express.Router();

roleRoutes.post("/role", createRole);
roleRoutes.get("/role", getRoles);
roleRoutes.get("/role/:id", getRole);

export default roleRoutes;