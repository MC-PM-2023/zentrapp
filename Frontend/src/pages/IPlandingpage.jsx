
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
// import '../css/iplandingpage.css'
function IPlandingpage({title}) {


  const navigate=useNavigate();

  useEffect(()=>{
    document.title=title;
  },[title])

  const token=localStorage.getItem("token")
const username=localStorage.getItem("username")



const handlelogout=()=>{
  localStorage.removeItem("token")
  localStorage.removeItem("username")
  localStorage.removeItem("email")
  localStorage.removeItem("role")
  alert(`Are you sure you want to Logout ${username} ?`)
  toast.success(`${username} Logged out successfully !`)
  navigate("/login")
}

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
        <div className="container-fluid">
    
      <img
        src={datasolve}
        alt="Datasolve Analytics"
        height="60"
        className="d-inline-block align-text-top me-2"
      />
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
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <div className="ms-3">
              {token && username ?(
                <div className="d-flex align-items-center">
                 <img src={zentra} alt="Datasolve Analytics" height="60" className="me-2" />
                  <button className="btn btn-danger me-2" onClick={handlelogout}>
                    Logout
                  </button>
                  </div>

              ):(
                <span className="btn btn-primary">Login User</span>
              )}
            </div>   </ul>
      

           
          
          </div>
        </div>
      </nav>

      {/* Hero Section */}
     <div className="bg-light text-center p-5 slider">
        <div className="d-flex flex-column align-items-center justify-content-center">
            {/* <div className="d-flex align-items-center"> */}
  <p className="text-dark fs-6 fw-bold mb-0 me-2" style={{letterSpacing:5}}>Welcome</p>
  <span className="fw-bold username">{username || "Guest"}</span>
        </div>
      

      </div>
    <hr/>

{/* Projects Section */}
<div className="container-fluid containers">
  <h2 className="text-center text-white mb-4">Our Apps</h2>
  <div className="row">

    {/* Elicita App */}
    <div className="col-md-4 mb-5">
      <div className="card h-100 position-relative">
        <img src={elicitalogo} alt="elicitalogo" style={{ height: 105 }} className="card-img-top" />
        <a href='http://34.93.187.164/' className="stretched-link" target="_blank" rel="noopener noreferrer"></a>
      </div>
    </div>

    {/* Analytica App */}
    <div className="col-md-4 mb-5">
      <div className="card h-100 position-relative">
        <img src={analyticalogo} alt="elicitalogo" style={{ height: 105 }} className="card-img-top" />
        <a href=" http://34.100.254.133/" className="stretched-link" target="_blank" rel="noopener noreferrer"></a>
      </div>
    </div>
   

     {/* DSfileshare App */}
    <div className="col-md-4 mb-5">
      <div className="card h-100 position-relative">
        <img src={dsfilesharelogo} alt="dsfilsharelogo" style={{ height: 105 }} className="card-img-top" />
        <a href="http://35.207.199.234:8000" className="stretched-link" target="_blank" rel="noopener noreferrer"></a>
      </div> 
    </div>

  </div>  {/* <-- row ends here */}
</div>     {/* <-- container for apps ends here */}

<hr/>
<OurIPTeam />



      {/* Footer */}
      {/* <footer className="bg-dark text-white text-center p-3">
        Copyrights &copy; {new Date().getFullYear()} Datasolve Analytics All Rights Reserved.
      </footer> */}
    </>
  );
}

export default IPlandingpage;
