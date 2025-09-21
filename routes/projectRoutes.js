import express from "express";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  uploadProjectImage, // <-- new

} from "../controllers/projectController.js";

const router = express.Router();

router.get("/", getProjects);       // GET all projects
router.post("/", uploadProjectImage, createProject); // <-- middleware
router.put("/:id", uploadProjectImage, updateProject); // <-- middleware
router.delete("/:id", deleteProject); // DELETE project

export default router;
