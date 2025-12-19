

import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import login from "../assets/Login2.png";

const apiurl = import.meta.env.VITE_API_URL;

const Verifyotp = ({ title }) => {
  useEffect(() => {
    document.title = title || "Verify OTP";
  }, [title]);

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputsRef = useRef([]);
  const email = localStorage.getItem("resetEmail");
  const navigate = useNavigate();

  const handleChange = (element, index) => {
    if (/^[0-9]?$/.test(element.value)) {
      const newOtp = [...otp];
      newOtp[index] = element.value;
      setOtp(newOtp);

      // move focus to next input
      if (element.value && index < 5) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (otpValue.length < 6) {
      toast.error("Please enter the complete OTP", { position: "top-right" });
      return;
    }

    try {
      const { data } = await axios.post(`${apiurl}/api/auth/verifyforgototp`, {
        email,
        otp: otpValue,
      });
      toast.success(data.message, { position: "top-right" });
      localStorage.setItem("resetOTP", otpValue);
      navigate("/reset-password");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP", {
        position: "top-right",
      });
    }
  };

  return (
    <div className="login-container">
      <div className="login-left d-flex flex-column justify-content-center p-5 align-items-center">
        <h1 className="fw-bold mb-4 text-white">Verify OTP</h1>
        <p className="text-light mb-4">Enter the OTP sent to your email.</p>

        <form onSubmit={handleVerifyOtp} style={{ maxWidth: "400px", width: "100%" }}>
          <div className="d-flex justify-content-between mb-3">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                className="form-control form-control-lg text-center mx-1"
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputsRef.current[index] = el)}
                style={{ width: "3rem", height: "3rem", fontSize: "1.5rem" }}
              />
            ))}
          </div>

          <div className="d-flex align-items-center justify-content-center">
            <button className="btn btn-light btn-xs mb-2">Verify OTP</button>
          </div>

          <p className="mt-2 text-light small text-center">
            Back to{" "}
            <NavLink to="/" className="text-decoration-none text-white">
              Login
            </NavLink>
          </p>
        </form>
      </div>

      <div className="login-right">
        <img src={login} className="image-placeholder" />
      </div>

      <ToastContainer />
    </div>
  );
};

export default Verifyotp;
