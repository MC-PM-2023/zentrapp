import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized = ({title}) => {



  useEffect(()=>{
    document.title=title;
  })
  const navigate = useNavigate();

  const handleAuthorized = () => {
    navigate("/");
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4 text-center" style={{ maxWidth: "400px" }}>
        <div className="card-body">
            <p className="text-center"><i class="bi bi-person-fill-lock fs-1"></i></p>
          <h2 className="text-danger fw-bold">Permission Denied</h2>
          <p className="text-muted">You do not have access to this area of the application.</p>
          <button 
            className="btn btn-danger w-100 mt-3" 
            onClick={handleAuthorized}
          >
            Go Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
