import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
// import { Welcome_Email_Template,Verification_Email_Template,Approved_Email_Template} from './emailTemplate.js';

dotenv.config();


export const isvaliddomain=(email)=>{
    const alloweddomain=`@datasolve-analytics.com`
    return email.endsWith(alloweddomain)
}


export const generateotp=()=>{
  return(Math.floor(100000+ Math.random()*900000).toString())
}


export const sendotpmail=async (email,otp)=>{


    const transporter = nodemailer.createTransport({
        host: "smtp.datasolve-analytics.com",
        port: 587,
        auth: {
            user: process.env.GEMAIL,
            pass: process.env.GEMAILPASS
        },
        secure: false,
        tls: {
            rejectUnauthorized: false
        }
    });
    // console.log(process.env.GEMAIL)
  const mailOptions={

    from:process.env.GEMAIL,
    to:email,
    subject:"This is Our Email Verification for Datasolve App",
    text:`Your OTP for signup is:${otp}. It will expires in 10 minutes. `
  }


  try{
    const info = await transporter.sendMail(mailOptions);
    // console.log("Email sent: ", info.response);
    
    return true;
  }
  catch(error){
    console.log("Error in Sending OTP:",error)
    return false;
  }
    }
    

    export const sendapprovemail=async(username,email,role)=>{
try{
  const transporter=nodemailer.createTransport({
    host:"smtp.datasolve-analytics.com",
    auth:{
      user:process.env.GEMAIL,
      pass:process.env.GEMAILPASS
    },
    port:587,
    secure:false,
    tls:{
      rejectUnauthorized:false
    }


  })


let mailOptions={
  from:process.env.GEMAIL,
  to:email,
  subject:"Your Account is Approved !",
  html: `<p>Hi ${username},</p>
  <p>Your signup has been approved by Admin.</p>
  <p>Your role is: <strong>${role}</strong></p>
  <p>You can now log in and access your account.</p>
  <p>Thank you!</p>`
}
await transporter.sendMail(mailOptions)
// console.log(`Approval email is sent ${email} successfully!`)
}
   catch(error){
console.log("Error in sending email:",error)
throw error;
   }  
    }

