import React from "react";
import datasolve from '../assets/datasolve.png'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from "react-router-dom";
import zentra from '../assets/Zentra.gif'
const Adminheader = () => {

  const navigate = useNavigate()

  const token = localStorage.getItem("token")
  const username = localStorage.getItem("username")


  const handlelogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    localStorage.removeItem("email")
    localStorage.removeItem("role")
    alert(`Are you Sure you want to logout ${username} ?`)
    toast.success(`${username} have been Logged out successfully !`)
    navigate("/login")
  }
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-light sticky-top shadow">
      <div className="container-fluid">
        {/* Brand Name */}

        <img
          src={datasolve}
          alt="Datasolve Analytics"
          height="50"
          className="d-inline-block align-text-top me-2"
        />
         <img src={zentra} alt="Datasolve Analytics" height="60" className="me-2" />
        {/* Toggle Button for Mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

       
        
             
        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {/* <li className="nav-item">
              <a className="nav-link active" href="#">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Services</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Contact</a>
            </li> */}
            <div className="ms-3">

              <div className="d-flex align-items-center">
                <button className="btn btn-primary me-2">
                  <i className="bi bi-person-circle me-2"></i>
                  {token && username ?
                    username
                    : (
                      <span className="btn btn-primary">Login user</span>
                    )
                  }

                </button>
                <button className="btn btn-danger me-2" onClick={handlelogout}>
                  Logout
                </button>

              </div>


            </div>
          </ul>
         

        </div>
      </div>

    </nav>
  );
};

export default Adminheader;
