// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import '../css/mclandingpage.css';
// import OurIPTeam from '../components/Ipteammembers';
// import Footer from '../components/Footer';
// import OurTeam from '../components/OurTeam';
// const apiurl = import.meta.env.VITE_API_URL;

// const LandingPage = ({ title }) => {
//   const [apps, setApps] = useState([]);

//   // Get user info from localStorage
//   const token = localStorage.getItem('token');
//   const username = localStorage.getItem('username');
//   const email = localStorage.getItem('email');
//   const profilelink = localStorage.getItem('profilelink');

//   useEffect(() => {
//     document.title = title;

//     const fetchApps = async () => {
//       if (!email) return; // safety check
//       try {
//         const res = await axios.get(`${apiurl}/api/admin/apps/myapps?email=${email}`, {
//           headers: {
//             Authorization: `Bearer ${token}` // if your backend requires token
//           }
//         });
//         // console.log(res.data)
//         setApps(res.data);
//       } catch (err) {
//         toast.error('Error fetching apps');
//       }
//     };

//     fetchApps();
//   }, [email, token, title]);

//   const handlelogout = () => {
//     localStorage.clear();
//     window.location.href = '/'; // redirect to login
//   };

//   return (
//     <>
//       {/* Navbar */}
//       <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm sticky-top" id="home">
//         <div className="container-fluid px-3">
//           {/* Logo */}
//           <a className="navbar-brand d-flex align-items-center" href="/landingpage">
//             <img
//               src="https://storage.googleapis.com/my-react-image-bucket-123/DataSolveLogo.jpg"
//               alt="Datasolve Analytics"
//               height="30"
//               className="d-inline-block align-text-top me-2"
//             />
//           </a>

//           {/* Toggler for mobile */}
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

//           {/* Nav items */}
//           <div className="collapse navbar-collapse" id="navbarNav">
//             <ul className="navbar-nav ms-auto align-items-lg-center gap-3">
//               {token && username && profilelink ? (
//                 <li className="nav-item d-flex align-items-center gap-2">
//                     <a className='navbar-brand d-flex align-items-center' href='/landingpage'>
//                         <img
//               src="https://storage.googleapis.com/my-react-image-bucket-123/DS_Logos/Logo_Gif/Zentra.gif"
//               alt="User Icon"
//               height="35"
//               className="rounded border"
//             />
//             </a>
//                   <div className="dropdown">
//                     <img
//                       src={profilelink}
//                       alt="Profile"
//                       className="rounded-circle border border-2 shadow-sm"
//                       height={45}
//                       width={45}
//                       role="button"
//                       id="profileDropdown"
//                       data-bs-toggle="dropdown"
//                       aria-expanded="false"
//                       style={{ objectFit: 'contain', cursor: 'pointer' }}
//                     />
//                     <ul
//                       className="dropdown-menu dropdown-menu-end shadow-lg border-0 p-3"
//                       aria-labelledby="profileDropdown"
//                       style={{ minWidth: '250px', borderRadius: '10px', marginTop: 9 }}
//                     >
//                       {/* User Info */}
//                       <li className="d-flex align-items-center mb-2">
//                         <img
//                           src={profilelink}
//                           alt="Profile"
//                           className="rounded-circle border border-2 me-3 object-fit-contain"
//                           height={50}
//                           width={60}
//                           style={{ objectFit: 'cover' }}
//                         />
//                         <div>
//                           <strong style={{ fontSize: '14px' }}>{username}</strong>
//                           <p className="text-muted mb-0" style={{ fontSize: '12px' }}>
//                             {email}
//                           </p>
//                         </div>
//                       </li>
//                       <hr className="dropdown-divider" />
//                       <li>
//                         <button
//                           className="dropdown-item text-dark d-flex align-items-center gap-2"
//                           onClick={handlelogout}
//                         >
//                           <i className="bi bi-box-arrow-right"></i>
//                           Logout
//                         </button>
//                       </li>
//                     </ul>
//                   </div>
//                 </li>
//               ) : (
//                 <li className="nav-item">
//                   <span className="btn btn-outline-primary btn-sm">Login User</span>
//                 </li>
//               )}
//             </ul>
//           </div>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <div className="background">
//         <div className="welcomesection container my-3 px-5 px-md-5 py-5 text-center">
//           <h3 className="welcome-text mb-2">
//             Welcome to <span className="fs-2" style={{ color: "#FAF3AA" }}>Zentra</span>, {username}
//           </h3>
//           <h6 className="username" style={{ color: "#C9C1B6" }}>
//             The center of everything that drives your work.
//           </h6>
//           <h6 className="mt-2" style={{ color: "#C9C1B6" }}>
//             <em className="description">Centralize. Simplify. Succeed.</em>
//           </h6>
//         </div>
//       </div>

