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


//   const [searchTerm, setSearchTerm] = useState("");

//   // Handle the search term change
//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   // Filter apps based on the search term
//   const filteredApps = apps.filter(app =>
//     app.app_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     app.app_description.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     app.app_tagline.toLowerCase().includes(searchTerm.toLowerCase())
//   );

// const LandingPage = ({ title }) => {
//   const [apps, setApps] = useState([]);
//   const [isAllowedUser, setIsAllowedUser] = useState(false); // State to track if the logged-in user is allowed
//   const navigate = useNavigate();

//   // Get user info from localStorage
//   const token = localStorage.getItem('token');
//   const username = localStorage.getItem('username');
//   const email = localStorage.getItem('email');
//   const profilelink = localStorage.getItem('profilelink');

//   useEffect(() => {
//     document.title = title;

//     // Check if logged-in user is in the allowed names list
//     if (allowedNames.includes(email)) {
//       setIsAllowedUser(true);
//     } else {
//       setIsAllowedUser(false);
//     }

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

//         // For allowedNames users, show all assigned users, else show no assigned users
//         const filteredApps = userApps.map(app => ({
//           ...app,
//           assignedUsers: isAllowedUser
//             ? app.assignedUsers // Show all assigned users if logged-in user is in allowedNames
//             : [] // Show no assigned users if not in allowedNames
//         }));

//         setApps(filteredApps);
//       } catch (err) {
//         console.error(err);
//         toast.error("Error fetching apps");
//       }
//     };

//     fetchApps();
//   }, [email, token, title, isAllowedUser]);

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
//               height="35"
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
//                       height="37"
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
//                           style={{ objectFit: 'contain' }}
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
 
//         <h4 className="text-center text-dark mb-5 fw-bold" id="apps">Our Apps Suite</h4> 
//     <div className="row justify-content-center g-4">
//  {apps.length > 0 ? (
//   apps.map((app, index) => (
//     <div className="col-sm-6 col-md-4 col-lg-3 mb-5" key={index}>
//       <div className="card app-card shadow-sm border-0 position-relative h-100">
//         <img
//           src={app.app_logo || "https://via.placeholder.com/150"}
//           className="card-img-top p-2 rounded-4"
//           alt={app.app_name}
//         />
//         <div className="card-body text-center d-flex flex-column">
//           <p className="card-text text-muted text-start flex-grow-1">
//             <strong style={{ fontSize: 14 }}>{app.app_name}</strong> 
//             <span style={{ fontSize: 14 }}> - {app.app_description}</span>
//           </p>
//           <p className="text-center fw-bold" style={{ color: "#bfbfbf", fontSize: 14 }}>
//             <em style={{ fontSize: 14 }}>&apos;{app.app_tagline || "Explore and enjoy"}&apos;</em>
//           </p>
//           <a
//             href={app.app_url}
//             className="stretched-link"
//             target="_blank"
//             rel="noopener noreferrer"
//           ></a>

//           {/* Assigned Users with +N and hover expanded view */}
//           {app.assignedUsers?.length > 0 && isAllowedUser && (
//             <div className="assigned-users-container position-relative mt-2">
//               {/* Stacked avatars (max 3) */}
//               {app.assignedUsers.slice(0, 3).map((u, i) => (
//                 <img
//                   key={u.id}
//                   src={u.profilelink || "https://via.placeholder.com/40"}
//                   title={u.username}
//                   style={{
//                     width: 45,
//                     height: 45,
//                     borderRadius: "50%",
//                     border: "2px solid #fff",
//                     objectFit: "contain",
//                     marginLeft: i === 0 ? 0 : -15,
//                     boxShadow: "0 0 3px rgba(0,0,0,0.3)",
//                   }}
//                 />
//               ))}

//               {/* +N indicator */}
//               {app.assignedUsers.length > 3 && (
//                 <div className="plus-n-indicator">
//                   +{app.assignedUsers.length - 3}
//                   {/* Expanded view only on hover */}
//                   <div className="expanded-users">
//                     {app.assignedUsers.map((u) => (
//                       <img
//                         key={u.id}
//                         src={u.profilelink || "https://via.placeholder.com/40"}
//                         title={u.username}
//                         style={{
//                           width: 40,
//                           height: 40,
//                           borderRadius: "30%",
//                           border: "2px solid #fff",
//                           objectFit: "contain",
//                           marginRight: 5,
//                           boxShadow: "0 0 3px rgba(0,0,0,0.3)",
//                         }}
//                       />
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   ))
// ) : (
//   <p className="text-center text-muted">No apps assigned to you.</p>
// )}

