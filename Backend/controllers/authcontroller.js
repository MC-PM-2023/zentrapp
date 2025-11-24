import express from 'express';
import bcrypt from 'bcryptjs'
import { approveuserafterotp, createuser,getUserByEmail, getUserProfileByEmail, verifyotp ,verifyResetOtp,requestPasswordReset,updatePassword } from '../models/authmodel.js';
import jwt from 'jsonwebtoken'
import { generateotp, isvaliddomain, sendotpmail } from '../utils/email.js';
export const signup=async (req,res)=>{

    const {username,email,password}=req.body;
    if(!username || !email || !password){
        return res.status(400).json({message:"All fields are required "})
    }

    if(!isvaliddomain(email)){
        return res.status(400).json({message:"Datasolve Analytics Email Domain are Allowed"})
    }

    try{
        const existinguser=await getUserByEmail(email);
if(existinguser){
    return res.status(409).json({message:"User Already exists"})
}

const hashedpassword=await bcrypt.hash(password,10)
const otp=generateotp();

const emailsent=await sendotpmail(email,otp)
if(!emailsent){
    return res.status(500).json({message:"Failed to Send OTP: ",error})
}
await createuser(username,email,hashedpassword,otp)

return res.status(201).json({message:"OTP sent successfully. Please verify OTP to complete signup."})
    }
    catch(error){
       // console.log("Error in Signup authcontroller:",error)
        return res.status(500).json({message:"Error in Signup Controller:",error:error})
    }

}

//otpverification

export const otpverification=async(req,res)=>{

    const {email,otp}=req.body;
    if(!email || !otp){
        return res.status(400).json({message:"All fields are Required !"})
    }
    try{

        const user=await verifyotp(email,otp);
        if(!user){
            return res.status(400).json({message:"User not found or OTP is incorect!"})
        }
        await approveuserafterotp(email);
        return res.status(200).json({ message: "OTP verified successfully. Signup is successful. Waiting for admin approval." });
    }
    catch(error){
       // console.log("Error in otpverification Auth controller:",error)
        return res.status(400).json({message:"Error in OTP Verification controller:",error:error.message})
    }
}

export const login=async(req,res)=>{

    const {email,password}=req.body;

    if(!email || !password){
        return res.status(400).json({message:"All fields are required "})
    }

    try{

        const user=await getUserByEmail(email)
if(!user) {
    return res.status(400).json({message:"User not Found"})
}
if(user.status!="approved"){
    return res.status(403).json({message:`${user.username} Account not Approved by admin`})
}

const ispasswordvalid=await bcrypt.compare(password,user.password)
//console.log(ispasswordvalid)
        if(!ispasswordvalid){
            return res.status(401).json({message:"Invalid credentials",error:error.message})
        }

          const profilelink = await getUserProfileByEmail(email);

        const token=jwt.sign({userid:user.id, role:user.role,username: user.username,email:user.email,profilelink:profilelink},process.env.JWT_SECRET,{expiresIn:"1h"})
      
        return res.status(200).json({message:"Login successful",token,role:user.role,username:user.username,email:user.email,profilelink:profilelink})
    }
    catch(error){
//console.log("Error in Login controller:",error)
        return res.status(500).json({message:"Error in Login controller:",error:error})
    }

}

export const validateSSOToken = (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).json({
      valid: true,
      user: decoded,
    });
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};


export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    try {
        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const otp = generateotp();

        const emailSent = await sendotpmail(email, otp);
        if (!emailSent) {
            return res.status(500).json({ message: "Failed to send OTP email" });
        }

        await requestPasswordReset(email, otp);

        return res.status(200).json({ 
            message: "OTP sent to your email for password reset." 
        });

    } catch (error) {
        return res.status(500).json({ 
            message: "Error in forgot password controller", 
            error: error.message 
        });
    }
};

// =============================
//       VERIFY RESET OTP
// =============================
export const verifyForgotOtp = async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ message: "Email and OTP are required" });
    }

    try {
        const user = await verifyResetOtp(email, otp);

        if (!user) {
            return res.status(400).json({ message: "Invalid OTP or email" });
        }

        return res.status(200).json({ 
            message: "OTP verified. You can reset your password now." 
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error in OTP verification",
            error: error.message
        });
    }
};

// =============================
//       RESET PASSWORD
// =============================
export const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const user = await verifyResetOtp(email, otp);
        if (!user) {
            return res.status(400).json({ message: "Invalid OTP or email" });
        }

        const hashed = await bcrypt.hash(newPassword, 10);

        await updatePassword(email, hashed);

        return res.status(200).json({
            message: "Password reset successful."
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error resetting password",
            error: error.message
        });
    }
};