//       <hr />
//         {/* Projects Section */}

//       <div className="container-fluid project-section py-3">
//   <h4 className="text-center text-dark mb-5 fw-bold"  id="apps">Our Apps</h4>
//   <div className="row justify-content-center g-4">
//   {apps.map((app, index) => (
//     <div className="col-sm-6 col-md-4 col-lg-3 mb-5" key={index}>
//       <div className="card app-card shadow-sm border-0 position-relative h-100">
//         <img
//           src={app.app_logo || 'https://via.placeholder.com/150'}
//           className="card-img-top p-2 rounded-4"
//           alt={app.app_name}
//         />
//         <div className="card-body text-center d-flex flex-column">
//           <p className="card-text text-muted text-start flex-grow-1">
//             <strong>{app.app_name}</strong> {app.app_description}
//           </p>
//           <p className="text-center fw-bold" style={{ color: "#bfbfbf" }}>
//             <em>&apos;{app.app_tagline || "Explore and enjoy"}&apos;</em>
//           </p>

//           {/* Stretched link */}
//           <a
//             href={app.app_url}
//             className="stretched-link"
//             target="_blank"
//             rel="noopener noreferrer"
//           ></a>
//         </div>
//       </div>
//     </div>
//   ))}
// </div>

//   </div>
// <hr/>
// <OurTeam/>
// <Footer/>
//       <ToastContainer />
//     </>
//   );
// };

// export default LandingPage;



// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import '../css/mclandingpage.css';
// import OurIPTeam from '../components/Ipteammembers';
// import Footer from '../components/Footer';
// import OurTeam from '../components/OurTeam';
// import { NavLink, useNavigate } from 'react-router-dom';
// import HeroSelection from '../components/HeroSelection';
// const apiurl = import.meta.env.VITE_API_URL;

// const allowedNames = [
//   "sagar.r@datasolve-analytics.com",
//   "vinithra.a@datasolve-analytics.com",
//   "megha.m@datasolve-analytics.com",
//   "harish.k@datasolve-analytics.com"
// ];

// const LandingPage = ({ title }) => {
//   const [apps, setApps] = useState([]);
// const navigate = useNavigate();


//   // Get user info from localStorage
//   const token = localStorage.getItem('token');
//   const username = localStorage.getItem('username');
//   const email = localStorage.getItem('email');
//   const profilelink = localStorage.getItem('profilelink');

//  useEffect(() => {
//     document.title = title;

//     const fetchApps = async () => {
//       if (!email) return;

//       try {
//         const res = await axios.get(`${apiurl}/api/admin/apps/getallapps`, {
//           headers: { Authorization: `Bearer ${token}` }
//         });

//         const filtered = res.data.filter(app => {
//           if (!app.assigned_users) return false;

//           const users = app.assigned_users
//             .split(",")
//             .map(u => u.trim().toLowerCase());

//           return users.includes(username.toLowerCase()); // match username
//         });
// console.log("ALL APPS:", res.data);

//         setApps(res.data);

//       } catch (err) {
//         toast.error("Error fetching apps");
//       }
//     };

//     fetchApps();

//   }, [email, token, username, title]);



//   const handlelogout = () => {
//     localStorage.clear();
//     navigate('/'); // redirect to login
//   };

//   return (
//     <>
//       {/* Navbar */}
//       <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm sticky-top" id="home">
//         <div className="container-fluid px-3">
//           {/* Logo */}
//           <NavLink className="navbar-brand d-flex align-items-center" to="/home">
//             <img
//               src="https://storage.googleapis.com/my-react-image-bucket-123/DataSolveLogo.jpg"
//               alt="Datasolve Analytics"
//               height="30"
//               className="d-inline-block align-text-top me-2"
//             />
//           </NavLink>

