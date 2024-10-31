import express from "express";
import { loginUser, registerUser } from "../controllers/auth/userControllers.js"; //AGREGAR LA EXTENSIÓN EN LAS IMPORTACIONES DE MODULOS


const router = express.Router();

router.post("/register", registerUser)
router.post("/login", loginUser)

export default router;