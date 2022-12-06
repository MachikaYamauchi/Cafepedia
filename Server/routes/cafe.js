import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";

import { createCafe, getCafes, getCafe } from "../controllers/cafe.js";

router.post("/", auth,  createCafe);
router.get("/", getCafes);
router.get("/:id", getCafe);



export default router;