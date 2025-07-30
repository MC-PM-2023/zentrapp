// // import React from 'react'

// // const MClandingpage = () => {
// //   return (
// //     <div>MClandingpage</div>
// //   )
// // }

// // export default MClandingpage

// import React, { useEffect } from "react";
// import datasolve from '../assets/datasolve.png'
// import OurTeam from "../components/Mcteammembers";
// import { useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'
// // import axios from "axios";
// function MClandingpage({title}) {

//   // const apiUrl=import.meta.env.VITE_API_URL

//   const navigate=useNavigate();

//   useEffect(()=>{
//     document.title=title;
//   },[title])
//   const token =localStorage.getItem('token')
//   const username=localStorage.getItem('username')


// const handlelogout=()=>{
//  localStorage.removeItem("token")
//  localStorage.removeItem("username")
//  alert(`Are you sure you want to Logout ${username} ?`)
//   toast.success(`${username} have been logged out Successfully !`)
//   navigate("/login")

// }

// //not finished in getappcards
// // useEffect(()=>{
 
// //   const handlegetappcards=async()=>{

// //     try{

// // const response=await axios.get(`${apiUrl}/api/admin/apps/`)
// // console.log(response.data)
// //     }
// //     catch(error){
// //       console.log("Error in handlegetappcards:",error.message)

// //     }
// //   }
// //   handlegetappcards()
// // })




//   return (
//     <>
//       {/* Navbar */}
//       <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
//         <div className="container">
    
//       <img
//         src={datasolve}
//         alt="Datasolve Analytics"
    
//         height="60"
//         className="d-inline-block align-text-top me-2"
//       />
//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarNav"
//             aria-controls="navbarNav"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>
//           <div className="collapse navbar-collapse" id="navbarNav">
//             <ul className="navbar-nav ms-auto">
//               {/* <li className="nav-item">
//                 <a className="nav-link" href="#">Home</a>
//               </li>
//               <li className="nav-item">
//                 <a className="nav-link" href="#">Features</a>
//               </li>
//               <li className="nav-item">
//                 <a className="nav-link" href="#">Pricing</a>
//               </li> */}
//               <li className="nav-item">
//                 <a className="nav-link" href="#">Contact</a>
//               </li>
//             </ul>
//             {/* <div className="ms-3">
//              {token && username?
//             <span className="btn btn-primary">
//                 <i className="bi bi-person-circle me-2">
//                 </i>
                
//               {username}
//               </span>:
//             <span className="btn btn-primary">Login user</span> 
//             }
//             </div> */}
//             <div className="ms-3">
//               {token && username ?(
//                 <div className="d-flex align-items-center">
//                   <span className="btn btn-primary me-2">
//                     <i className="bi bi-person-circle  me-2"></i>
//                     {username}
//                   </span>
//                   <button className="btn btn-danger me-2" onClick={handlelogout}>
//                     Logout
//                   </button>
//                   </div>

//               ):(
//                 <span className="btn btn-primary">Login User</span>
//               )}
//             </div>
            
//           </div>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <div className="bg-light text-center p-5">
//         <h1>Welcomes You {username}</h1>
//         <p className="lead mt-5">Collaborate with our MC Team & Apps</p>
//       </div>

//       <div className="bg-secondary-subtle mt-4  p-5 rounded">
//     <h1>Datasolve Analytics</h1>
//     <p className="lead" style={{textAlign:"justify"}}> DataSolve has a team of experienced subject matter experts (SMEs) to research and analyze scientific and technical research papers/publications. Based on the client requirements, the deliverables are customized and presented with analysis summaries and insights. The SMEs at DataSolve have an expertise in wide range of topics covering Chemistry, Biotech, Pharma, Biomedical etc.</p>
    
//     {/* <a className="btn btn-lg btn-primary" href="/docs/5.3/components/navbar/" role="button">View navbar docs »</a> */}
//   </div>

//    {/* Projects Section */}
// <div className="container my-5">
//   <h2 className="text-center mb-4">Our Apps</h2>
//   <div className="row">
//     <div className="col-md-4 mb-4">
//       <div className="card h-100 position-relative">
//         <div className="card-body">
//           <h5 className="card-title text-center">Trove</h5>
//           <p className="card-text">
//          Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore sunt cupiditate odio, unde illum laboriosam sint repellendus molestiae. Suscipit exercitationem dignissimos voluptatum est sunt, adipisci corrupti nostrum voluptas provident fugiat, iste ex non maxime architecto hic modi repudiandae blanditiis. Consequuntur similique dolores culpa voluptatibus fugit adipisci natus recusandae officia debitis.
//           </p>
//           <a href="http://34.93.2.122:8081/" className="stretched-link"></a>
//         </div>
//       </div>
//     </div>

//     <div className="col-md-4 mb-4" >
//       <div className="card h-100 position-relative">
//         <div className="card-body" >
//           <h5 className="card-title text-center">RefSolve</h5>
//           <p className="card-text">
//          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam dolore tempora delectus reprehenderit sint iusto explicabo magni deserunt, molestias doloremque sapiente quae enim, veniam tenetur esse excepturi facere autem recusandae quisquam suscipit fugiat vel quasi earum. Quis sed nesciunt blanditiis fugiat similique quo ullam. Corrupti perferendis beatae illo tempora eaque.
//           </p>
//           <a href="http://34.93.2.122:8080/" className="stretched-link"></a>
//         </div>
//       </div>
//     </div>

