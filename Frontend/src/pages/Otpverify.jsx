import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { toast ,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'




const apiurl=import.meta.env.VITE_API_URL;
// console.log(apiurl);

const Otpverify = ({title}) => {

  useEffect(()=>{
document.title=title;
  })

    const navigate=useNavigate()

    const location=useLocation();

    const email=location.state?.email ||""
    // console.log("Received email:",email)


const[otp,setOTP]=useState("")

const handleotpchange=(e)=>{
    setOTP(e.target.value)
}

const handleotp=async(e)=>{
e.preventDefault();
try{
    const response=await axios.post(`${apiurl}/api/auth/verifyotp`,
        {
            email:email,
            otp:otp
        }
    )
    console.log(response.data)
    toast.success("Your OTP Verification successful!")
   setTimeout(()=>{
    navigate("/login")
   },3000)
    

}
catch(error){
    console.log("Error in OTP component:",error)
    toast.error("OTP Verification error Please Try again !")
}
}

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: "400px" }}>
        <h4 className="text-center mb-3">OTP Verification</h4>
        <p className="text-muted text-center">
          Enter the OTP sent to your {email}
        </p>
        <form onSubmit={handleotp} >
          <div className="mb-3">
            <input
              type="text"
              className="form-control text-center "
              placeholder="Enter OTP"
              maxLength="6"
              value={otp}
              onChange={handleotpchange}
              required
            />
          </div>
          <button className="btn btn-primary w-100">Verify OTP</button>
        </form>
        {/* <div className="text-center mt-3">
          <small className="text-muted">Didn't receive the OTP? </small>
          <button className="btn btn-link p-0">Resend</button>
        </div> */}
      </div>
      <ToastContainer/>
    </div>
  )
}

export default Otpverify;