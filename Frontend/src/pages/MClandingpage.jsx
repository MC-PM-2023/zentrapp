import React, { useEffect, useState } from "react";

import datasolve from "../assets/datasolve.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import axios from "axios";
import OurMCTeam from "../components/Mcteammembers"
import dsfilesharelogo from '../assets/dsfilesharelogo.gif'
import  '../css/mclandingpage.css'
import zentra from '../assets/Zentra.gif'
import trovelogo from '../assets/Trovelogo.gif'
import refsolvelogo from '../assets/refsolve.gif'
import Footer from "../components/Footer";
import kaizenlogo from '../assets/Kaizen_Logo.gif'
import logsylogo from '../assets/Logsy.gif'
import fynbacklogo from '../assets/Fynback.gif'
import insolvelitelogo from '../assets/insolvolite.gif'
import pubdock from '../assets/publicationapp.gif'

function MClandingpage({ title }) {
  // const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
const [username,setusername]=useState("")
const [profileLink,setProfileLink]=useState("")
  // List of users who can access both Trove & RefSolve
  const allowedUsers = [
    "vinithra.a@datasolve-analytics.com",
    "harish.k@datasolve-analytics.com",
    "sagar.r@datasolve-analytics.com"
  ];

  useEffect(() => {
    document.title = title;
    const storedEmail = localStorage.getItem("email");
    const username=localStorage.getItem("username")
    const profilelink=localStorage.getItem("profilelink")
    
    // console.log("Stored Email in Local Storage:", storedEmail); // Debugging

    if (storedEmail && storedEmail.trim() !== "null" && storedEmail.trim() !== "") {
      setEmail(storedEmail);
      setusername(username)
      setProfileLink(profilelink)
    }
  }, [title]);

  const handleLogout = () => {
    const confirmLogout = window.confirm(`Are you sure you want to logout, ${username}?`);
    if (confirmLogout) {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("role");
      localStorage.removeItem("username")
      localStorage.removeItem("profilelink")
      setEmail(""); // Immediately update UI
      toast.success(`${username} have been logged out successfully!`);
      navigate("/login");
    }
  };

 

  return (
    <>
<nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
  <div className="container-fluid px-3">
    {/* Logo */}
      <a className="navbar-brand d-flex align-items-center" href="/"></a>
    <img src={datasolve} alt="Datasolve Analytics" height="35" className="d-inline-block align-text-top me-2" />

    {/* Toggler */}
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

    {/* Collapsible Content */}
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav ms-auto align-items-lg-center gap-3">
        {/* Future nav items can go here */}

   
      </ul>

      {/* Right-Side Buttons */}
      <div className="d-flex align-items-center justify-content-center">
        {email ? (
          <>
            <img src={zentra} alt="Zentra Logo" height="40" className="rounded border me-2" />
  


{/* corrected dropdown <div className="dropdown">
       
           <img 
src={profileLink}
  alt="Profile" 
  class="rounded-circle border "
  height={40}
  width={40} 
  role="button"
  id="profileDropdown"
  data-bs-toggle="dropdown"
  aria-expanded="false"
/>
<ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
  <li>
    <small>{email}</small>
<button className="dropdown-item" onClick={handleLogout}>
  <i className="bi bi-box-arrow-right me-1"></i>
Logout</button>
  </li>
</ul>
  </div> */}

<div className="dropdown ">
  <img
    src={profileLink}
    alt="Profile"
    className="rounded-circle border border-2 shadow-sm object-fit-cover"
    height={45}
    width={45}
    role="button"
    id="profileDropdown"
    data-bs-toggle="dropdown"
    aria-expanded="false"
    style={{ objectFit: 'cover', cursor: 'pointer' }}
  />

  <ul
    className="dropdown-menu dropdown-menu-end shadow-lg border-0 p-3"
    aria-labelledby="profileDropdown"
    style={{ minWidth: '250px', borderRadius: '10px', marginTop:9 }}
  >
    {/* User Info Header */}
    <li className="d-flex align-items-center mb-2">
      <img
        src={profileLink}
        alt="Profile"
        className="rounded-circle border border-2 me-3 object-fit-cover"
        height={45}
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
        className="dropdown-item text-danger d-flex align-items-center gap-2"
        onClick={handleLogout}
      >
        <i className="bi bi-box-arrow-right"></i>
        Logout
      </button>
    </li>
  </ul>
</div>



      
          </>
        ) : (
          <a href="/login" className="btn btn-primary">
            Login
          </a>
        )}
      </div>
    </div>
  </div>
</nav>
      {/* Welcome Section */}
      <div className="background">
      <div className="welcomesection container my-4 ">
  {/* <h3 className="welcome-text  text-capitalize mb-2">
    Welcome to Zentra, {username}
  </h3> */}
    <h3 className="welcome-text mb-2">
  Welcome to <span className=" fs-2" style={{color:"#FAF3AA"}}>Zentra</span>, {username}
</h3>

  <h6 className="username" style={{color:"#C9C1B6"}}>The center of everything that drives your work.</h6>
    <h6 className="mt-2   " style={{color:"#C9C1B6"}}>
<em className="description">Centralize. Simplify. Succeed.</em>
  </h6>
        </div>
   
      </div>
   
      <hr/>

     
      {/* Apps Section */}
     <div>
      <div className="container-fluid project-section  py-3" id="apps">
    
        {/* <h4 className="text-center  text-dark mb-5 fw-semibold" style={{fontFamily:"Poppins"}}>Our Apps</h4> */}
          <h4 className="text-center mb-4 text-dark mb-4 my-2 fw-bold" id="teams">Our Apps </h4>
        <div className="row  g-4">
          {allowedUsers.includes(email) ? (
            <>
              {/* Trove App  corrected code using for token */}
              {/* <div className="col-sm-6 col-md-4 col-lg-3 mb-5 ">
            
   <div className="card app-card shadow-sm border-0 position-relative h-100"     onClick={() => {
    const token = localStorage.getItem("token");
    
    if (token) {
      window.location.href = `http://34.93.185.11:9090/?token=${token}`;
    } else {
      alert("Token missing. Please log in again.");
    }
  }} style={{cursor:"pointer"}}>
   

    
      <img
      src={trovelogo} // replace with your image
      className="card-img-top p-2 rounded-4"
      alt="Trove App"
    />
   <div className="card-body text-center d-flex flex-column">
    
   <p className="card-text text-muted text-start"><strong>Trove</strong> is a powerful database platform that centralizes and organizes project-related information, helping you uncover insights and make informed decisions. 
     <p className="text-center fw-bold" style={{color:"#bfbfbf"}}><em>&apos;Hunt the treasure&apos;</em></p>
   </p>
   </div>
   
      <span className="stretched-link"></span>
    </div>
  </div> */}

   {/* Trove App */}
   <div className="col-sm-6 col-md-4 col-lg-3 mb-5">
  <div className="card app-card shadow-sm border-0 position-relative h-100">
     <img
      src={trovelogo} // replace with your image
      className="card-img-top p-2 rounded-4"
      alt="Trove App"
    />
    <div className="card-body text-center d-flex flex-column">
      {/* <h5 className="card-title text-dark">DS FileShare App</h5> */}
      <p className="card-text text-muted text-start"><strong>Trove</strong> is a powerful database platform that centralizes and organizes project-related information, helping you uncover insights and make informed decisions. </p>
     <p className="text-center fw-bold" style={{color:"#bfbfbf"}}><em>&apos;Hunt the treasure&apos;</em></p>

      {/* Stretched link */}
      <a
        href="http://34.180.6.43:9090/"
        className="stretched-link"
        target="_blank"
        rel="noopener noreferrer"
      ></a>
    </div>
  </div>
</div>



              {/* RefSolve App */}

                <div className="col-sm-6 col-md-4 col-lg-3 mb-5 ">
  <div className="card app-card shadow-sm border-0 position-relative h-100" onClick={() => {
    const token = localStorage.getItem("token");
    const username=localStorage.getItem("username")
    const profilelink=localStorage.getItem("profilelink")
    
    if (token && username && profilelink) {
      //jas version
      //  window.location.href = `http://35.207.215.48:7070/?token=${token}?username=${username}`; //it doesnt work
  window.location.href = `http://34.180.7.64:7070/?token=${token}`;
      //apps admin version
      // window.location.href = `http://35.207.199.234:7070/?token=${token}`;
    } else {
      alert("Token missing. Please log in again.");
    }
  }} style={{ cursor: "pointer" }}>
    {/* <img src={refsolvelogo} alt="refsolvelogo" className="card-img-top app-logo" /> */}
      <img
      src={refsolvelogo} // replace with your image
      className="card-img-top p-2 rounded-4"
      alt="Refsolve App"
    />

    <div className="card-body text-center d-flex flex-column">
      {/* <h5 className="card-title text-dark">Refsolve App</h5> */}
      <p className="card-text text-muted text-start flex-grow-1"><strong>Refsolve</strong> is your go-to platform for reference libraries, checklists, and workflows, built to ensure consistency and clarity across tasks and teams.</p>
       <p className="text-center fw-bold" style={{color:"#bfbfbf"}}><em> &apos;Smarter References Better Solutions &apos;</em></p>
    </div>
    <span className="stretched-link"></span>
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
      <p className="card-text text-muted text-start flex-grow-1"><strong> DS FileShare</strong> enables your teams to exchange files safely, seamlessly, and at speed — ensuring security and accessibility at every step.</p>
       <p className="text-center fw-bold" style={{color:"#bfbfbf"}}><em>&apos;Safe Seamless Shared&apos;</em></p>

      {/* Stretched link */}
      <a
        href="http://34.47.202.92:7090/"   
        className="stretched-link"
        target="_blank"
        rel="noopener noreferrer"
      ></a>
    </div>
  </div>
</div>


{/* kaizen app */}

<div className="col-sm-6 col-md-4 col-lg-3 mb-5">
  <div className="card app-card shadow-sm border-0 position-relative h-100">
    {/* Card Image */}
    <img
      src={kaizenlogo} // replace with your image
      className="card-img-top p-2 rounded-4"
      alt="Kaizen App"
    />

    <div className="card-body text-center d-flex flex-column">
      {/* Title */}
      {/* <h5 className="card-title text-dark">Kaizen App</h5> */}

      {/* Description */}
      <p className="card-text text-muted text-start flex-grow-1">
        <strong>Kaizen</strong> is designed to conduct project-related quizzes, streamline
        knowledge transfer, and reinforce continuous improvement practices.
      </p>

      {/* Extra Info */}
      <p className="text-center fw-bold" style={{color:"#bfbfbf"}}>
        <em>&apos;Continuous Improvement&apos;</em>
      </p>

      {/* Stretched Link (no button) */}
      <a
        href="https://script.google.com/macros/s/AKfycbze28kowINbK4Pwlh0Oof3RgdSNTf9U5NHRnjDyMjqNBlLYACySusCuUaZsJU4qR-CizQ/exec"
        className="stretched-link"
        target="_blank"
        rel="noopener noreferrer"
      ></a>
    </div>
  </div>
</div>


{/* timesheet app */}

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
        href="http://34.180.23.199:7060/"
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
        href="https://script.google.com/macros/s/AKfycbyudbNWG8WThN3okAhFRZxLi0UjiGzlRFopKosW3KJRRImFvB6CJqvU2Au06Ew2OtKo5w/exec"
        className="stretched-link"
        target="_blank"
        rel="noopener noreferrer"
      ></a>
    </div>
  </div>
</div>
 

{/* Personal mapping app */}

 <div className="col-sm-6 col-md-4 col-lg-3 mb-5">
  <div className="card app-card shadow-sm border-0 position-relative h-100">
     <img
      src={insolvelitelogo} // replace with your image
      className="card-img-top p-2 rounded-4"
      alt="personalmapping"
    />
    <div className="card-body text-center d-flex flex-column">
      {/* <h5 className="card-title text-dark">DS FileShare App</h5> */}
      <p className="card-text text-muted text-start flex-grow-1"> <strong>InSolvo Lite</strong> is a package of process automation tools for Personnel Mapping projects. InSolvo Lite seamlessly prepares mapping reports with individual and overall scores for personnel in all types of orgs, including Advocacy, Patient, Professional and Government Orgs.
</p>



       <p className="text-center fw-bold" style={{color:"#bfbfbf"}}><em>&apos;  Lightweight Powerful &apos;</em></p>


      {/* Stretched link */}
      <a
        href="http://34.180.23.199/"
        className="stretched-link"
        target="_blank"
        rel="noopener noreferrer"
      ></a>
    </div>
  </div>
</div>

   {/* publication  app */}

 <div className="col-sm-6 col-md-4 col-lg-3 mb-5">
  <div className="card app-card shadow-sm border-0 position-relative h-100">
     <img
      src={pubdock} // replace with your image
      className="card-img-top p-2 rounded-4"
      alt="pubdock"
    />
    <div className="card-body text-center d-flex flex-column">
      {/* <h5 className="card-title text-dark">DS FileShare App</h5> */}
      <p className="card-text text-muted text-start flex-grow-1"> <strong>Pubdock</strong> A centralized platform for scientific publications, enabling quick referencing and seamless reuse of research data across projects.
</p>



       <p className="text-center fw-bold" style={{color:"#bfbfbf"}}><em>&apos; Dock Reference Repeat &apos;</em></p>


      {/* Stretched link */}
      <a
        href="http://34.100.134.149:6060/"
        className="stretched-link"
        target="_blank"
        rel="noopener noreferrer"
      ></a>
    </div>
  </div>
</div>       
            </>
            
          ) : (
            <>
              {/* If email is NOT in allowedUsers, show only RefSolve */}

<div className="col-sm-6 col-md-4 col-lg-3 mb-5">
  <div
    className="card app-card shadow-sm border-0 position-relative h-100"
    onClick={() => {
      const token = localStorage.getItem("token");
      if (token) {
        // JAS version
        window.location.href = `http://34.180.7.64:7070/?token=${token}`;  
        // Appsadmin version
        // window.location.href = `http://35.207.199.234:7070/?token=${token}`;   
      } else {
        alert("Token missing. Please log in again.");
      }
    }}
    style={{ cursor: "pointer" }}
  >
     <img
      src={refsolvelogo} // replace with your image
      className="card-img-top p-2 rounded-4"
      alt="Refsolve App"
    />
    <div className="card-body text-center d-flex flex-column">
      <p className="card-text text-muted text-start flex-grow-1">
       <strong>RefSolve</strong>  is your go-to platform for reference libraries, checklists, and workflows, built to ensure consistency and clarity across tasks and teams. 
      </p>
      <p className="text-center fw-bold" style={{color:"#bfbfbf"}}>
        <em>&apos;Smarter References Better Solutions&apos;</em>
      </p>
    </div>
    {/* Invisible stretched link for full clickable area */}
    <span className="stretched-link"></span>
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
    <div className="card-body text-center">
      {/* <h5 className="card-title text-dark">DS FileShare App</h5> */}
      <p className="card-text text-muted text-start">  <strong>Ds Fileshare</strong> enables your teams to exchange files safely, seamlessly, and at speed — ensuring security and accessibility at every step.</p>
      <p className="text-center fw-bold" style={{color:"#bfbfbf"}}>
        <em>&apos;Safe Seamless Shared&apos;</em>
      </p>

      {/* Stretched link */}
      <a
        href="http://34.47.202.92:7090/"
        className="stretched-link"
        target="_blank"
        rel="noopener noreferrer"
      ></a>
    </div>
  </div>
</div>

{/* kaizen app */}
   <div className="col-sm-6 col-md-4 col-lg-3 mb-5">
  <div className="card app-card shadow-sm border-0 position-relative h-100">
      <img
      src={kaizenlogo} // replace with your image
      className="card-img-top p-2 rounded-4"
      alt="Kaizen App"
    />
    <div className="card-body text-center d-flex flex-column">
  
      <p className="card-text text-muted text-start flex-grow-1"> <strong>Kaizen</strong> is designed to conduct project-related quizzes, streamline knowledge transfer, and reinforce continuous improvement practices.</p>
      <p className="text-center fw-bold" style={{color:"#bfbfbf"}}>
        <em>&apos;Continuous Improvement &apos;</em>
      </p>
      {/* Stretched link */}
      <a
        href="https://script.google.com/macros/s/AKfycbze28kowINbK4Pwlh0Oof3RgdSNTf9U5NHRnjDyMjqNBlLYACySusCuUaZsJU4qR-CizQ/exec"
        className="stretched-link"
        target="_blank"
        rel="noopener noreferrer"
      ></a>
    </div>
  </div>
</div>

{/* timesheet app */}

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
        href="http://34.180.23.199:7060/"
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
        href="https://script.google.com/macros/s/AKfycbyudbNWG8WThN3okAhFRZxLi0UjiGzlRFopKosW3KJRRImFvB6CJqvU2Au06Ew2OtKo5w/exec"
        className="stretched-link"
        target="_blank"
        rel="noopener noreferrer"
      ></a>
    </div>
  </div>
</div>



         

            </>
          )}
            
        </div>
       
      </div>
  
        <OurMCTeam/>
                <Footer/>
    
     </div>
     
    </>
  );
}

export default MClandingpage;