//     <div className="col-md-4 mb-4">
//       <div className="card h-100 position-relative">
//         <div className="card-body">
//           <h5 className="card-title text-center">Insolvo</h5>
//           <p className="card-text">
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente libero ab est, in quidem ratione blanditiis, repellendus molestias maiores qui itaque. Tempore, distinctio adipisci sint doloremque ad beatae assumenda deserunt, dolorum molestias id ex sed porro dolorem quisquam saepe ea cumque ipsam aliquam hic veritatis fuga aspernatur. Dolorem, fugiat dolor.
//           </p>
//           <a href="http://34.93.41.197:8010/" className="stretched-link"></a>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>


// <OurTeam />



   
 


//       {/* Footer */}
//       <footer className="bg-dark text-white text-center p-3">
//         Copyrights &copy; {new Date().getFullYear()} Datasolve Analytics All Rights Reserved.
//       </footer>
//     </>
//   );
// }

// export default MClandingpage;





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
function MClandingpage({ title }) {
  // const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
const [username,setusername]=useState("")
  // List of users who can access both Trove & RefSolve
  const allowedUsers = [
    "vinithra.a@datasolve-analytics.com",
    "rashikha.r@datasolve-analytics.com",
    "harish.k@datasolve-analytics.com"
  ];

  useEffect(() => {
    document.title = title;
    const storedEmail = localStorage.getItem("email");
    const username=localStorage.getItem("username")

    // console.log("Stored Email in Local Storage:", storedEmail); // Debugging

    if (storedEmail && storedEmail.trim() !== "null" && storedEmail.trim() !== "") {
      setEmail(storedEmail);
      setusername(username)
    }
  }, [title]);

  const handleLogout = () => {
    const confirmLogout = window.confirm(`Are you sure you want to logout, ${username}?`);
    if (confirmLogout) {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("role");
      localStorage.removeItem("username")
      setEmail(""); // Immediately update UI
      toast.success(`${username} have been logged out successfully!`);
      navigate("/login");
    }
  };

  // useEffect(() => {
  //   const handleGetAppCards = async () => {
  //     try {
  //       const response = await axios.get(`${apiUrl}/api/admin/apps/`);
  //       console.log("Fetched Apps Data:", response.data);
  //     } catch (error) {
  //       console.log("Error fetching apps:", error);
  //     }
  //   };
  //   handleGetAppCards();
  // }, []);

  return (
    <>
      {/* Navbar */}
      {/* <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
        <div className="container">
          <img src={datasolve} alt="Datasolve Analytics" height="60" className="me-2" />
        
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {/* <li className="nav-item">
                <a className="nav-link" href="#">Contact</a>
              </li> 
            </ul>
            <div className="ms-3">
              {email ? (
                <div className="d-flex align-items-center justify-content-end">
                    <img src={zentra} alt="Datasolve Analytics" height="60" className="me-2" />
                  {/* <span className="btn btn-primary me-2">
                    <i className="bi bi-person-circle me-2"></i>
                    {username}
                  </span> 
                  <button className="btn btn-danger me-2" onClick={handleLogout}>
                  {/* <i class="bi bi-person-fill"></i> Logout
                  </button>
               
                </div>
              ) : (
                <a href="/login" className="btn btn-primary">Login</a>
              )}
            </div>
          </div>
        </div>
      </nav> */}
<nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
  <div className="container-fluid">
    {/* Logo */}
    <img src={datasolve} alt="Datasolve Analytics" height="60" className="me-3" />

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
      <ul className="navbar-nav ms-auto">
        {/* Future nav items can go here */}
      </ul>

      {/* Right-Side Buttons */}
      <div className="d-flex align-items-center ms-3">
        {email ? (
          <>
            <img src={zentra} alt="Zentra Logo" height="60" className="me-2" />
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
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
      <div className="bg-light text-center p-5 slider">
        <div className="d-flex flex-column align-items-center justify-content-center">
            {/* <div className="d-flex align-items-center"> */}
  <p className="text-dark fs-6 fw-bold mb-0 me-2" style={{letterSpacing:5}}>Welcome</p>
  <span className="fw-bold username">{username || "Guest"}</span>
{/* </div> */}
        {/* <p className="text-dark fs-6">Welcome </p><span className="text-bold fs-2">{username || "Guest"}</span> */}
        {/* <p className="lead mt-5 fs-5">Collaborate with our MC Team & Apps</p> */}
        </div>
      

      </div>
      <hr/>

      {/* About Datasolve */}
      {/* <div className="bg-secondary-subtle mt-4 p-5 rounded about text-warning">
        <h1 style={{color:"#336699"}} className="fw-bold">Datasolve Analytics</h1>
        <p className="lead" style={{ textAlign: "justify" }}>
          DataSolve has a team of experienced subject matter experts (SMEs) to research and analyze scientific and technical research papers/publications...
        </p>
      </div> */}

      {/* Apps Section */}
     
      <div className="container-fluid containers">
    
        <h2 className="text-center  text-white mb-4">Our Apps</h2>
        <div className="row">
          {allowedUsers.includes(email) ? (
            <>
              {/* Trove App */}
              <div className="col-md-4 mb-5">
  <div className="card h-100 position-relative"     onClick={() => {
    const token = localStorage.getItem("token");
    if (token) {
      window.location.href = `http://34.93.185.11:9090/?token=${token}`;
    } else {
      alert("Token missing. Please log in again.");
    }
  }}>
   
    <img src={trovelogo} alt="trovelogo" style={{ height: 105 }} className="card-img-top" />
      <a href="http://34.93.185.11:9090/" className="stretched-link" target="_blank" rel="noopener noreferrer"></a>
    </div>
  </div>
{/* </div> */}


              {/* RefSolve App */}
              {/* <div className="col-md-4 mb-5">
                <div className="card h-100 position-relative">
                    <img src={refsolvelogo} alt="refsolvelogo" style={{ height: 105 }} className="card-img-top" />
                    {/* <a href="http://34.47.164.153:7070/" className="stretched-link"></a> 
                      <a href="http://localhost:5173/" className="stretched-link"></a>
                  </div>
                </div> */}

                <div className="col-md-4 mb-5">
  <div className="card h-100 position-relative" onClick={() => {
    const token = localStorage.getItem("token");
    const username=localStorage.getItem("username")
    
    if (token && username) {
      //jas version
       window.location.href = `http://35.207.215.48:7070/?token=${token}?username=${username}`;
      //apps admin version
      // window.location.href = `http://35.207.199.234:7070/?token=${token}`;
    } else {
      alert("Token missing. Please log in again.");
    }
  }} style={{ cursor: "pointer" }}>
    <img src={refsolvelogo} alt="refsolvelogo" style={{ height: 105 }} className="card-img-top" />
    <span className="stretched-link"></span>
  </div>
</div>

              

     {/* DSfileshare App */}
    <div className="col-md-4 mb-5">
      <div className="card h-100 position-relative">
        <img src={dsfilesharelogo} alt="dsfilsharelogo" style={{ height: 105 }} className="card-img-top" />
        <a href="http://335.207.199.234:8000/" className="stretched-link" target="_blank" rel="noopener noreferrer"></a>
      </div>
    </div>






              <hr/>
              <OurMCTeam/>
              
              
            </>
            
          ) : (
            <>
              {/* If email is NOT in allowedUsers, show only RefSolve */}
              {/* <div className="col-md-4 mb-4">
                <div className="card h-100 position-relative">
                  <div className="card-body">
                    <h5 className="card-title text-center">RefSolve</h5>
                    <p className="card-text">
                      RefSolve simplifies reference and citation management for research papers...
                    </p>
                    <a href="http://34.47.164.153:7070/" className="stretched-link"></a>
                  </div>
                </div>
                
              </div> */}
                {/* <div className="col-md-4 mb-5">
                <div className="card h-100 position-relative">
                    <img src={refsolvelogo} alt="refsolvelogo" style={{ height: 105 }} className="card-img-top" />
                    <a href="http://34.47.164.153:7070/" className="stretched-link"></a>
                    
                  </div>
                </div> */}
                <div className="col-md-4 mb-5">
  <div className="card h-100 position-relative" onClick={() => {
    const token = localStorage.getItem("token");
    if (token) {
      //jas version
      window.location.href = `http://35.207.215.48:7070/?token=${token}`;
      //appsadmin version
      // window.location.href = `http://35.207.199.234:7070/?token=${token}`;
    } else {
      alert("Token missing. Please log in again.");
    }
  }} style={{ cursor: "pointer" }}>
    <img src={refsolvelogo} alt="refsolvelogo" style={{ height: 105 }} className="card-img-top" />
    <span className="stretched-link"></span>
  </div>
</div>


     {/* DSfileshare App */}
    <div className="col-md-4 mb-5">
      <div className="card h-100 position-relative">
        <img src={dsfilesharelogo} alt="dsfilsharelogo" style={{ height: 105 }} className="card-img-top" />
        <a href="http://35.207.199.234:8000/" className="stretched-link" target="_blank" rel="noopener noreferrer"></a>
      </div>
    </div>

 {/* <div className="col-md-4 mb-5">
      <div className="card h-100 position-relative">
        <img src={dsfilesharelogo} alt="dsfilsharelogo" style={{ height: 105 }} className="card-img-top" />
        <a href="https://saying-fm-isa-disposal.trycloudflare.com/login" className="stretched-link" target="_blank" rel="noopener noreferrer"></a>
      </div>
    </div> */}



              <OurMCTeam/>
            </>
          )}
        </div>
      </div>
      {/* <footer className="bg-dark text-white text-center p-3">
        Copyrights &copy; {new Date().getFullYear()} Datasolve Analytics All Rights Reserved.
      </footer> */}
    </>
  );
}

export default MClandingpage;
