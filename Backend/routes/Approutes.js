// import express from 'express'
// import { createapp, getappsbyteam} from '../controllers/appcontroller.js';

// const Approuter=express.Router();

// Approuter.post("/addapp",createapp)
// Approuter.get("/:team",getappsbyteam)

// export default Approuter;



import express from "express";
import { createApp,editApp,deleteApp ,assignApp, getMyApps, getAllApps, unassignApp, updateAssignedApps } from "../controllers/appcontroller.js";
import {authenticate} from '../middleware/authenticate.js'

const Approuter = express.Router();

// Admin routes
Approuter.post("/add", authenticate,createApp);          // Add app
Approuter.put("/edit/:appId",authenticate,editApp) //Edit app
Approuter.delete("/delete/:appId",authenticate,deleteApp) //Delete app
Approuter.post("/assign", authenticate,assignApp);      // Assign app to user by email
Approuter.post("/unassign",authenticate, unassignApp); //not in frontend check that

// Replace all assigned apps (edit button)
Approuter.put("/update-assigned/:id",authenticate, updateAssignedApps);
// User route
Approuter.get("/myapps",getMyApps); // Get apps assigned to logged-in user
// Approuter.get("/getallapps",getAllApps)
Approuter.get("/getallapps", authenticate,getAllApps);


// Approuter.post("/add", authenticate, createApp);

// Approuter.put("/edit/:appId", authenticate, editApp);

// Approuter.delete("/delete/:appId", authenticate, deleteApp);

// Approuter.post("/assign", authenticate, assignApp);

// Approuter.post("/unassign", authenticate, unassignApp);

// Approuter.put("/update-assigned/:id", authenticate, updateAssignedApps);

// // user routes (need login too)
// Approuter.get("/myapps", authenticate, getMyApps);

// Approuter.get("/getallapps", authenticate, getAllApps);


export default Approuter;




