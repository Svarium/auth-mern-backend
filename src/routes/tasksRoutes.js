import express from "express";
import { createTask, deleteTask, getOneTask, getTasks, updateTask } from "../controllers/task/taskController.js";
import {protect} from "../middleware/authMiddleware.js"

const router = express.Router();

router.post("/task/create",protect, createTask);

router.get("/tasks", protect, getTasks);

router.get("/task/:id", protect, getOneTask);

router.patch("/update-task/:id", protect, updateTask);

router.delete("/delete-task/:id", protect, deleteTask);


export default router;