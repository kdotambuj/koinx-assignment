import express from "express";
import { getStats } from "../controllers/crypto.controller.js";


const router = express.Router();

router.route("/stats").get(getStats)

export default router