
import express from 'express';

import { heroSectionController } from '../controllers/herosectioncontroller.js';

export const Herorouter=express.Router();


Herorouter.get("/usersectionlogos",heroSectionController);


