import { Router } from "express";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  getUsersByRole,
  updateUserDirection,
  updateUserBalance,
  updateUserPrice,
  updateUserPendingContract,
} from "../controllers/usersController.ts";
import upload from "../config/upload.ts";
const router = Router();

//Create user in DB
router.post("/users", createUser);

//Get all users
router.get("/users", getUsers);

//Get users by id
router.get("/users/id/:id", getUserById);

//Get users by role
router.get("/users/role/:role", getUsersByRole);

//Update user balance
router.put("/users/balance/:id", updateUserBalance);

//Update user price
router.put("/users/price/:id", updateUserPrice);

//Update user direction
router.put("/users/address/:id", updateUserDirection);

//Update user profile (bio and/or profilePic)
router.put("/users/:id", upload.single("profilePic"), updateUser);

//Update user pendingContract status
router.put("/users/pendingContract/:id", updateUserPendingContract);

export default router;
