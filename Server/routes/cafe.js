import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";

import { createCafe, getCafe } from "../controllers/cafe.js";

router.post("/", auth,  createCafe);
router.get("/", getCafe)



export default router;