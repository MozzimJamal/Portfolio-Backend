import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    image: { type: String }, // <-- added image URL
    videoUrl: { type: String },
    projectLink: { type: String },
    category: {
      type: String,
      enum: ["Web", "App", "Other"],
      default: "Other",
      required: true,
    },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);
export default Project;
