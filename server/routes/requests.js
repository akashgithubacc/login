import express from "express";
import {
  handleSignIn,
  handleLogIn,
  handleCustomers,
  handleAdminData,
} from "../controllers/handles.js";
const router = express.Router();

router.post("/signin", handleSignIn);
router.post("/login", handleLogIn);
router.post("/customers", handleCustomers);
router.get("/admin", handleAdminData);

export default router;
