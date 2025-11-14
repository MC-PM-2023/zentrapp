import express from 'express';
import { signup ,login, otpverification,validateSSOToken} from '../controllers/authcontroller.js';

 const Authrouter=express.Router();


Authrouter.post('/signup',signup)
Authrouter.post('/verifyotp',otpverification)
Authrouter.post("/login",login)
Authrouter.get("/validatetoken", validateSSOToken);


export default Authrouter;