import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import login from "../assets/Login2.png";


const apiurl = import.meta.env.VITE_API_URL;

const ResetPassword = ({ title }) => {
  useEffect(() => {
    document.title = title || "Reset Password";
  }, [title]);

  const [newPassword, setNewPassword] = useState("");
  const email = localStorage.getItem("resetEmail");
  const otp = localStorage.getItem("resetOTP");

  const navigate=useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!newPassword) {
      toast.error("Password is required", { position: "top-right" });
      return;
    }

    try {
      const { data } = await axios.post(`${apiurl}/api/auth/resetpassword`, {
        email,
        otp,
        newPassword,
      });

      toast.success(data.message, { position: "top-right" });

      setTimeout(() => {
     navigate("/")
      }, 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error resetting password", {
        position: "top-right",
      });
    }
  };

  return (
    <div className="login-container">
      <div className="login-left d-flex flex-column justify-content-center p-5 align-items-center">
         <img src="https://storage.googleapis.com/my-react-image-bucket-123/DS_Logos/Logo_Favicon/Zentra_Favicon.png" height="50"/>
        <h1 className="fw-bold mb-4 text-white">Reset Password</h1>
        <p className="text-light mb-4">Enter your new password.</p>

        <form onSubmit={handleResetPassword} style={{ maxWidth: "400px", width: "100%" }}>
          <div className="mb-3">
            <input
              type="password"
              className="form-control form-control-lg"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div className="d-flex align-items-center justify-content-center">
            <button className="btn btn-light btn-xs mb-2">Reset Password</button>
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

export default ResetPassword;
