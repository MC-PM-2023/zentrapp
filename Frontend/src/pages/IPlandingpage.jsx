
import React, { useEffect } from "react";
import datasolve from '../assets/datasolve.png'
import OurIPTeam from "../components/Ipteammembers";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import zentra from '../assets/Zentra.gif'
import elicitalogo from '../assets/Elicita_Logo.jpg'
import analyticalogo from '../assets/Analytica_Logo.gif'
import dsfilesharelogo from '../assets/dsfilesharelogo.gif'
import logsylogo from '../assets/Logsy.gif'
import fynbacklogo from '../assets/Fynback.gif'

import '../css/iplandingpage.css'
import Footer from "../components/Footer";
function IPlandingpage({title}) {


  const navigate=useNavigate();

  useEffect(()=>{
    document.title=title;
  },[title])

  const token=localStorage.getItem("token")
const username=localStorage.getItem("username")
const email=localStorage.getItem("email")
const profilelink=localStorage.getItem("profilelink")



const handlelogout=()=>{
  localStorage.removeItem("token")
  localStorage.removeItem("username")
  localStorage.removeItem("email")
  localStorage.removeItem("role")
  localStorage.removeItem('profilelink')
  alert(`Are you sure you want to Logout ${username} ?`)
  toast.success(`${username} Logged out successfully !`)
  navigate("/login")
}

  return (
    <>
      {/* Navbar */}
  <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm sticky-top" id="home">
  <div className="container-fluid px-3">
    {/* Logo */}
    <a className="navbar-brand d-flex align-items-center" href="/">
      <img
        src={datasolve}
        alt="Datasolve Analytics"
        height="30"
        className="d-inline-block align-text-top me-2"
      />
     
    </a>

    {/* Toggler for mobile */}
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

    {/* Nav items */}
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav ms-auto align-items-lg-center gap-3">
        {token && username && profilelink ? (
          <li className="nav-item d-flex align-items-center gap-2">
            <img
              src={zentra}
              alt="User Icon"
              height="35"
              className="rounded border"
            />
          
            


<div className="dropdown ">
  <img
    src={profilelink}
    alt="Profile"
    className="rounded-circle border border-2 shadow-sm"
    height={45}
    width={45}
    role="button"
    id="profileDropdown"
    data-bs-toggle="dropdown"
    aria-expanded="false"
    style={{ objectFit: 'contain', cursor: 'pointer'  }}
  />

  <ul
    className="dropdown-menu dropdown-menu-end shadow-lg border-0 p-3"
    aria-labelledby="profileDropdown"
    style={{ minWidth: '250px', borderRadius: '10px', marginTop:9 }}
  >
    {/* User Info Header */}
    <li className="d-flex align-items-center mb-2">
      <img
        src={profilelink}
        alt="Profile"
        className="rounded-circle border border-2 me-3 object-fit-contain"
        height={50}
        width={60}
        style={{ objectFit: 'cover' }}
      />
      <div>
        <strong style={{ fontSize: '14px' }}>{username}</strong>
        <p className="text-muted mb-0" style={{ fontSize: '12px' }}>
          {email}
        </p>
      </div>
    </li>
    <hr className="dropdown-divider" />

    {/* Actions */}
    {/* <li>
      <button
        className="dropdown-item d-flex align-items-center gap-2"
        onClick={() => navigate('/profile')}
      >
        <i className="bi bi-person"></i>
        View Profile
      </button>
    </li>
    <li>
      <button
        className="dropdown-item d-flex align-items-center gap-2"
        onClick={() => navigate('/settings')}
      >
        <i className="bi bi-gear"></i>
        Settings
      </button>
    </li> */}
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
    
      {/* Hero Section */}
      <div className="background">
<div className="welcomesection container my-3 px-5 px-md-5 py-5 text-center">
 

    <h3 className="welcome-text mb-2">
  Welcome to <span className=" fs-2" style={{color:"#FAF3AA"}}>Zentra</span>, {username}
</h3>

<h6 className="username " style={{color:"#C9C1B6"}}>The center of everything that drives your work.</h6>
    <h6 className="mt-2  " style={{color:"#C9C1B6"}}>
<em className="description">Centralize. Simplify. Succeed.</em>
  </h6>

 
</div>
</div>
    <hr/>



<div className="container-fluid project-section py-3">
  <h4 className="text-center text-dark mb-5 fw-bold"  id="apps">Our Apps</h4>
  <div className="row justify-content-center g-4">

    {/* Elicita App */}
    
        <div className="col-sm-6 col-md-4 col-lg-3 mb-5">
  <div className="card app-card shadow-sm border-0 position-relative h-100">
       <img
          src={elicitalogo} // replace with your image
          className="card-img-top p-2 rounded-4"
          alt="Elicita App"
        />
    <div className="card-body text-center d-flex flex-column">
      {/* <h5 className="card-title text-dark">Elicita</h5> */}
      <p className="card-text text-muted text-start flex-grow-1"><strong> Elicita</strong> brings all your project information into one place — making it easy to access, explore, and extract insights that drive smarter decisions.</p>
  <p className="text-center fw-bold" style={{color:"#bfbfbf"}}><em>&apos;Seek and shall find&apos;</em></p>

      {/* Stretched link */}
      <a
        href="http://34.93.187.164/"
        className="stretched-link"
        target="_blank"
        rel="noopener noreferrer"
      ></a>
    </div>
  </div>
</div>



    {/* Analytica App */}
    
        <div className="col-sm-6 col-md-4 col-lg-3 mb-5">
  <div className="card app-card shadow-sm border-0 position-relative h-100">
      {/* Card Image */}
        <img
          src={analyticalogo} // replace with your image
          className="card-img-top p-2 rounded-4"
          alt="Analytica App"
        />
    
    <div className="card-body text-center d-flex flex-column">
      
      <p className="card-text text-muted text-start flex-grow-1"><strong>Analytica</strong> brings together a suite of automation tools to help you process, analyze, and learn from data faster and smarter.</p>

       <p className="text-center  fw-bold"  style={{color:"#bfbfbf"}}>
        <em> &apos;Analyze & Learn&apos;</em>
      </p>

      {/* Stretched link */}
      <a
        href="http://34.100.254.133/"
        className="stretched-link"
        target="_blank"
        rel="noopener noreferrer"
      ></a>
    </div>
  </div>
</div>


    {/* DSfileshare App */}

    <div className="col-sm-6 col-md-4 col-lg-3 mb-5">
  <div className="card app-card shadow-sm border-0 position-relative h-100">
     <img
      src={dsfilesharelogo} // replace with your image
      className="card-img-top p-2 rounded-4"
      alt="Dsfileshare App"
    />
    <div className="card-body text-center d-flex flex-column">
      {/* <h5 className="card-title text-dark">DS FileShare App</h5> */}
      <p className="card-text text-muted text-start flex-grow-1"> <strong>DS FileShare</strong> enables your teams to exchange files safely, seamlessly, and at speed — ensuring security and accessibility at every step.</p>
       <p className="text-center fw-bold" style={{color:"#bfbfbf"}}><em>&apos; Safe Seamless Shared &apos;</em></p>

      {/* Stretched link */}
      <a
        href="http://35.207.199.234:8000/"
        className="stretched-link"
        target="_blank"
        rel="noopener noreferrer"
      ></a>
    </div>
  </div>
</div>




    {/* Timesheet App */}

    <div className="col-sm-6 col-md-4 col-lg-3 mb-5">
  <div className="card app-card shadow-sm border-0 position-relative h-100">
     <img
      src={logsylogo} // replace with your image
      className="card-img-top p-2 rounded-4"
      alt="logsy App"
    />
    <div className="card-body text-center d-flex flex-column">
      {/* <h5 className="card-title text-dark">DS FileShare App</h5> */}
      <p className="card-text text-muted text-start flex-grow-1"> <strong>Logsy</strong> is designed to make time tracking effortless. With its clean interface and smart features, it helps you log work hours seamlessly, stay organized, and boost team productivity.</p>
       <p className="text-center fw-bold" style={{color:"#bfbfbf"}}><em>&apos; Simplify Timesheets, Amplify Productivity &apos;</em></p>

      {/* Stretched link */}
      <a
        href="http://34.14.201.236:8003/"
        className="stretched-link"
        target="_blank"
        rel="noopener noreferrer"
      ></a>
    </div>
  </div>
</div>


{/* Fynback app */}

 <div className="col-sm-6 col-md-4 col-lg-3 mb-5">
  <div className="card app-card shadow-sm border-0 position-relative h-100">
     <img
      src={fynbacklogo} // replace with your image
      className="card-img-top p-2 rounded-4"
      alt="Fynback App"
    />
    <div className="card-body text-center d-flex flex-column">
      {/* <h5 className="card-title text-dark">DS FileShare App</h5> */}
      <p className="card-text text-muted text-start flex-grow-1"> <strong>Fynback</strong> is a central hub for gathering ideas, suggestions, and feedback from users. It empowers everyone to share their voice and actively shape the direction of our apps and projects
</p>
       <p className="text-center fw-bold" style={{color:"#bfbfbf"}}><em>&apos;  Your Feedback Drives Our Innovation &apos;</em></p>


      {/* Stretched link */}
      <a
        href="https://script.google.com/macros/s/AKfycbweI-T_9hdJm8WNETaySbokvIRGTIFBRr1TR35ZMkAE4NwVHe8KNO5AtFl4sb3ovKHzXQ/exec"
        className="stretched-link"
        target="_blank"
        rel="noopener noreferrer"
      ></a>
    </div>
  </div>
</div>

 

  </div>
</div>






<hr/>
<OurIPTeam />
<Footer/>



    </>
  );
}

export default IPlandingpage;





