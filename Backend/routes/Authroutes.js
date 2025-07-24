import express from 'express';
import { signup ,login, otpverification,validateSSOToken} from '../controllers/authcontroller.js';
const AuthRouter=express.Router();


AuthRouter.post('/signup',signup)
AuthRouter.post('/verifyotp',otpverification)
AuthRouter.post("/login",login)
AuthRouter.get("/validatetoken", validateSSOToken);

export default AuthRouter;