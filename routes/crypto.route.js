import express from "express";
import { getStats,getDeviation } from "../controllers/crypto.controller.js";



const router = express.Router();

router.route("/stats").get(getStats)
router.route("/deviation").get(getDeviation);

export default router