//           {/* Toggler for mobile */}
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

//           {/* Nav items */}
//           <div className="collapse navbar-collapse" id="navbarNav">
//             <ul className="navbar-nav ms-auto align-items-lg-center gap-3">
//               {token && username && profilelink ? (
//                 <li className="nav-item d-flex align-items-center gap-2">
//                     <NavLink className='navbar-brand d-flex align-items-center' to='/home'>
//                         <img
//               src="https://storage.googleapis.com/my-react-image-bucket-123/DS_Logos/Logo_Gif/Zentra.gif"
//               alt="User Icon"
//               height="35"
//               className="rounded border"
//             />
//             </NavLink>
//                   <div className="dropdown">
//                     <img
//                       src={profilelink}
//                       alt="Profile"
//                       className="rounded-circle border border-2 shadow-sm"
//                       height={45}
//                       width={45}
//                       role="button"
//                       id="profileDropdown"
//                       data-bs-toggle="dropdown"
//                       aria-expanded="false"
//                       style={{ objectFit: 'contain', cursor: 'pointer' }}
//                     />
//                     <ul
//                       className="dropdown-menu dropdown-menu-end shadow-lg border-0 p-3"
//                       aria-labelledby="profileDropdown"
//                       style={{ minWidth: '250px', borderRadius: '10px', marginTop: 9 }}
//                     >
//                       {/* User Info */}
//                       <li className="d-flex align-items-center mb-2">
//                         <img
//                           src={profilelink}
//                           alt="Profile"
//                           className="rounded-circle border border-2 me-3 object-fit-contain"
//                           height={50}
//                           width={60}
//                           style={{ objectFit: 'cover' }}
//                         />
//                         <div>
//                           <strong style={{ fontSize: '14px' }}>{username}</strong>
//                           <p className="text-muted mb-0" style={{ fontSize: '12px' }}>
//                             {email}
//                           </p>
//                         </div>
//                       </li>
//                       <hr className="dropdown-divider" />
//                       <li>
//                         <button
//                           className="dropdown-item text-dark d-flex align-items-center gap-2"
//                           onClick={handlelogout}
//                         >
//                           <i className="bi bi-box-arrow-right"></i>
//                           Logout
//                         </button>
//                       </li>
//                     </ul>
//                   </div>
//                 </li>
//               ) : (
//                 <li className="nav-item">
//                   <span className="btn btn-outline-primary btn-sm">Login User</span>
//                 </li>
//               )}
//             </ul>
//           </div>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <div className="background">
//         <div className="welcomesection container my-3 px-5 px-md-5 py-5 text-center">
//           <h3 className="welcome-text mb-2">
//             Welcome to <span className="fs-2" style={{ color: "#FAF3AA" }}>Zentra</span>, {username}
//           </h3>
//           <h6 className="username" style={{ color: "#C9C1B6" }}>
//             The center of everything that drives your work.
//           </h6>
//           <h6 className="mt-2" style={{ color: "#C9C1B6" }}>
//             <em className="description">Centralize. Simplify. Succeed.</em>
//           </h6>
//         </div>
//       </div>
// <hr/> 
//  <HeroSelection/>
//       <hr />
//         {/* Projects Section */}

//       <div className="container-fluid project-section py-3">
//   <h4 className="text-center text-dark mb-5 fw-bold"  id="apps">Our Apps</h4>
//   <div className="row justify-content-center g-4">
//   {apps.map((app, index) => (
//     <div className="col-sm-6 col-md-4 col-lg-3 mb-5" key={index}>
//       <div className="card app-card shadow-sm border-0 position-relative h-100">
//         <img
//           src={app.app_logo || 'https://via.placeholder.com/150'}
//           className="card-img-top p-2 rounded-4"
//           alt={app.app_name}
//         />
//         <div className="card-body text-center d-flex flex-column">
//           <p className="card-text text-muted text-start flex-grow-1">
//             <strong>{app.app_name}</strong> {app.app_description}
//           </p>
//           <p className="text-center fw-bold" style={{ color: "#bfbfbf" }}>
//             <em>&apos;{app.app_tagline || "Explore and enjoy"}&apos;</em>
//           </p>

