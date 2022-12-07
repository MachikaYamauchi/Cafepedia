import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";

import { createCafe, getCafes, getCafe, deleteCafe, updateCafe, getCafesByUser, getCafesBySearch, getCafesByTag } from "../controllers/cafe.js";

// NO auth
router.get("/search", getCafesBySearch);
router.get("/tag/:tag", getCafesByTag);
router.get("/", getCafes);
router.get("/:id", getCafe);

// auth
router.post("/", auth,  createCafe); // only logged in user can access
router.delete("/:id", auth, deleteCafe);
router.patch("/:id", auth, updateCafe);
router.get("/userCafes/:id", auth, getCafesByUser); // only logged in user can access


export default router;