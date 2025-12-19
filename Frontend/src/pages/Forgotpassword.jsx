import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink } from "react-router-dom";
import login from "../assets/Login2.png";
import { useNavigate } from "react-router-dom";

const apiurl = import.meta.env.VITE_API_URL;

const ForgotPassword = ({ title }) => {
  useEffect(() => {
    document.title = title || "Forgot Password";
  }, [title]);

  const [email, setEmail] = useState("");

  const navigate=useNavigate()

  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email is required", { position: "top-right" });
      return;
    }

    try {
      const { data } = await axios.post(`${apiurl}/api/auth/forgotpassword`, { email });

      toast.success(data.message, { position: "top-right" });

      // Move to OTP verification page
      localStorage.setItem("resetEmail", email);
      navigate("/forgototpverification");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error sending OTP", {
        position: "top-right",
      });
    }
  };

  return (
    <div className="login-container">
      <div className="login-left d-flex flex-column justify-content-center p-5 align-items-center">
        <h1 className="fw-bold mb-4 text-white">Forgot Password</h1>
        <p className="text-light mb-4">Enter your email to receive an OTP.</p>

        <form onSubmit={handleSendOtp} style={{ maxWidth: "400px", width: "100%" }}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="name@datasolve-analytics.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="d-flex align-items-center justify-content-center">
            <button className="btn btn-light btn-xs mb-2">Send OTP</button>
          </div>

          <p className="mt-2 text-light small text-center">
            Remember password?{" "}
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

export default ForgotPassword;
