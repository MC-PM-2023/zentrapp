
import express from 'express';
import { userProfilesController } from '../controllers/userprofilescontroller.js';

export const userProfilesRouter=express.Router();


userProfilesRouter.get("/getuserprofiles",userProfilesController);


