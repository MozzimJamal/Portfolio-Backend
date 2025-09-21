import Project from "../models/Project.js";
import multer from "multer";
import path from "path";

// Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // folder backend me
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

export const upload = multer({ storage });

export const uploadProjectImage = upload.single("image"); // image file key





// @desc    Get all projects
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Create new project
export const createProject = async (req, res) => {
  try {
    const { title, description, videoUrl, projectLink ,category } = req.body;
     const image = req.file ? `/uploads/${req.file.filename}` : ""; // path save

    const project = new Project({ title, description, videoUrl, projectLink ,category,image});
    const savedProject = await project.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(400).json({ message: "Invalid Project Data" });
  }
};

// @desc    Update project
export const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    project.title = req.body.title || project.title;
    project.description = req.body.description || project.description;
    project.videoUrl = req.body.videoUrl || project.videoUrl;
    project.projectLink = req.body.projectLink || project.projectLink;
    project.category = req.body.category || project.category;
    project.image = req.body.image || project.image;

    const updatedProject = await project.save();
    res.json(updatedProject);
  } catch (error) {
    res.status(400).json({ message: "Update failed" });
  }
};

// @desc    Delete project
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    await project.deleteOne();
    res.json({ message: "Project removed" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
};
