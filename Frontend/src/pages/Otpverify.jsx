// import React, { useEffect, useState } from 'react'
// import { useLocation, useNavigate } from 'react-router-dom'
// import axios from 'axios';
// import { toast ,ToastContainer} from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'




// const apiurl=import.meta.env.VITE_API_URL;
// // console.log(apiurl);

// const Otpverify = ({title}) => {

//   useEffect(()=>{
// document.title=title;
//   })

//     const navigate=useNavigate()

//     const location=useLocation();

//     const email=location.state?.email ||""
//     // console.log("Received email:",email)


// const[otp,setOTP]=useState("")

// const handleotpchange=(e)=>{
//     setOTP(e.target.value)
// }

// const handleotp=async(e)=>{
// e.preventDefault();
// try{
//     const response=await axios.post(`${apiurl}/api/auth/verifyotp`,
//         {
//             email:email,
//             otp:otp
//         }
//     )
//     console.log(response.data)
//     toast.success("Your OTP Verification successful!")
//    setTimeout(()=>{
//     navigate("/")
//    },3000)
    

// }
// catch(error){
//     console.log("Error in OTP component:",error)
//     toast.error("OTP Verification error Please Try again !")
// }
// }

//   return (
//     <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
//       <div className="card shadow-lg p-4" style={{ width: "400px" }}>
//         <h4 className="text-center mb-3">OTP Verification</h4>
//         <p className="text-muted text-center">
//           Enter the OTP sent to your {email}
//         </p>
//         <form onSubmit={handleotp} >
//           <div className="mb-3">
//             <input
//               type="text"
//               className="form-control text-center "
//               placeholder="Enter OTP"
//               maxLength="6"
//               value={otp}
//               onChange={handleotpchange}
//               required
//             />
//           </div>
//           <button className="btn btn-primary w-100">Verify OTP</button>
//         </form>
//         {/* <div className="text-center mt-3">
//           <small className="text-muted">Didn't receive the OTP? </small>
//           <button className="btn btn-link p-0">Resend</button>
//         </div> */}
//       </div>
//       <ToastContainer/>
//     </div>
//   )
// }

// export default Otpverify;


import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import login from "../assets/Login2.png";

const apiurl = import.meta.env.VITE_API_URL;

const Otpverify = ({ title }) => {
  useEffect(() => {
    document.title = title;
  }, []);

  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  // --- OTP as array of 6 boxes ---
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return; // only digits allowed

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // auto-focus next box
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // backspace auto-focus previous field
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const handleotp = async (e) => {
    e.preventDefault();

    const finalOtp = otp.join(""); // convert array → string

    try {
      const response = await axios.post(`${apiurl}/api/auth/verifyotp`, {
        email: email,
        otp: finalOtp,
      });

      toast.success("Your OTP Verification was successful!");

      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      console.log("Error in OTP component:", error);
      toast.error("OTP Verification failed. Please try again!");
    }
  };

  return (
    <div className="login-container">
      <div className="login-left d-flex flex-column justify-content-center p-5 align-items-center">
         <img src="https://storage.googleapis.com/my-react-image-bucket-123/DS_Logos/Logo_Favicon/Zentra_Favicon.png" height="50"/>
        <h1 className="fw-bold mb-4 text-white">OTP Verification</h1>

        <p className="text-light text-white">
          Enter the OTP sent to your {email}
        </p>

        <form onSubmit={handleotp}>
          {/* OTP INPUT BOXES */}
          <div className="d-flex justify-content-center mb-4 gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength="1"
                className="form-control text-center"
                style={{
                  width: "50px",
                  height: "55px",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                }}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                required
              />
            ))}
          </div>

          <div className="d-flex align-items-center justify-content-center">
            <button className="btn btn-primary w-100">Verify OTP</button>
          </div>
        </form>
      </div>

      <div className="login-right">
        <img src={login} className="image-placeholder" />
      </div>

      <ToastContainer />
    </div>
  );
};

export default Otpverify;