//           {/* Stretched link */}
//           <a
//             href={app.app_url}
//             className="stretched-link"
//             target="_blank"
//             rel="noopener noreferrer"
//           ></a>
//     {allowedNames.includes(email) && app.assignedUsers?.length > 0 && (
//     <small className="text-muted d-block mt-2">
//        {/* Assigned users: {
//          app.assignedUsers.map(u => u.username).join(", ")
//        } */}
//     </small>
// )}

// {allowedNames.includes(email) && app.assignedUsers?.length > 0 && (
//     <div className=" d-flex align-items-center">

//         {app.assignedUsers.map((u, i) => (
//             <img
//                 key={u.id}
//                 src={u.profilelink || "https://via.placeholder.com/40"}
//                 title={u.username}
//                 style={{
//                     width: 50,
//                     height: 50,
//                     borderRadius: "50%",
//                     border: "2px solid #fff",
//                     objectFit: "contain",
//                     marginLeft: i === 0 ? 0 : -12,  // overlap effect
//                     boxShadow: "0 0 3px rgba(0,0,0,0.3)"
//                 }}
//             />
//         ))}

//     </div>
// )}





//         </div>
//       </div>
//     </div>
//   ))}
// </div>

//   </div>
// <hr/>
// <OurTeam/>
// <Footer/>
//       <ToastContainer />
//     </>
//   );
// };

// export default LandingPage;


// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import '../css/mclandingpage.css';
// import Footer from '../components/Footer';
// import OurTeam from '../components/OurTeam';
// import { NavLink, useNavigate } from 'react-router-dom';
// import HeroSelection from '../components/HeroSelection';

// const apiurl = import.meta.env.VITE_API_URL;

// const allowedNames = [
//   "sagar.r@datasolve-analytics.com",
//   "vinithra.a@datasolve-analytics.com",
//   "megha.m@datasolve-analytics.com",
//   "harish.k@datasolve-analytics.com"
// ];

// const LandingPage = ({ title }) => {
//   const [apps, setApps] = useState([]);
//   const navigate = useNavigate();

//   // Get user info from localStorage
//   const token = localStorage.getItem('token');
//   const username = localStorage.getItem('username');
//   const email = localStorage.getItem('email');
//   const profilelink = localStorage.getItem('profilelink');

//   useEffect(() => {
//     document.title = title;

//     const fetchApps = async () => {
//       if (!email) return;

//       try {
//         const res = await axios.get(`${apiurl}/api/admin/apps/myapps`, {
//           params: { email }, // send email as query param
//           headers: { Authorization: `Bearer ${token}` }
//         });

//         console.log("Assigned Apps:", res.data);
//         setApps(res.data); // set only assigned apps

//       } catch (err) {
//         toast.error("Error fetching apps");
//       }
//     };

//     fetchApps();
//   }, [email, token, title]);

//   const handlelogout = () => {
//     localStorage.clear();
//     navigate('/'); // redirect to login
//   };

