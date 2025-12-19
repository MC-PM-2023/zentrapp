// import express from 'express';
// import { approveuser, getapproveusers, getpendinguser, getrejectuser, getRoles, getuserbyId, rejectuser,updateapproveduser } from '../models/authmodel.js';
// import { sendapprovemail } from '../utils/email.js';




// export const approvedusersaccount=async(req,res)=>{

//   try{
//     const{id,role}=req.body;
//     // console.log("userid,role:",req.body)

//     if(!id || !role ){
//         return res.status(400).json({message:"All fields are required "})
//     }
//     const users=await approveuser(id,role)

//     const user=await getuserbyId(id)
//     if(!user){
// return res.status(400).json({message:"User not found !"})
//     }
//     await sendapprovemail(user.username,user.email,role)

//     return res.status(200).json({message:`User Approved Successfully !`})
//   }
//   catch(error){
//     console.log("Error in approvedusersaccount controller:",error)
//     return res.status(400).json({message:"Error in Approve user controller:",error:error.message})
//   }
  
// }

// export const getapproveduseraccounts=async(req,res)=>{

//     try{
//        const approvedaccounts= await getapproveusers();
//         return res.status(200).json(approvedaccounts)

//     }
//     catch(error){
//         console.log("Error in getapprovedaccounts controller:",error)
//         return res.status(400).json({message:"Error in Get approved usersaccount:",error:error.message})
//     }
// }


// export const getpendinguserslist=async(req,res)=>{

//     try{
//         const getpendingusers=await getpendinguser();
//         return res.status(200).json(getpendingusers)
        
//     }
//     catch(error){
//         console.log("Error in Getpendinguserslist controller:",error)
//         return res.status(400).json({message:"Error in fetching Getpendingusers:",error})
//     }

// }


// export const rejectedusersaccount=async(req,res)=>{
    
//     try{
//         const {id}=req.body;
//         if(!id){
//             return res.status(400).json({message:"All fields are required "})
//         }
//         await rejectuser(id);
//         return res.status(200).json({message:"User Rejected Successfully !"})
        
//     }
//     catch(error){
//         console.log("Error in rejectedusers account:",error)
//         return res.status(400).json({message:"Error in rejectusersaccount controller",error:error.message})

//     }
// }



// export const getrejecteduserslist=async(req,res)=>{
//     try{

// const getrejectusers=await getrejectuser();
// return res.status(200).json(getrejectusers)

//     }
//     catch(error){
//         console.log("Error in getrejecteduserslist controller:",error)
//         return res.status(400).json({message:"Error in getrejecteduserslist controller:",error:error.message})
//     }
// }


// export const getrolesdropdown=async(req,res)=>{
// try{
//     const getcolumnroles=await getRoles();
//     return res.status(200).json(getcolumnroles)
// }
// catch(error){
//     console.log("Error in Getroles Dropdown controller",error)
//     return res.status(400).json({message:"Error in Getroles controller:",error:error.message})
// }
// }

// export const updateapproveuserslist=async(req,res)=>{

//     const{id}=req.body;
//     if(!id){
//         return res.status(400).json({message:'Id is Required !'})
//     }
//     try{
//        const result= await updateapproveduser(id);
//        if (result.affectedRows === 0) {
//         return res.status(404).json({ success: false, message: "User not found or already rejected" });
//     }
//     return res.status(200).json({message:"User updated Successfully!"})
//     }
//     catch(error){
//         console.log("Error in updateapproveuserslist controller:",error)
//         return res.status(500).json({message:"Error in Updateapproveuserslist controller:",error:error.message})
//     }
   

// }


import {
  approveuser,
  getapproveusers as getApprovedZentraUsers,
  getpendinguser as getPendingZentraUsers,
  getrejectuser as getRejectedZentraUsers,
  getRoles as getZentraRoles,
 getuserbyId as getZentraUserById,
  rejectuser as rejectZentraUser,
  updateapproveduser as updateApprovedZentraUserStatus
} from "../models/authmodel.js";

import { sendapprovemail } from "../utils/email.js";


// ===============================
//   APPROVE USER
// ===============================
export const approvedusersaccount = async (req, res) => {
  try {
    const { id, role } = req.body;

    if (!id || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Only Admin role allowed
    if (role !== "Admin" && role !== "User") {
      return res.status(400).json({ message: "Invalid role" });
    }


    const user = await getZentraUserById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
        await  approveuser(id,role)
  

    await sendapprovemail(user.username, user.email, role);

    return res.status(200).json({ message: "User approved successfully!" });

  } catch (error) {
    console.error("Error approving user:", error);
    return res.status(500).json({
      message: "Error in approvedusersaccount controller",
      error: error.message,
    });
  }s
};


// ===============================
//   GET APPROVED USERS
// ===============================
export const getapproveduseraccounts = async (req, res) => {
  try {
    const approvedUsers = await getApprovedZentraUsers();
    return res.status(200).json(approvedUsers);
  } catch (error) {
    console.error("Error getting approved users:", error);
    return res.status(500).json({
      message: "Error in getapproveduseraccounts controller",
      error: error.message,
    });
  }
};


// ===============================
//   GET PENDING USERS
// ===============================
export const getpendinguserslist = async (req, res) => {
  try {
    const users = await getPendingZentraUsers();
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error getting pending users:", error);
    return res.status(500).json({
      message: "Error fetching pending users",
      error: error.message,
    });
  }
};


// ===============================
//   REJECT USER
// ===============================
export const rejectedusersaccount = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    await rejectZentraUser(id);

    return res.status(200).json({ message: "User rejected successfully!" });

  } catch (error) {
    console.error("Error rejecting user:", error);
    return res.status(500).json({
      message: "Error in rejectedusersaccount controller",
      error: error.message,
    });
  }
};


// ===============================
//   GET REJECTED USERS
// ===============================
export const getrejecteduserslist = async (req, res) => {
  try {
    const rejected = await getRejectedZentraUsers();
    return res.status(200).json(rejected);
  } catch (error) {
    console.error("Error fetching rejected users:", error);
    return res.status(500).json({
      message: "Error in getrejecteduserslist controller",
      error: error.message,
    });
  }
};


// ===============================
//   DROPDOWN ROLES
// ===============================
export const getrolesdropdown = async (req, res) => {
  try {
    const roles = await getZentraRoles();
    return res.status(200).json(roles);
  } catch (error) {
    console.error("Error fetching roles:", error);
    return res.status(500).json({
      message: "Error in getrolesdropdown controller",
      error: error.message,
    });
  }
};


// ===============================
//   UPDATE APPROVED → REJECTED
// ===============================
export const updateapproveuserslist = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: "ID is required!" });
    }

    const result = await updateApprovedZentraUserStatus(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "User not found or already rejected",
      });
    }

    return res.status(200).json({ message: "User updated successfully!" });

  } catch (error) {
    console.error("Error in updateapproveuserslist:", error);
    return res.status(500).json({
      message: "Error in updateapproveuserslist controller",
      error: error.message,
    });
  }
};
