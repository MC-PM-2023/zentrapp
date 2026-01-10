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
  const email=localStorage.getItem("email")
  const profilelink=localStorage.getItem("profilelink")

  const handlelogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    localStorage.removeItem("email")
    localStorage.removeItem("role")
    alert(`Are you Sure you want to logout ${username} ?`)
    toast.success(`${username} have been Logged out successfully !`)
    navigate("/")
  }
  
  return (
  <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm sticky-top">

  <div className="container-fluid px-3">

    {/* Logo */}
    <a className="navbar-brand d-flex align-items-center" href="/admindashboard">
      <img
        src="https://storage.googleapis.com/my-react-image-bucket-123/DataSolveLogo.jpg"
        alt="Datasolve Analytics"
        height="40"
        className="d-inline-block align-text-top me-2"
      />
    </a>


    {/* Mobile Toggle */}
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav2"
      aria-controls="navbarNav2"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>


    {/* Menu Items */}
    <div className="collapse navbar-collapse" id="navbarNav2">

      <ul className="navbar-nav ms-auto align-items-lg-center gap-3">

        {token && username && profilelink ? (

          <li className="nav-item d-flex align-items-center gap-2">

            {/* User Logo */}
            <a className='navbar-brand d-flex align-items-center' href='/admindashboard'>
              <img
                src="https://storage.googleapis.com/my-react-image-bucket-123/DS_Logos/Logo_Gif/Zentra.gif"
                alt="User Icon"
                height="40"
                className="rounded border"
              />
            </a>

            {/* Profile Dropdown */}
            <div className="dropdown">

              <img
                src={profilelink}
                alt="Profile"
                className="rounded-circle border border-2 shadow-sm"
                height={45}
                width={45}
                role="button"
                data-bs-toggle="dropdown"
                style={{ objectFit:'contain', cursor:'pointer' }}
              />

              <ul
                className="dropdown-menu dropdown-menu-end shadow-lg border-0 p-3"
                style={{ minWidth:'250px', borderRadius:'10px', marginTop:9 }}
              >

                {/* User Info */}
                <li className="d-flex align-items-center mb-2">

                  <img
                    src={profilelink}
                    className="rounded-circle border border-2 me-3"
                    height={50}
                    width={50}
                    style={{ objectFit:'cover' }}
                  />

                  <div>
                    <strong style={{ fontSize:'14px' }}>{username}</strong>
                    <p className="text-muted mb-0" style={{ fontSize:'12px' }}>
                      {email}
                    </p>
                  </div>

                </li>

                <hr className="dropdown-divider" />

                <li>
                  <button
                    className="dropdown-item text-dark d-flex align-items-center gap-2"
                    onClick={handlelogout}
                  >
                    <i className="bi bi-box-arrow-right"></i>
                    Logout
                  </button>
                </li>

              </ul>
            </div>

          </li>

        ) : (

          <li className="nav-item">
            <span className="btn btn-outline-primary btn-sm">Login User</span>
          </li>

        )}

      </ul>
    </div>
  </div>
</nav>

  );
};

export default Adminheader;
