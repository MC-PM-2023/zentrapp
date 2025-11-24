import express from 'express';
import { signup ,login, otpverification,validateSSOToken, forgotPassword, resetPassword, verifyForgotOtp} from '../controllers/authcontroller.js';

 const Authrouter=express.Router();


Authrouter.post('/signup',signup)
Authrouter.post('/verifyotp',otpverification)
Authrouter.post("/login",login)
Authrouter.get("/validatetoken", validateSSOToken);
Authrouter.post('/forgotpassword',forgotPassword);
Authrouter.post("/verifyforgototp", verifyForgotOtp)
Authrouter.post('/resetpassword',resetPassword)

export default Authrouter;