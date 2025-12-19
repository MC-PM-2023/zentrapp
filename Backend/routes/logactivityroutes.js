import express from "express";
import { getLoginActivity } from "../controllers/logactivitycontroller.js";

const logrouter = express.Router();

logrouter.get("/activity", getLoginActivity);

export default logrouter;
