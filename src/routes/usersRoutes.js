import express from "express";
import { getUser, loginUser, logoutUser, registerUser, updateUser } from "../controllers/auth/userControllers.js"; //AGREGAR LA EXTENSIÓN EN LAS IMPORTACIONES DE MODULOS
import { adminMiddleware, creatorMiddleware, protect } from "../middleware/authMiddleware.js";
import { deleteUser, getAllUsers } from "../controllers/auth/adminController.js";


const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/user", protect,  getUser);
router.patch("/users", protect, updateUser)


//admin routes
router.delete("/admin/users/:id", protect, adminMiddleware, deleteUser)

//get all users
router.get("/admin/users", protect, creatorMiddleware, getAllUsers)


export default router;