//   return (
//     <>
//       {/* Navbar */}
//       <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm sticky-top" id="home">
//         <div className="container-fluid px-3">
//           <NavLink className="navbar-brand d-flex align-items-center" to="/home">
//             <img
//               src="https://storage.googleapis.com/my-react-image-bucket-123/DataSolveLogo.jpg"
//               alt="Datasolve Analytics"
//               height="30"
//               className="d-inline-block align-text-top me-2"
//             />
//           </NavLink>

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
//             <ul className="navbar-nav ms-auto align-items-lg-center gap-3">
//               {token && username && profilelink ? (
//                 <li className="nav-item d-flex align-items-center gap-2">
//                   <NavLink className='navbar-brand d-flex align-items-center' to='/home'>
//                     <img
//                       src="https://storage.googleapis.com/my-react-image-bucket-123/DS_Logos/Logo_Gif/Zentra.gif"
//                       alt="User Icon"
//                       height="35"
//                       className="rounded border"
//                     />
//                   </NavLink>
//                   <div className="dropdown">
//                     <img
//                       src={profilelink}
//                       alt="Profile"
//                       className="rounded-circle border border-2 shadow-sm"
//                       height={45}
//                       width={45}
//                       role="button"
//                       id="profileDropdown"
//                       data-bs-toggle="dropdown"
//                       aria-expanded="false"
//                       style={{ objectFit: 'contain', cursor: 'pointer' }}
//                     />
//                     <ul
//                       className="dropdown-menu dropdown-menu-end shadow-lg border-0 p-3"
//                       aria-labelledby="profileDropdown"
//                       style={{ minWidth: '250px', borderRadius: '10px', marginTop: 9 }}
//                     >
//                       <li className="d-flex align-items-center mb-2">
//                         <img
//                           src={profilelink}
//                           alt="Profile"
//                           className="rounded-circle border border-2 me-3 object-fit-contain"
//                           height={50}
//                           width={60}
//                           style={{ objectFit: 'cover' }}
//                         />
//                         <div>
//                           <strong style={{ fontSize: '14px' }}>{username}</strong>
//                           <p className="text-muted mb-0" style={{ fontSize: '12px' }}>{email}</p>
//                         </div>
//                       </li>
//                       <hr className="dropdown-divider" />
//                       <li>
//                         <button
//                           className="dropdown-item text-dark d-flex align-items-center gap-2"
//                           onClick={handlelogout}
//                         >
//                           <i className="bi bi-box-arrow-right"></i>
//                           Logout
//                         </button>
//                       </li>
//                     </ul>
//                   </div>
//                 </li>
//               ) : (
//                 <li className="nav-item">
//                   <span className="btn btn-outline-primary btn-sm">Login User</span>
//                 </li>
//               )}
//             </ul>
//           </div>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       {/* <div className="background">
//         <div className="welcomesection container my-3 px-5 px-md-5 py-5 text-center">
//           <h3 className="welcome-text mb-2">
//             Welcome to <span className="fs-2" style={{ color: "#FAF3AA" }}>Zentra</span>, {username}
//           </h3>
//           <h6 className="username" style={{ color: "#C9C1B6" }}>
//             The center of everything that drives your work.
//           </h6>
//           <h6 className="mt-2" style={{ color: "#C9C1B6" }}>
//             <em className="description">Centralize. Simplify. Succeed.</em>
//           </h6>
//         </div>
//       </div> */}

//       {/* <hr /> */}
//       <HeroSelection />
//       <hr />

//       {/* Projects Section */}
//       <div className="container-fluid project-section py-3">
//         <h4 className="text-center text-dark mb-5 fw-bold" id="apps">Our Apps</h4>
//         <div className="row justify-content-center g-4">
//           {apps.map((app, index) => (
//             <div className="col-sm-6 col-md-4 col-lg-3 mb-5" key={index}>
//               <div className="card app-card shadow-sm border-0 position-relative h-100">
//                 <img
//                   src={app.app_logo || 'https://via.placeholder.com/150'}
//                   className="card-img-top p-2 rounded-4"
//                   alt={app.app_name}
//                 />
//                 <div className="card-body text-center d-flex flex-column">
//                   <p className="card-text text-muted text-start flex-grow-1">
//                     <strong style={{fontSize:14}} >{app.app_name}</strong> <span style={{fontSize:14}}> - {app.app_description}</span>
//                   </p>
//                   <p className="text-center fw-bold" style={{ color: "#bfbfbf",fontSize:14} } >
//                     <em style={{fontSize:14}} >&apos;{app.app_tagline || "Explore and enjoy"}&apos;</em>
//                   </p>
//                   <a
//                     href={app.app_url}
//                     className="stretched-link"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   ></a>

//                   {allowedNames.includes(email) && app.assignedUsers?.length > 0 && (
//                     <div className="d-flex align-items-center mt-2">
//                       {app.assignedUsers.map((u, i) => (
//                         <img
//                           key={u.id}
//                           src={u.profilelink || "https://via.placeholder.com/40"}
//                           title={u.username}
//                           style={{
//                             width: 50,
//                             height: 50,
//                             borderRadius: "50%",
//                             border: "2px solid #fff",
//                             objectFit: "contain",
//                             marginLeft: i === 0 ? 0 : -12,
//                             boxShadow: "0 0 3px rgba(0,0,0,0.3)"
//                           }}
//                         />
//                       ))}
//                     </div>
//                   )}


