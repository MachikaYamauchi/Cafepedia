import express from "express";
const router = express.Router();

import { createCafe, getCafe } from "../controllers/cafe.js";

router.post("/", createCafe);
router.get("/", getCafe)



export default router;