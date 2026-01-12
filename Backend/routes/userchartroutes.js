import express from "express";
import { getAssignedChart } from "../controllers/userchartcontroller.js";

const userchartrouter = express.Router();

userchartrouter.get("/userassignedchart", getAssignedChart);

export default userchartrouter;