//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <hr />
//       <OurTeam />
//       <Footer />
//       <ToastContainer />
//     </>
//   );
// };

// export default LandingPage;


// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import '../css/mclandingpage.css';
// import Footer from '../components/Footer';
// import OurTeam from '../components/OurTeam';
// import { NavLink, useNavigate } from 'react-router-dom';
// import HeroSelection from '../components/HeroSelection';

// const apiurl = import.meta.env.VITE_API_URL;

// const allowedNames = [
//   "sagar.r@datasolve-analytics.com",
//   "vinithra.a@datasolve-analytics.com",
//   "megha.m@datasolve-analytics.com",
//   "harish.k@datasolve-analytics.com"
// ];

// const LandingPage = ({ title }) => {
//   const [apps, setApps] = useState([]);
//   const navigate = useNavigate();

//   // Get user info from localStorage
//   const token = localStorage.getItem('token');
//   const username = localStorage.getItem('username');
//   const email = localStorage.getItem('email');
//   const profilelink = localStorage.getItem('profilelink');

//   useEffect(() => {
//     document.title = title;

//     const fetchApps = async () => {
//       if (!email) return;

//       try {
//         const res = await axios.get(`${apiurl}/api/admin/apps/getallapps`, {
//           headers: { Authorization: `Bearer ${token}` }
//         });

//         // Filter apps: only include apps where the logged-in user is assigned
//         const userApps = res.data.filter(app => 
//           app.assignedUsers?.some(u => u.email === email)
//         );

//         // For each app, filter assigned users to allowedNames only
//         const filteredApps = userApps.map(app => ({
//           ...app,
//           assignedUsers: app.assignedUsers.filter(u => allowedNames.includes(u.email))
//         }));

//         // setApps(filteredApps);
//         setApps(userApps);
//       } catch (err) {
//         console.error(err);
//         toast.error("Error fetching apps");
//       }
//     };

//     fetchApps();
//   }, [email, token, title]);

//   const handlelogout = () => {
//     localStorage.clear();
//     navigate('/'); // redirect to login
//   };

//   return (
//     <>
//       {/* Navbar */}
//       <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm sticky-top" id="home">
//         <div className="container-fluid px-3">
//           <NavLink className="navbar-brand d-flex align-items-center" to="/home">
//             <img
//               src="https://storage.googleapis.com/my-react-image-bucket-123/DataSolveLogo.jpg"
//               alt="Datasolve Analytics"
//               height="30"
//               className="d-inline-block align-text-top me-2"
//             />
//           </NavLink>

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
//             <ul className="navbar-nav ms-auto align-items-lg-center gap-3">
//               {token && username && profilelink ? (
//                 <li className="nav-item d-flex align-items-center gap-2">
//                   <NavLink className='navbar-brand d-flex align-items-center' to='/home'>
//                     <img
//                       src="https://storage.googleapis.com/my-react-image-bucket-123/DS_Logos/Logo_Gif/Zentra.gif"
//                       alt="User Icon"
//                       height="35"
//                       className="rounded border"
//                     />
//                   </NavLink>
//                   <div className="dropdown">
//                     <img
//                       src={profilelink}
//                       alt="Profile"
//                       className="rounded-circle border border-2 shadow-sm"
//                       height={45}
//                       width={45}
//                       role="button"
//                       id="profileDropdown"
//                       data-bs-toggle="dropdown"
//                       aria-expanded="false"
//                       style={{ objectFit: 'contain', cursor: 'pointer' }}
//                     />
//                     <ul
//                       className="dropdown-menu dropdown-menu-end shadow-lg border-0 p-3"
//                       aria-labelledby="profileDropdown"
//                       style={{ minWidth: '250px', borderRadius: '10px', marginTop: 9 }}
//                     >
//                       <li className="d-flex align-items-center mb-2">
//                         <img
//                           src={profilelink}
//                           alt="Profile"
//                           className="rounded-circle border border-2 me-3 object-fit-contain"
//                           height={50}
//                           width={60}
//                           style={{ objectFit: 'cover' }}
//                         />
//                         <div>
//                           <strong style={{ fontSize: '14px' }}>{username}</strong>
//                           <p className="text-muted mb-0" style={{ fontSize: '12px' }}>{email}</p>
//                         </div>
//                       </li>
//                       <hr className="dropdown-divider" />
//                       <li>
//                         <button
//                           className="dropdown-item text-dark d-flex align-items-center gap-2"
//                           onClick={handlelogout}
//                         >
//                           <i className="bi bi-box-arrow-right"></i>
//                           Logout
//                         </button>
//                       </li>
//                     </ul>
//                   </div>
//                 </li>
//               ) : (
//                 <li className="nav-item">
//                   <span className="btn btn-outline-primary btn-sm">Login User</span>
//                 </li>
//               )}
//             </ul>
//           </div>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <HeroSelection />
//       <hr />