// </div>

// {/* CSS (Add in your stylesheet or style tag) */}
// <style>
// {`
// .assigned-users-container {
//   display: flex;
//   align-items: center;
//   cursor: pointer;
//   position: relative;
// }

// .expanded-users {
//   position: absolute;
//   top: 1px; 
//   left: 0;
//   display: flex;
//   background: white;
//   padding: 5px;
 
//   border-radius: 10px;
//   box-shadow: 0 0 5px rgba(0,0,0,0.2);
//   transform: translateX(-50px);
//   opacity: 0;
//   transition: transform 0.3s ease, opacity 0.3s ease;
//   z-index: 100;
// }

// .assigned-users-container:hover .expanded-users {
//   transform: translateX(0); /* slide in from left to right */
//   opacity: 1;
// }
// `}
// </style>


// {/* Add this CSS in your stylesheet or inline */}
// <style>
// {`
// .assigned-users-container:hover .expanded-users {
//   display: flex;
// }
// `}
// </style>

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
  const [filteredApps, setFilteredApps] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAllowedUser, setIsAllowedUser] = useState(false); // State to track if the logged-in user is allowed
  const navigate = useNavigate();

  // Get user info from localStorage
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');
  const email = localStorage.getItem('email');
  const profilelink = localStorage.getItem('profilelink');

  // Handle the search term change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter apps based on the search term
  useEffect(() => {
    const filtered = apps.filter(app =>
      app.app_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.app_description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.app_tagline.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredApps(filtered);
  }, [searchTerm, apps]);

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
        const updatedApps = userApps.map(app => ({
          ...app,
          assignedUsers: isAllowedUser
            ? app.assignedUsers // Show all assigned users if logged-in user is in allowedNames
            : [] // Show no assigned users if not in allowedNames
        }));

        setApps(updatedApps);
      } catch (err) {
        console.error(err);
        toast.error("Error fetching apps");
      }
    };

    fetchApps();
  }, [email, token, title, isAllowedUser]);

  const handleLogout = () => {
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
                          style={{ objectFit: 'contain' }}
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
                          onClick={handleLogout}
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

  {/* Header Row */}
  <div className="row align-items-center mb-5">
    
    {/* Empty column (left spacer) */}
    <div className="col-12 col-md-4 d-none d-md-block"></div>

    {/* Center Title */}
    <div className="col-12 col-md-4 text-center">
      <h4 className="text-dark fw-bold" id="apps">
        Datasolve Apps Suite
      </h4>
    </div>

    {/* Search (Right aligned) */}
    <div className="col-12 col-md-4 d-flex justify-content-md-end justify-content-center mt-3 mt-md-0">
      <div className="search-container" style={{ maxWidth: 260, width: "100%" }}>
        <input
          type="text"
          className="form-control"
          placeholder="Search for an app..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
    </div>

  </div>

  {/* Cards */}
  <div className="row justify-content-center g-3">
    {filteredApps.length > 0 ? (
      filteredApps.map((app, index) => (
        <div className="col-sm-6 col-md-3 col-lg-3 mb-5" key={index}>
          <div className="card app-card shadow-sm border-0 position-relative h-100">
            <img
              src={app.app_logo || "https://via.placeholder.com/150"}
              className="card-img-top p-2 rounded-4"
              alt={app.app_name}
            />
            <div className="card-body text-center d-flex flex-column">
              <p className="card-text text-muted text-start flex-grow-1">
                <strong style={{ fontSize: 14 }}>{app.app_name}</strong>
                <span style={{ fontSize: 14 }}> - {app.app_description}</span>
              </p>

              <p className="text-center fw-bold" style={{ color: "#bfbfbf", fontSize: 14 }}>
                <em>&apos;{app.app_tagline || "Explore and enjoy"}&apos;</em>
              </p>

              <a
                href={app.app_url}
                className="stretched-link"
                target="_blank"
                rel="noopener noreferrer"
              ></a>
            </div>
          </div>
        </div>
      ))
    ) : (
      <p className="text-center text-muted">No apps found matching your search.</p>
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
