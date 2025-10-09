import express from "express";
import {
  createData,
  deleteData,
  getData,
  updatedata,
} from "../controllers/tanstack.controller.js";

const router = express.Router();

router.get("/view", getData);
router.post("/create", createData);
router.delete("/:id", deleteData);
router.put("/:id", updatedata);

export default router;
