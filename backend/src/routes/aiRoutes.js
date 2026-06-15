import express from "express";
import { fixCode } from "../controller/aiController.js";

const router = express.Router();

router.route("/fix-code").post(fixCode);

export default router;