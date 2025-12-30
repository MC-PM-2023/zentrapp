import express from 'express'
import {  approvedusersaccount,getapproveduseraccounts, getpendinguserslist, getrejecteduserslist, rejectedusersaccount,getrolesdropdown, updateapproveuserslist ,updateapproveusersliststatus } from '../controllers/admincontroller.js';

const Adminrouter=express.Router();



Adminrouter.post("/approvedusers",approvedusersaccount) //worked approve by admin if the user signup
Adminrouter.get("/getapprovedusers",getapproveduseraccounts) //worked display approved users in admin side
Adminrouter.get("/getpendingusers",getpendinguserslist) //worked display pending users in admin side
Adminrouter.post("/rejectedusers",rejectedusersaccount) //worked but it doesnt delete mysql table but change rejected in status
Adminrouter.get("/getrejectedusers",getrejecteduserslist) //worked rejected users
Adminrouter.get("/getroles",getrolesdropdown) //getting roles in admin side
Adminrouter.put("/updateapproveusers",updateapproveuserslist) //update the approved list reject by admin
Adminrouter.put("/updategetapprovedusersstatus",updateapproveusersliststatus)

export default Adminrouter;