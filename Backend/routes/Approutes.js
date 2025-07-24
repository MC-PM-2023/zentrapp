import express from 'express'
import { createapp, getappsbyteam} from '../controllers/appcontroller.js';

const Approuter=express.Router();

Approuter.post("/addapp",createapp)
Approuter.get("/:team",getappsbyteam)

export default Approuter;