//       {/* Projects Section */}
//       <div className="container-fluid project-section py-3">
//         <h4 className="text-center text-dark mb-5 fw-bold" id="apps">Our Apps</h4>
//         <div className="row justify-content-center g-4">
//           {apps.length > 0 ? (
//             apps.map((app, index) => (
//               <div className="col-sm-6 col-md-4 col-lg-3 mb-5" key={index}>
//                 <div className="card app-card shadow-sm border-0 position-relative h-100">
//                   <img
//                     src={app.app_logo || 'https://via.placeholder.com/150'}
//                     className="card-img-top p-2 rounded-4"
//                     alt={app.app_name}
//                   />
//                   <div className="card-body text-center d-flex flex-column">
//                     <p className="card-text text-muted text-start flex-grow-1">
//                       <strong style={{ fontSize: 14 }}>{app.app_name}</strong> 
//                       <span style={{ fontSize: 14 }}> - {app.app_description}</span>
//                     </p>
//                     <p className="text-center fw-bold" style={{ color: "#bfbfbf", fontSize: 14 }}>
//                       <em style={{ fontSize: 14 }}>&apos;{app.app_tagline || "Explore and enjoy"}&apos;</em>
//                     </p>
//                     <a
//                       href={app.app_url}
//                       className="stretched-link"
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     ></a>

//                     {/* Assigned Users */}
//                     {app.assignedUsers?.length > 0 && (
//                       <div className="d-flex align-items-center mt-2">
//                         {app.assignedUsers.map((u, i) => (
//                           <img
//                             key={u.id}
//                             src={u.profilelink || "https://via.placeholder.com/40"}
//                             title={u.username}
//                             style={{
//                               width: 50,
//                               height: 50,
//                               borderRadius: "50%",
//                               border: "2px solid #fff",
//                               objectFit: "contain",
//                               marginLeft: i === 0 ? 0 : -12,
//                               boxShadow: "0 0 3px rgba(0,0,0,0.3)"
//                             }}
//                           />
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-center text-muted">No apps assigned to you.</p>
//           )}
//         </div>
//       </div>

//       <hr />
//       <OurTeam />
//       <Footer />
//       <ToastContainer />
//     </>
//   );
// };

// export default LandingPage;


import { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/mclandingpage.css';
import Footer from '../components/Footer';
import OurTeam from '../components/OurTeam';
import { NavLink, useNavigate } from 'react-router-dom';
import HeroSelection from '../components/HeroSelection';

const apiurl = import.meta.env.VITE_API_URL;

const allowedNames = [
  "sagar.r@datasolve-analytics.com",
  "vinithra.a@datasolve-analytics.com",
  "megha.m@datasolve-analytics.com",
  "harish.k@datasolve-analytics.com"
];

const LandingPage = ({ title }) => {
  const [apps, setApps] = useState([]);
  const [isAllowedUser, setIsAllowedUser] = useState(false); // State to track if the logged-in user is allowed
  const navigate = useNavigate();

  // Get user info from localStorage
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');
  const email = localStorage.getItem('email');
  const profilelink = localStorage.getItem('profilelink');

  useEffect(() => {
    document.title = title;

    // Check if logged-in user is in the allowed names list
    if (allowedNames.includes(email)) {
      setIsAllowedUser(true);
    } else {
      setIsAllowedUser(false);
    }

    const fetchApps = async () => {
      if (!email) return;

      try {
        const res = await axios.get(`${apiurl}/api/admin/apps/getallapps`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        // Filter apps: only include apps where the logged-in user is assigned
        const userApps = res.data.filter(app =>
          app.assignedUsers?.some(u => u.email === email)
        );

        // For allowedNames users, show all assigned users, else show no assigned users
        const filteredApps = userApps.map(app => ({
          ...app,
          assignedUsers: isAllowedUser
            ? app.assignedUsers // Show all assigned users if logged-in user is in allowedNames
            : [] // Show no assigned users if not in allowedNames
        }));

        setApps(filteredApps);
      } catch (err) {
        console.error(err);
        toast.error("Error fetching apps");
      }
    };

    fetchApps();
  }, [email, token, title, isAllowedUser]);

  const handlelogout = () => {
    localStorage.clear();
    navigate('/'); // redirect to login
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm sticky-top" id="home">
        <div className="container-fluid px-3">
          <NavLink className="navbar-brand d-flex align-items-center" to="/home">
            <img
              src="https://storage.googleapis.com/my-react-image-bucket-123/DataSolveLogo.jpg"
              alt="Datasolve Analytics"
              height="35"
              className="d-inline-block align-text-top me-2"
            />
          </NavLink>

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
            <ul className="navbar-nav ms-auto align-items-lg-center gap-3">
              {token && username && profilelink ? (
                <li className="nav-item d-flex align-items-center gap-2">
                  <NavLink className='navbar-brand d-flex align-items-center' to='/home'>
                    <img
                      src="https://storage.googleapis.com/my-react-image-bucket-123/DS_Logos/Logo_Gif/Zentra.gif"
                      alt="User Icon"
                      height="37"
                      className="rounded border"
                    />
                  </NavLink>
                  <div className="dropdown">
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
                      style={{ objectFit: 'contain', cursor: 'pointer' }}
                    />
                    <ul
                      className="dropdown-menu dropdown-menu-end shadow-lg border-0 p-3"
                      aria-labelledby="profileDropdown"
                      style={{ minWidth: '250px', borderRadius: '10px', marginTop: 9 }}
                    >
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
                          <p className="text-muted mb-0" style={{ fontSize: '12px' }}>{email}</p>
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

      {/* Hero Section */}
      <HeroSelection />
      <hr />

      {/* Projects Section */}
      <div className="container-fluid project-section py-3">
        <h4 className="text-center text-dark mb-5 fw-bold" id="apps">Our Apps</h4>
        <div className="row justify-content-center g-4">
          {apps.length > 0 ? (
            apps.map((app, index) => (
              <div className="col-sm-6 col-md-4 col-lg-3 mb-5" key={index}>
                <div className="card app-card shadow-sm border-0 position-relative h-100">
                  <img
                    src={app.app_logo || 'https://via.placeholder.com/150'}
                    className="card-img-top p-2 rounded-4"
                    alt={app.app_name}
                  />
                  <div className="card-body text-center d-flex flex-column">
                    <p className="card-text text-muted text-start flex-grow-1">
                      <strong style={{ fontSize: 14 }}>{app.app_name}</strong> 
                      <span style={{ fontSize: 14 }}> - {app.app_description}</span>
                    </p>
                    <p className="text-center fw-bold" style={{ color: "#bfbfbf", fontSize: 14 }}>
                      <em style={{ fontSize: 14 }}>&apos;{app.app_tagline || "Explore and enjoy"}&apos;</em>
                    </p>
                    <a
                      href={app.app_url}
                      className="stretched-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    ></a>

                    {/* Show assigned users only for allowedNames users */}
                    {app.assignedUsers?.length > 0 && isAllowedUser && (
                      <div className="d-flex align-items-center mt-2">
                        {app.assignedUsers.map((u, i) => (
                          <img
                            key={u.id}
                            src={u.profilelink || "https://via.placeholder.com/40"}
                            title={u.username}
                            style={{
                              width: 50,
                              height: 50,
                              borderRadius: "50%",
                              border: "2px solid #fff",
                              objectFit: "contain",
                              marginLeft: i === 0 ? 0 : -12,
                              boxShadow: "0 0 3px rgba(0,0,0,0.3)"
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-muted">No apps assigned to you.</p>
          )}
        </div>
      </div>

      <hr />
      <OurTeam />
      <Footer />
      <ToastContainer />
    </>
  );
};

export default LandingPage;
