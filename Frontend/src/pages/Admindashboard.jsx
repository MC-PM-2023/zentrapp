
import React, { useEffect, useState } from "react";
import Adminheader from "../components/Adminheader";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../components/Footer";
import HeroSelection from "../components/HeroSelection";
import '../css/Admindashboard.css'
const apiurl = import.meta.env.VITE_API_URL;

const Admindashboard = ({ title }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  const [activeTab, setActiveTab] = useState("allapps");

  // Users
  const [pendingUsers, setPendingUsers] = useState([]);
  const [approvedUsers, setApprovedUsers] = useState([]);
  const [rejectedUsers, setRejectedUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");
  
const [searchTerm, setSearchTerm] = useState("");


  // Apps
  const [appCard, setAppCard] = useState({
    appname: "",
    appdescription: "",
    apptagline: "",
    appprofilelink: "",
    applink: "",
  });

  const [assignEmail, setAssignEmail] = useState("");
  const [assignAppNames, setAssignAppNames] = useState("");
  const [allApps, setAllApps] = useState([]);
const [showEditModal, setShowEditModal] = useState(false);
const [selectedApp, setSelectedApp] = useState(null);
const [selectedUsers, setSelectedUsers] = useState([]); 
const [allUsers, setAllUsers] = useState([]);
const [activityLogs, setActivityLogs] = useState([]);
  const [heroLogos, setHeroLogos] = useState([]);
  const [selectedHero, setSelectedHero] = useState(null); // null = show all
const [searchText, setSearchText] = useState("");
const [actionFilter, setActionFilter] = useState("all");
const [showUpdateModal, setShowUpdateModal] = useState(false);

const [editUser, setEditUser] = useState({
  id: "",
  username: "",
  email: "",
  role: ""
});




const filteredLogs = activityLogs.filter((log) => {
  const search = searchText.toLowerCase();

  const matchesSearch =
    log.admin_name?.toLowerCase().includes(search) ||
    log.action_type?.toLowerCase().includes(search) ||
    log.target_entity?.toLowerCase().includes(search) ||
    log.target_name?.toLowerCase().includes(search) ||
    log.status?.toLowerCase().includes(search);

  const matchesAction =
    actionFilter === "all" || log.action_type === actionFilter;

  return matchesSearch && matchesAction;
});


  // ------------------------ Fetch Roles ------------------------
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await axios.get(`${apiurl}/api/admin/getroles`);
        setRoles(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRoles();
  }, []);

  // ------------------------ Fetch Users ------------------------
  const fetchUsers = async (type) => {
    try {
      let res;
      if (type === "pending") res = await axios.get(`${apiurl}/api/admin/getpendingusers`);
      if (type === "approved") res = await axios.get(`${apiurl}/api/admin/getapprovedusers`);
      if (type === "rejected") res = await axios.get(`${apiurl}/api/admin/getrejectedusers`);

      if (type === "pending") setPendingUsers(res.data || []);
      if (type === "approved") setApprovedUsers(res.data || []);
      if (type === "rejected") setRejectedUsers(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };


const handleUpdateApprovedUser = async () => {
  try {
    if (!editUser.id || !editUser.username || !editUser.email || !editUser.role) {
      return toast.error("All fields are required");
    }

    const token = localStorage.getItem("token");

    await axios.put(
      `${apiurl}/api/admin/updategetapprovedusersstatus`,
      {
        id: editUser.id,
        username: editUser.username,
        email: editUser.email,
        role: editUser.role
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    toast.success("Approved user updated successfully!");

    // close modal
    setShowUpdateModal(false);

    // refresh approved users list
    fetchUsers("approved");

  } catch (error) {
    console.error(error);
    toast.error("Failed to update approved user");
  }
};


//corrected code
  // ------------------------ Fetch Apps ------------------------
  // const fetchApps = async () => {
  //   try {
  //     const res = await axios.get(`${apiurl}/api/admin/apps/getallapps`);
  //     setAllApps(res.data || []);
  //   } catch (err) {
  //     console.error(err);
  //     setAllApps([]);
  //   }
  // };
  const fetchApps = async () => {
  try {
const token=localStorage.getItem("token")
    const res = await axios.get(
      `${apiurl}/api/admin/apps/getallapps`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setAllApps(res.data || []);
  } catch (err) {
    console.error(err);
    setAllApps([]);
  }
};






  // ------------------------ Load Data on Tab Change ------------------------
  useEffect(() => {
    if (["pending", "approved", "rejected"].includes(activeTab)) {
      fetchUsers(activeTab);
    } else if (["allapps", "assignapp"].includes(activeTab)) {
      fetchApps();
    }
 
  }, [activeTab]);

  // ------------------------ User Actions ------------------------
  const approveUser = async () => {
    if (!selectedRole || !selectedUser) return toast.error("Select a user and role");
    try {
      await axios.post(`${apiurl}/api/admin/approvedusers`, { id: selectedUser.id, role: selectedRole });
      setPendingUsers((prev) => prev.filter((u) => u.id !== selectedUser.id));
      toast.success("User approved!");
    } catch (err) {
      toast.error("Error approving user");
    }
  };

  const rejectUser = async () => {
    if (!selectedUser) return toast.error("Select a user");
    try {
      await axios.post(`${apiurl}/api/admin/rejectedusers`, { id: selectedUser.id });
      setPendingUsers((prev) => prev.filter((u) => u.id !== selectedUser.id));
      toast.success("User rejected!");
    } catch (err) {
      toast.error("Error rejecting user");
    }
  };

  const deleteApprovedUser = async (user) => {
    try {
      await axios.put(`${apiurl}/api/admin/updateapproveusers`, { id: user.id });
      setApprovedUsers((prev) => prev.filter((u) => u.id !== user.id));
      toast.success("User deleted!");
    } catch (err) {
      toast.error("Error deleting user");
    }
  };
//corrected code
  // ------------------------ App Actions ------------------------
  // const addApp = async () => {
  //   const { appname, appdescription, apptagline, appprofilelink, applink } = appCard;
  //   if (!appname || !appdescription || !apptagline || !appprofilelink || !applink)
  //     return toast.error("All fields are required");
  //   try {
     
  //     await axios.post(`${apiurl}/api/admin/apps/add`, appCard
  //   );
  //     toast.success("App added successfully!");
  //     setAppCard({ appname: "", appdescription: "", apptagline: "", appprofilelink: "", applink: "" });
  //     fetchApps();
  //   } catch (err) {
  //     toast.error("Error adding app");
  //   }
  // };


  const addApp = async () => {
  const { appname, appdescription, apptagline, appprofilelink, applink ,appisometriclink} = appCard;
  if (!appname || !appdescription || !apptagline || !appprofilelink || !applink || !appisometriclink)
    return toast.error("All fields are required");

  try {
    const token = localStorage.getItem('token'); // get token from localStorage
console.log("token is:",token);

    await axios.post(
      `${apiurl}/api/admin/apps/add`,
      appCard,
      {
        headers: {
          Authorization: `Bearer ${token}` // include token in header
        }
      }
    );

    toast.success("App added successfully!");
    setAppCard({ appname: "", appdescription: "", apptagline: "", appprofilelink: "", applink: "" ,appisometriclink:"" });
    fetchApps();
  } catch (err) {
    console.error(err);
    toast.error("Error adding app");
  }
};


  const handleEditApp = (app) => {
    // Prefill form for editing (simple example)
    setAppCard({
      appname: app.app_name,
      appdescription: app.app_description,
      apptagline: app.app_tagline,
      appprofilelink: app.app_logo,
      applink: app.app_url,
      appisometriclink:app.app_isometric_link,
      id: app.id, // store id for updating
    });
    setActiveTab("addapp");
  };

//corrected code

  // const updateApp = async () => {
  //   if (!appCard.id) return toast.error("Select app to update");
  //   try {
  //     await axios.put(`${apiurl}/api/admin/apps/edit/${appCard.id}`, appCard);
  //     toast.success("App updated successfully!");
  //     setAppCard({ appname: "", appdescription: "", apptagline: "", appprofilelink: "", applink: "" });
  //     fetchApps();
  //     setActiveTab("allapps");
  //   } catch (err) {
  //     toast.error("Error updating app");
  //   }
  // };


  const updateApp = async () => {
  if (!appCard.id) return toast.error("Select app to update");

  try {
    const token = localStorage.getItem("token");

    const payload = {
      appname: appCard.appname,
      appdescription: appCard.appdescription,
      applink: appCard.applink,
      apptagline: appCard.apptagline,
      appprofilelink: appCard.appprofilelink,
      appisometriclink:appCard.appisometriclink
    };

    await axios.put(
      `${apiurl}/api/admin/apps/edit/${appCard.id}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    toast.success("App updated successfully!");

    setAppCard({
      appname: "",
      appdescription: "",
      apptagline: "",
      appprofilelink: "",
      applink: "",
      id: ""
    });

    fetchApps();
    setActiveTab("allapps");

  } catch (err) {
    toast.error("Error updating app");
    console.log(err);
  }
};

//corrected code
  // const handleDeleteApp = async (id) => {
  //   try {
  //     await axios.delete(`${apiurl}/api/admin/apps/delete/${id}`);
  //     toast.success("App deleted successfully!");
  //     fetchApps();
  //   } catch (err) {
  //     toast.error("Error deleting app");
  //   }
  // };

  const handleDeleteApp = async (id) => {
  try {
    const token = localStorage.getItem("token"); // get JWT token

    await axios.delete(
      `${apiurl}/api/admin/apps/delete/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}` // attach token here
        }
      }
    );

    toast.success("App deleted successfully!");
    fetchApps(); // refresh app list

  } catch (err) {
    toast.error("Error deleting app");
    console.error(err);
  }
};

//corrected code without token
  // const assignApps = async () => {
  //   if (!assignEmail || !assignAppNames) return toast.error("Email and App Names required");
  //   try {
  //     await axios.post(`${apiurl}/api/admin/apps/assign`, {
  //       email: assignEmail,
  //       appname: assignAppNames,
  //     });
  //     toast.success("App(s) assigned successfully!");
  //     setAssignAppNames("");
  //     setAssignEmail("")
  //     fetchApps();
  //   } catch (err) {
  //     toast.error("Error assigning app(s)");
  //   }
  // };

//corrected code without token
// const assignApps = async () => {
//   if (!assignEmail || !assignAppNames) 
//     return toast.error("Email(s) and App Name(s) are required");

//   // Split comma-separated emails and apps into arrays
//   const emailList = assignEmail.split(",").map(e => e.trim()).filter(e => e);
//   const appList = assignAppNames.split(",").map(a => a.trim()).filter(a => a);

//   try {
//     await axios.post(`${apiurl}/api/admin/apps/assign`, {
//       emails: emailList,
//       appnames: appList,
//     });

//     toast.success("App(s) assigned successfully!");
//     setAssignAppNames("");
//     setAssignEmail("");
//     fetchApps();
//   } catch (err) {
//     console.error(err);
//     toast.error("Error assigning app(s)");
//   }
// };

//corrected code with token
const assignApps = async () => {
  if (!assignEmail || !assignAppNames) 
    return toast.error("Email(s) and App Name(s) are required");

  // Split comma-separated emails and apps into arrays
  const emailList = assignEmail.split(",").map(e => e.trim()).filter(e => e);
  const appList = assignAppNames.split(",").map(a => a.trim()).filter(a => a);

  try {
    const token = localStorage.getItem("token"); // get JWT token

    await axios.post(
      `${apiurl}/api/admin/apps/assign`,
      {
        emails: emailList,
        appnames: appList,
      },
      {
        headers: {
          Authorization: `Bearer ${token}` // attach token here
        }
      }
    );

    toast.success("App(s) assigned successfully!");
    setAssignAppNames("");
    setAssignEmail("");
    fetchApps();

  } catch (err) {
    console.error(err);
    toast.error("Error assigning app(s)");
  }
};


// const handleEditAssignedUsers = (app) => {
//   setSelectedApp(app);
//   // setSelectedUsers(app.assignedUsers.map(u => u.email)); // Prefill
//   const assignedEmails = (app.assignedUsers || []).map(u => u.email || "");
// console.log("Assigned Emails:", assignedEmails);
//   setSelectedUsers(assignedEmails);

//   setShowEditModal(true);

//   // Fetch all users for selection
//   fetch(`${apiurl}/api/admin/getallusers`)
//     .then(res => res.json())
//     .then(data => setAllUsers(data))
//     .catch(err => console.error(err));
// };


const handleEditAssignedUsers = async (app) => {
  setSelectedApp(app);

  // Preselect already assigned users (by email)
  const assignedEmails = (app.assignedUsers || []).map(u => u.email);
  setSelectedUsers(assignedEmails);

  setShowEditModal(true);

  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      `${apiurl}/api/admin/getapprovedusers`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setAllUsers(res.data || []);
  } catch (err) {
    console.error("Error fetching approved users", err);
  }
};



// const updateAssignedUsers = async () => {
//   try {
//     // Assume your API can handle a full list of assigned users for an app
//     await axios.put(`${apiurl}/api/admin/apps/update-assigned/${selectedApp.id}`, {
//       assignedUsers: selectedUsers, // Array of emails or IDs
    
//     });
//     toast.success("Assignments updated successfully!");
//     setShowEditModal(false);
//     fetchApps(); // Refresh the apps list
//   } catch (err) {
//     console.error(err);
//     toast.error("Error updating assignments");
//   }
// };

const updateAssignedUsers = async () => {
  try {
    const token = localStorage.getItem("token"); // get JWT token

    await axios.put(
      `${apiurl}/api/admin/apps/update-assigned/${selectedApp.id}`,
      {
        assignedUsers: selectedUsers, // Array of emails or IDs
      },
      {
        headers: {
          Authorization: `Bearer ${token}` // attach token
        }
      }
    );

    toast.success("Assignments updated successfully!");
    setShowEditModal(false);
    fetchApps(); // Refresh the apps list

  } catch (err) {
    console.error(err);
    toast.error("Error updating assignments");
  }
};


const fetchActivityLogs = async () => {
  try {
    const response = await axios.get(`${apiurl}/api/log/activity`);
    // console.log(response)
    setActivityLogs(response.data.data);
  } catch (error) {
    console.error("Error fetching activity logs:", error);
  }
};

useEffect(() => {
  fetchActivityLogs();
}, []);

const cellStyle = {
  wordWrap: "break-word",
  height: "35px",
  fontSize: 11,
  maxWidth: "150px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  padding: "5px",
};
const highlightText = (text, highlight) => {
  if (!highlight) return text;
  const parts = text.toString().split(new RegExp(`(${highlight})`, "gi"));
  return parts.map((part, i) =>
    part.toLowerCase() === highlight.toLowerCase() ? (
      <mark key={i}>{part}</mark>
    ) : (
      part
    )
  );
};


// Fetch hero logos
const fetchHeroLogos = async () => {
  try {
    const res = await axios.get(`${apiurl}/api/user/usersectionlogos`);
    // console.log("AXIOS RESPONSE:", res.data);

    if (res.data.success) {
      setHeroLogos(res.data.data);
    } else {
      console.warn("API returned success:false", res.data);
    }
  } catch (err) {
    console.error("Error fetching hero logos:", err);
  }
};

// Fetch apps
useEffect(() => {
  fetchHeroLogos();
}, []);


const filteredApps = allApps.filter((item) =>
  item.app_name.toLowerCase().includes(searchTerm.toLowerCase())
);


  // ------------------------ Render ------------------------
  return (
    <>
    <div>
      <Adminheader />
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
          <nav className="col-md-3 col-lg-2 d-md-block bg-dark sidebar vh-100 p-3"   style={{
    position: "fixed",
    top: 0,
    left: 0,
    height: "100vh",
    overflowY: "auto",
    width: "inherit", // ensures same width as Bootstrap column
  }}
>
            <div className="position-sticky">
              <h5 className="text-white text-center mb-5 fw-bold">Admin Dashboard</h5>
              <ul className="nav flex-column">
                {["pending", "approved", "rejected", "addapp",  "allapps","activitylogs"].map((tab) => (
                  <li className="nav-item mb-2" key={tab}>
                    <button  style={{ fontSize: "13px" }}
                      className={`btn w-100 text-start rounded-pill px-3 py-2 mb-2 text-white ${
                        activeTab === tab ? "btn-primary shadow-sm" : "btn-outline-light"
                      }`
                    
                    }
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab.charAt(0).toUpperCase() +
                        tab.slice(1).replace("app", " App").replace("assign", "Assign ")}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* Main Content */}
          <main className="col-md-9 ms-sm-auto col-lg-10  py-2 " style={{ maxHeight: "100vh" }}>
            {activeTab !=="allapps" &&(
 <div className="d-flex justify-content-between align-items-center ">
              <h2 className="fw-bold text-secondary">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </h2>
            </div>
            )}
           

            {/* Render Tabs */}
            {activeTab === "pending" && (
              <div className="row g-4 ">
                {pendingUsers.length === 0 && <p className="text-muted">No pending users.</p>}
                {pendingUsers.map((u) => (
                  <div className="col-md-6 col-lg-4" key={u.id}>
                    <div className="card border-0 shadow-sm rounded-4 h-100">
                      <div className="card-body d-flex flex-column">
                        <h5 className="card-title fw-bold">{u.username}</h5>
                        <p className="card-text text-muted mb-3">{u.email}</p>
                        <select
                          className="form-select mb-3"
                          onChange={(e) => setSelectedRole(e.target.value)}
                        >
                          <option value="">Select Role</option>
                          {roles.map((r) => (
                            <option key={r} value={r}>
                              {r}
                            </option>
                          ))}
                        </select>
                        <div className="mt-auto d-flex gap-2">
                          <button
                            className="btn btn-success btn-sm flex-fill rounded-pill"
                            onClick={() => {
                              setSelectedUser(u);
                              approveUser();
                            }}
                          >
                            Approve
                          </button>
                          <button
                            className="btn btn-danger btn-sm flex-fill rounded-pill"
                            onClick={() => {
                              setSelectedUser(u);
                              rejectUser();
                            }}
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "approved" && (
              <div className="row g-4">
                {approvedUsers.length === 0 && <p className="text-muted">No approved users.</p>}
                {approvedUsers.map((u) => (
                  <div className="col-md-6 col-lg-4" key={u.id}>
                    <div className="card border-0 shadow-sm rounded-4 h-100">
                      <div className="card-body d-flex flex-column justify-content-center">
                        <h5 className="card-title fw-bold">{u.username}</h5>
                        <p className="card-text text-muted">{u.email}</p>
                        <p className="text-muted mb-3">{u.role}</p>

                      
                         <button
                          className="btn btn-outline-success btn-sm w-100 rounded-pill mt-auto mb-2"
                          onClick={()=>{
                            setEditUser({
                              id:u.id,
                              username:u.username,
                              email:u.email,
                              role:u.role
                            })
                            setShowUpdateModal(true)
                          }}
                        >
                          Update
                        </button>
                        <button
                          className="btn btn-outline-danger btn-sm w-100 rounded-pill mt-auto"
                          onClick={() => deleteApprovedUser(u)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                  <footer className="text-center py-3 mt-4 border-top">
      <small className="text-muted">
         © {new Date().getFullYear()} Datasolve Analytics · All Rights Reserved
      </small>
  </footer>
              </div>
            )}
            {showUpdateModal && (
  <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content rounded-4">

        <div className="modal-header">
          <h5 className="modal-title">Update Approved User</h5>
          <button
            className="btn-close"
            onClick={() => setShowUpdateModal(false)}
          />
        </div>

        <div className="modal-body">
          <input
            className="form-control mb-3"
            placeholder="Username"
            value={editUser.username}
            onChange={(e) =>
              setEditUser({ ...editUser, username: e.target.value })
            }
          />

          <input
            className="form-control mb-3"
            placeholder="Email"
            value={editUser.email}
            onChange={(e) =>
              setEditUser({ ...editUser, email: e.target.value })
            }
          />

          <select
            className="form-select"
            value={editUser.role}
            onChange={(e) =>
              setEditUser({ ...editUser, role: e.target.value })
            }
          >
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>
        </div>

        <div className="modal-footer">
          <button
            className="btn btn-secondary rounded-pill"
            onClick={() => setShowUpdateModal(false)}
          >
            Cancel
          </button>

          <button
            className="btn btn-success rounded-pill"
            onClick={handleUpdateApprovedUser}
          >
            Update
          </button>
        </div>

      </div>
    </div>
  </div>
)}


            {activeTab === "rejected" && (
              <div className="row g-4">
                {rejectedUsers.length === 0 && <p className="text-muted">No rejected users.</p>}
                {rejectedUsers.map((u) => (
                  <div className="col-md-6 col-lg-4" key={u.id}>
                    <div className="card border-0 shadow-sm rounded-4 h-100">
                      <div className="card-body d-flex flex-column">
                        <h5 className="card-title fw-bold">{u.username}</h5>
                        <p className="card-text text-muted">{u.email}</p>
                        <span className="badge bg-danger mt-auto">{u.status}</span>
                      </div>
                    </div>
                  </div>
                ))}
        
              </div>
            )}

            {activeTab === "addapp" && (
              <div className="card p-4 shadow-sm rounded-4">
                <h3 className="mb-3 fw-bold">{appCard.id ? "Edit App" : "Add New App"}</h3>
                <input
                  className="form-control rounded-pill mb-3"
                  placeholder="App Name"
                  value={appCard.appname}
                  onChange={(e) => setAppCard({ ...appCard, appname: e.target.value })}
                />
                <textarea
                  className="form-control rounded-3 mb-3"
                  placeholder="App Description"
                  value={appCard.appdescription}
                  onChange={(e) => setAppCard({ ...appCard, appdescription: e.target.value })}
                />
                <input
                  className="form-control rounded-pill mb-3"
                  placeholder="App Tagline"
                  value={appCard.apptagline}
                  onChange={(e) => setAppCard({ ...appCard, apptagline: e.target.value })}
                />
                <input
                  className="form-control rounded-pill mb-3"
                  placeholder="App Logo URL"
                  value={appCard.appprofilelink}
                  onChange={(e) => setAppCard({ ...appCard, appprofilelink: e.target.value })}
                />
                 <input
                  className="form-control rounded-pill mb-3"
                  placeholder="App isometric URL"
                  value={appCard.appisometriclink}
                  onChange={(e) => setAppCard({ ...appCard, appisometriclink: e.target.value })}
                />
                <input
                  className="form-control rounded-pill mb-3"
                  placeholder="App URL"
                  value={appCard.applink}
                  onChange={(e) => setAppCard({ ...appCard, applink: e.target.value })}
                />
                <button
                  className="btn btn-success rounded-pill"
                  onClick={appCard.id ? updateApp : addApp}
                >
                  {appCard.id ? "Update App" : "Add App"}
                </button>
                  <footer className="text-center py-3 mt-4 border-top">
      <small className="text-muted">
         © {new Date().getFullYear()} Datasolve Analytics · All Rights Reserved
      </small>
  </footer>
              </div>
            )}

            {activeTab === "assignapp" && (
              <div className="card p-4 shadow-sm rounded-4">
                <h3 className="mb-3 fw-bold">Assign App(s) to User</h3>
                <input
                  className="form-control rounded-pill mb-3"
                  placeholder="User Email (s) (comma-separated)"
                  value={assignEmail}
                  onChange={(e) => setAssignEmail(e.target.value)}
                />
                <input
                  className="form-control rounded-pill mb-3"
                  placeholder="App Name (s) (comma-separated)"
                  value={assignAppNames}
                  onChange={(e) => setAssignAppNames(e.target.value)}
                />
                <button className="btn btn-primary rounded-pill" onClick={assignApps}>
                  Assign App(s)
                </button>
                  <footer className="text-center py-3 mt-4 border-top">
      <small className="text-muted">
         © {new Date().getFullYear()} Datasolve Analytics · All Rights Reserved
      </small>
  </footer>
              </div>
            )}
{/* 
            {activeTab === "allapps" && (
              <div className="row g-4">
                {allApps.length === 0 && <p className="text-muted">No apps available.</p>}
                {allApps.map((item) => (
                  <div className="col-sm-6 col-md-4 col-lg-3 mb-5" key={item.id}>
                    <div className="card app-card shadow-sm border-0 h-100 position-relative">
                      <img
                        src={item.app_logo || "https://via.placeholder.com/300"}
                        className="card-img-top p-2 rounded-4"
                        alt={item.app_name}
                      />
                      <div className="card-body text-center d-flex flex-column">
                        <p className="card-text text-muted text-start flex-grow-1">
                          <strong>{item.app_name}</strong> — {item.app_description}
                        </p>
                        <p className="text-center fw-bold" style={{ color: "#bfbfbf" }}>
                          <em>{item.app_tagline}</em>
                        </p>
                        <a
                          href={item.app_url}
                          className="stretched-link"
                          target="_blank"
                          rel="noopener noreferrer"
                        ></a>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between mt-3">
                      <button
                        className="btn btn-sm btn-outline-primary rounded-pill"
                        onClick={() => handleEditApp(item)}
                      >
                        <i className="bi bi-pencil-square me-1"></i>Edit
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger rounded-pill"
                        onClick={() => handleDeleteApp(item.id)}
                      >
                        <i className="bi bi-trash me-1"></i>Delete
                      </button>
                    </div>
            <h6 className="text-secondary mt-2">Assigned Users:</h6>
{item.assignedUsers && item.assignedUsers.length > 0 ? (
  <div >
    {item.assignedUsers.map((user) => (
      <span key={user.id} className="badge bg-primary me-1 mb-1">
        {user.username} 
      </span>
    ))}
  
    <button
  className="btn btn-sm btn-outline-success rounded-pill"
  onClick={() => handleEditAssignedUsers(item)}
>
  <i className="bi bi-pencil-square me-1"></i>
</button>

  </div>
) : (
  <p className="text-muted mb-0">No users assigned</p>
)}

        
                  </div>
                ))}
                
              </div>
              
              
            )} */}
            {activeTab === "allapps" && (     
  <div className="row g-4 mt-1">
    {allApps.length === 0 && <p className="text-muted">No apps available.</p>}
   <HeroSelection/>

{/* Hero Logos Section */}
{/* <div className="row gx-4 gy-4 p-4 mb-4">
  {heroLogos?.map((item, index) => (
    <div key={index} className="col-6 col-sm-4 col-md-3 col-lg-2">
      <div
        className={`bg-white shadow rounded p-3 d-flex flex-column align-items-center justify-content-center hover-shadow transition ${
          selectedHero === item.app_name ? "border border-primary" : ""
        }`}
        style={{ cursor: "pointer" }}
        onClick={() => setSelectedHero(item.app_name)}
      >
        <img
          src={item.image_link}
          alt={item.app_name}
          className="mb-3"
          style={{ width: "80px", height: "80px", objectFit: "contain" }}
        />
        <p className="text-center small fw-semibold text-secondary">
          {item.app_name}
        </p>
      </div>
    </div>
  ))}
</div> */}

{/* Apps Section */}





{/* //last corrected code */}
   {/* <div className="row gx-4 gy-4 p-4 mb-4">
  {allApps.map((item) => (
    <div key={item.id} className="col-6 col-sm-4 col-md-3 col-lg-2">
      <div
        className={`bg-white shadow rounded p-3 d-flex flex-column align-items-center justify-content-center hover-shadow transition position-relative ${
          selectedApp === item.id ? "border border-primary" : ""
        }`}
        style={{ cursor: "pointer", minHeight: "250px" }}
        onClick={() => setSelectedApp(item.id)}
      >
       
        <img
          src={item.app_isometric_link || "https://via.placeholder.com/80"}
          alt={item.app_name}
          className="mb-3"
          style={{ width: "80px", height: "80px", objectFit: "contain", borderRadius: "8px" }}
        />

     
        <p className="text-center small fw-semibold text-secondary mb-1">
          {item.app_name}
        </p>
       

       
        {item.assignedUsers && item.assignedUsers.length > 0 ? (
          <div className="d-flex align-items-center mt-2">
            {item.assignedUsers.map((user, i) => (
              <img
                key={user.id}
                src={user.profilelink || "https://via.placeholder.com/40"}
                alt={user.username}
                title={user.username}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  objectFit: "contain",
                  border: "2px solid white",
                  marginLeft: i === 0 ? 0 : -8,
                  boxShadow: "0 0 3px rgba(0,0,0,0.3)"
                }}
              />
            ))}

            <button
              className="btn btn-sm btn-outline-success rounded-pill ms-2"
              onClick={(e) => {
                e.stopPropagation(); 
                handleEditAssignedUsers(item);
              }}
            >
              <i className="bi bi-pencil-square"></i>
            </button>
          </div>
        ) : (
          <p className="text-muted text-center mb-0 mt-1" style={{ fontSize: 12 }}>
            No users assigned
          </p>
        )}

       
        <div className="d-flex justify-content-between w-100 mt-3">
          <button
            className="btn btn-sm btn-outline-primary rounded-pill"
            onClick={(e) => {
              e.stopPropagation();
              handleEditApp(item);
            }}
          >
            <i className="bi bi-pencil-square me-1"></i>Edit
          </button>

          <button
            className="btn btn-sm btn-outline-danger rounded-pill"
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteApp(item.id);
            }}
          >
            <i className="bi bi-trash me-1"></i>Delete
          </button>
        </div>
      </div>
    </div>
  ))}
</div> */}

{/* <h3 className="text-center fw-bold">Datasolve Apps Suite</h3> */}
<div className="d-flex align-items-center justify-content-between mb-4">
  
  {/* Left spacer (keeps center truly centered) */}
  <div style={{ width: "250px" }}></div>

  {/* Center: Logo + Suite + Products */}
  <div className="d-flex align-items-start" id="apps">
    <img
      src="https://storage.googleapis.com/my-react-image-bucket-123/DS_Logos/Logo_Favicon/DataSolve_Favicon.png"
      alt="datasolve"
      height="60"
      width="90"
      className="rounded me-1"
    />
    <div>
      <h2
        className="text-dark fw-bold m-1 text-center"
        style={{ fontFamily: "Noto Serif, serif" }}
      >
        Suite
      </h2>
      <div
        className="small text-muted text-center"
        style={{ fontFamily: "Noto Serif, serif" }}
      >
        Products
      </div>
    </div>
  </div>

  {/* Right: Search Input */}
  <div style={{ width: "200px" ,marginRight:"40px" }}>
    <input
      type="text"
      className="form-control"
      placeholder="Search for an app..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  </div>

</div>

<div className="row gx-4 gy-3 p-4 mb-2 ">

  {filteredApps.map((item) => (
    <div key={item.id} className="col-6 col-sm-4 col-md-3 col-lg-3">
      <div
        className={`bg-white shadow-lg rounded-xl p-4 d-flex flex-column align-items-center justify-content-between position-relative transform-hover ${
          selectedApp === item.id ? "border-2 border-primary" : ""
        }`}
        style={{
          cursor: "pointer",
          minHeight: "300px",
          transition: "all 0.3s ease, transform 0.3s ease",
          borderRadius: "20px",
        }}
        onClick={() => setSelectedApp(item.id)}
      >
        {/* App Image */}
        <a href={item.app_url} target="_blank" rel="noopener noreferrer">
          <img
            src={item.app_isometric_link || "https://via.placeholder.com/80"}
            alt={item.app_name}
            className="mb-3"
            style={{
              width: "120px",
              height: "120px",
              objectFit: "contain",
              borderRadius: "12px",
              transition: "transform 0.3s ease",
            }}
          />
        </a>

        {/* App Name */}
        <p
          className="text-center fw-semibold text-dark mb-2"
          style={{
            fontSize: "16px",
            fontWeight: "600",
            lineHeight: "1.2",
          }}
        >
          {item.app_name}
        </p>

        {/* Assigned Users */}
        {item.assignedUsers && item.assignedUsers.length > 0 ? (
          <div
            className="d-flex align-items-center mt-2"
            style={{
              position: "relative",
              maxWidth: "100%",
              overflow: "hidden",
            }}
          >
            {item.assignedUsers.slice(0, 3).map((user, i) => (
              <button
                key={user.id}
                className="btn-unstyled"
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditAssignedUsers(item);
                }}
                title={user.username}
                style={{
                  padding: 0,
                  border: "none",
                  background: "transparent",
                  position: "relative",
                  zIndex: 3 - i,
                }}
              >
                <img
                  src={user.profilelink || "https://via.placeholder.com/40"}
                  alt={user.username}
                  title={user.username}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    objectFit: "contain",
                    border: "2px solid white",
                    marginLeft: i === 0 ? 0 : "-12px",
                    boxShadow: "0 0 4px rgba(0,0,0,0.2)",
                    cursor: "pointer",
                  }}
                />
              </button>
            ))}

            {/* +N more indicator if users > 3 */}
            {item.assignedUsers.length > 3 && (
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "#6c757d",
                  color: "white",
                  fontSize: "14px",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: "-12px",
                  boxShadow: "0 0 4px rgba(0,0,0,0.2)",
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditAssignedUsers(item); // open modal/popover
                }}
                title="View more users"
              >
                +{item.assignedUsers.length - 3}
              </div>
            )}
          </div>
        ) : (
          <button
            className="btn btn-sm btn-success rounded-pill mt-2"
            onClick={(e) => {
              e.stopPropagation();
              handleEditAssignedUsers(item);
            }}
            title="Assign Users"
          >
            <i className="bi bi-person-add"></i>
          </button>
        )}

        {/* Action Buttons */}
        <div className="d-flex justify-content-end w-100 mt-3 gap-1">
          <button
            className="btn btn-sm rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              handleEditApp(item);
            }}
            title="Edit App"
          >
            <i className="bi bi-pencil-square me-1"></i>
          </button>

          <button
            className="btn rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteApp(item.id);
            }}
            title="Delete App"
          >
            <i className="bi bi-trash"></i>
          </button>
        </div>
      </div>
    </div>
  ))}

</div>





  <div className="mt-5 pt-3">
     <footer className="text-center py-3 border-top bg-light">
       <small className="text-muted">
         © {new Date().getFullYear()} Datasolve Analytics · All Rights Reserved
       </small>
     </footer>
   </div>

  </div>
  
)}
  
{/* {activeTab === "activitylogs" && (
    <div className="container mt-3">

     

        {activityLogs.length === 0 ? (
            <p className="text-muted">No login activity found.</p>
        ) : (
            <div className="table-responsive">
                <table className="table table-striped table-bordered shadow-sm rounded">

                    <thead className="table-dark">
                        <tr>
                          
                          
                      <th>ID</th>
                        <th>Admin Name</th>
                        <th>Timestamp</th>
                        <th>Action Type</th>
                        <th>Target Entity</th>
                        <th>Target Name</th>
                        <th>Old Value</th>
                        <th>New Value</th>
                        <th>Action Details</th>
                        <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {activityLogs.map((log) => (
                            <tr key={log.id}>
                           
                                <td>{log.admin_name || "—"}</td>

                                {/* formatted timestamp *
                                <td>{new Date(log.timestamp).toLocaleString()}</td>

                                <td>{log.action_type}</td>
                                <td>{log.target_entity}</td>
                                <td>{log.target_name}</td>

                                {/* old_value object *
                                <td>{log.old_value ? JSON.stringify(log.old_value) : "—"}</td>

                                {/* new_value object *
                                <td>{log.new_value ? JSON.stringify(log.new_value) : "—"}</td>

                                <td>{log.action_details}</td>
                                <td>{log.status}</td>
                            <td>
{new Date(log.timestamp).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata"
})}

</td>

                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        )}

        <footer className="text-center py-3 mt-4 border-top">
            <small className="text-muted">
                © {new Date().getFullYear()} Datasolve Analytics · All Rights Reserved
            </small>
        </footer>

    </div>
)} */}

{/* last corrected code */}
{/* {activeTab === "activitylogs" && (
  <div className="container mt-3">
    {activityLogs.length === 0 ? (
      <p className="text-muted">No login activity found.</p>
    ) : (
      <div 
        className="table-responsive shadow-sm rounded"
        style={{ maxHeight: '650px', overflowY: 'auto', fontSize: 9 }} // Scrollable container with fixed height
      >
        <table className="table table-striped table-bordered" style={{ width: '100%', tableLayout: 'fixed' }}>
          <thead className="table-dark" style={{ position: 'sticky', top: 0, zIndex: 10, fontSize: '10px' }}>
            <tr>
              <th style={{ width: '11%', fontSize: 14 }}>Admin Name</th>
              <th style={{ width: '11%', fontSize: 14 }}>Timestamp</th>
              <th style={{ width: '11%', fontSize: 14 }}>Action Type</th>
              <th style={{ width: '11%', fontSize: 14 }}>Target Entity</th>
              <th style={{ width: '11%', fontSize: 14 }}>Target Name</th>
              <th style={{ width: '11%', fontSize: 14 }}>Old Value</th>
              <th style={{ width: '11%', fontSize: 14 }}>New Value</th>
              <th style={{ width: '11%', fontSize: 14 }}>Action Details</th>
              <th style={{ width: '11%', fontSize: 14 }}>Status</th>
            </tr>
          </thead>

          <tbody>
            {activityLogs.map((log) => (
              <tr key={log.id}>
                <td
                  style={{
                    wordWrap: 'break-word',
                    height: '35px', // Reduced height
                    fontSize: 10, // Reduced font size for compactness
                    maxWidth: '150px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    padding: '5px', // Reduced padding for compactness
                  }}
                >
                  {log.admin_name || "—"}
                </td>
                <td
                  style={{
                    wordWrap: 'break-word',
                    height: '35px', // Reduced height
                    fontSize: 10,
                    maxWidth: '150px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    padding: '5px',
                  }}
                >
                  {new Date(log.timestamp).toLocaleString()}
                </td>
                <td
                  style={{
                    wordWrap: 'break-word',
                    height: '35px', // Reduced height
                    fontSize: 10,
                    maxWidth: '150px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    padding: '5px',
                  }}
                >
                  {log.action_type}
                </td>
                <td
                  style={{
                    wordWrap: 'break-word',
                    height: '35px', // Reduced height
                    fontSize: 10,
                    maxWidth: '150px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    padding: '5px',
                  }}
                >
                  {log.target_entity}
                </td>
                <td
                  style={{
                    wordWrap: 'break-word',
                    height: '35px', // Reduced height
                    fontSize: 10,
                    maxWidth: '150px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    padding: '5px',
                  }}
                >
                  {log.target_name}
                </td>
                <td
                  style={{
                    wordWrap: 'break-word',
                    height: '35px', // Reduced height
                    fontSize: 10,
                    maxWidth: '150px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    padding: '5px',
                  }}
                  title={log.old_value ? JSON.stringify(log.old_value) : "—"}
                >
                  {log.old_value ? JSON.stringify(log.old_value) : "—"}
                </td>
                <td
                  style={{
                    wordWrap: 'break-word',
                    height: '35px', // Reduced height
                    fontSize: 10,
                    maxWidth: '150px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    padding: '5px',
                  }}
                  title={log.new_value ? JSON.stringify(log.new_value) : "—"}
                >
                  {log.new_value ? JSON.stringify(log.new_value) : "—"}
                </td>
                <td
                  style={{
                    wordWrap: 'break-word',
                    height: '35px', // Reduced height
                    fontSize: 10,
                    maxWidth: '150px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    padding: '5px',
                  }}
                  title={log.action_details}
                >
                  {log.action_details}
                </td>
                <td
                  style={{
                    wordWrap: 'break-word',
                    height: '35px', // Reduced height
                    fontSize: 10,
                    maxWidth: '150px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    padding: '5px',
                  }}
                  title={log.status}
                >
                  {log.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}

    <footer className="text-center py-3 mt-4 border-top">
      <small className="text-muted">
        © {new Date().getFullYear()} Datasolve Analytics · All Rights Reserved
      </small>
    </footer>
  </div>
)} */}

{activeTab === "activitylogs" && (
  <div className="mt-1">
    {/* Search Box */}
 <div className="d-flex justify-content-end mb-2">
  <input
    type="text"
    className="form-control form-control-sm"
    placeholder="Search..."
    value={searchText}
    onChange={(e) => setSearchText(e.target.value)}
    style={{ width: "200px" }} // adjust width as needed
  />
</div>

 

    {/* Table */}
    {activityLogs.length === 0 ? (
      <p className="text-muted">No login activity found.</p>
    ) : (
      <div
        className="table-responsive shadow-sm rounded"
        style={{ maxHeight: "750px", overflowY: "auto", fontSize: 9 }}
      >
        <table
          className="table table-striped table-bordered"
          style={{ width: "100%", tableLayout: "fixed" }}
        >
          <thead
            className="table-dark"
            style={{
              position: "sticky",
              top: 0,
              zIndex: 10,
              fontSize: "10px",
            }}
          >
            <tr>
              <th style={{ width: "11%", fontSize: 14 }}>Admin Name</th>
              <th style={{ width: "11%", fontSize: 14 }}>Timestamp</th>
              <th style={{ width: "11%", fontSize: 14 }}>Action Type</th>
              <th style={{ width: "11%", fontSize: 14 }}>Target Entity</th>
              <th style={{ width: "11%", fontSize: 14 }}>Target Name</th>
              <th style={{ width: "11%", fontSize: 14 }}>Old Value</th>
              <th style={{ width: "11%", fontSize: 14 }}>New Value</th>
              <th style={{ width: "11%", fontSize: 14 }}>Action Details</th>
              <th style={{ width: "11%", fontSize: 14 }}>Status</th>
            </tr>
          </thead>

          <tbody>
            {activityLogs
              .filter((log) =>
                searchText
                  ? log.admin_name
                      ?.toLowerCase()
                      .includes(searchText.toLowerCase()) ||
                    log.action_type
                      ?.toLowerCase()
                      .includes(searchText.toLowerCase()) ||
                    log.target_entity
                      ?.toLowerCase()
                      .includes(searchText.toLowerCase()) ||
                    log.target_name
                      ?.toLowerCase()
                      .includes(searchText.toLowerCase())
                  : true
              )
              .map((log) => (
                <tr key={log.id}>
                  <td style={cellStyle}>
                    {highlightText(log.admin_name || "—", searchText)}
                  </td>
                  <td style={cellStyle}>
                    {highlightText(
                      new Date(log.timestamp).toLocaleString(),
                      searchText
                    )}
                  </td>
                  <td style={cellStyle}>
                    {highlightText(log.action_type, searchText)}
                  </td>
                  <td style={cellStyle}>
                    {highlightText(log.target_entity, searchText)}
                  </td>
                  <td style={cellStyle}>
                    {highlightText(log.target_name, searchText)}
                  </td>
                  <td style={cellStyle} title={log.old_value ? JSON.stringify(log.old_value) : "—"}>
                    {highlightText(log.old_value ? JSON.stringify(log.old_value) : "—", searchText)}
                  </td>
                  <td style={cellStyle} title={log.new_value ? JSON.stringify(log.new_value) : "—"}>
                    {highlightText(log.new_value ? JSON.stringify(log.new_value) : "—", searchText)}
                  </td>
                  <td style={cellStyle} title={log.action_details}>
                    {highlightText(log.action_details, searchText)}
                  </td>
                  <td style={cellStyle} title={log.status}>
                    {highlightText(log.status, searchText)}
                  </td>
                </tr>
              ))}
          </tbody>
          
        </table>
            <footer className="text-center py-3 mt-4 border-top">
      <small className="text-muted">
        © {new Date().getFullYear()} Datasolve Analytics · All Rights Reserved
      </small>
    </footer>
      </div>
    )}


  </div>
)}













          </main>
 {/* {showEditModal && (
  <>
    <div className="modal-backdrop fade show"></div>

    <div className="modal d-block" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content p-4">

          <h5 className="mb-3">
            Update Assigned Users for <strong>{selectedApp?.app_name}</strong>
          </h5>

          <div style={{ maxHeight: "300px", overflowY: "auto" }}>
            {allUsers.length === 0 && selectedUsers.length === 0 && (
              <p className="text-muted">No users available.</p>
            )}

            {[
              // Merge assigned users with all users, avoid duplicates
              ...allUsers,
              ...selectedUsers
                .filter(email => !allUsers.some(u => u.email.toLowerCase() === email.toLowerCase()))
                .map(email => ({ id: email, username: email, email }))
            ]
              .sort((a, b) => a.username.localeCompare(b.username))
              .map(user => (
                <div key={user.id} className="form-check mb-2">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={`user-${user.id}`}
                    checked={selectedUsers
                      .map(e => e.toLowerCase())
                      .includes(user.email.toLowerCase())}
                    onChange={(e) => {
                      const email = user.email;
                      if (e.target.checked) {
                        setSelectedUsers([...selectedUsers, email]);
                      } else {
                        setSelectedUsers(
                          selectedUsers.filter(em => em.toLowerCase() !== email.toLowerCase())
                        );
                      }
                    }}
                  />
                  <label className="form-check-label" htmlFor={`user-${user.id}`}>
                    {user.username} 
                  </label>
                </div>
              ))}
          </div>

          <div className="mt-3 d-flex justify-content-end">
            <button className="btn btn-secondary me-2" onClick={() => setShowEditModal(false)}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={updateAssignedUsers}>
              Save
            </button>
          </div>

        </div>
      </div>
    </div>
    
  </>
)} */}

{showEditModal && (
  <>
    <div className="modal-backdrop fade show"></div>

    <div className="modal d-block">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content p-4">

          <h6 className="mb-3">
            Assign Users – <strong>{selectedApp?.app_name}</strong>
          </h6>

          <div style={{ maxHeight: "300px", overflowY: "auto" }}>

            {/* Select All Checkbox */}
            <div className="form-check mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="selectAllUsers"
                checked={selectedUsers.length === allUsers.length}
                onChange={(e) => {
                  if (e.target.checked) {
                    // Select all users
                    setSelectedUsers(allUsers.map(user => user.email.toLowerCase()));
                  } else {
                    // Deselect all
                    setSelectedUsers([]);
                  }
                }}
              />
              <label className="form-check-label" htmlFor="selectAllUsers">
                <small>Select All</small>
              </label>
            </div>

            {/* Individual Users */}
            {allUsers.map((user) => (
              <div key={user.email} className="form-check mb-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={user.email}
                  checked={selectedUsers.includes(user.email.toLowerCase())}
                  onChange={(e) => {
                    const email = user.email.toLowerCase();
                    setSelectedUsers((prev) => {
                      const exists = prev.some(e => e.toLowerCase() === email);

                      if (e.target.checked && !exists) {
                        return [...prev, email]; // ADD user
                      }

                      if (!e.target.checked && exists) {
                        return prev.filter(e => e.toLowerCase() !== email); // REMOVE user
                      }

                      return prev;
                    });
                  }}
                />
                <label className="form-check-label" htmlFor={user.email}>
                  <small>{user.username}</small>
                  <small className="text-muted"> ({user.email})</small>
                </label>
              </div>
            ))}

          </div>

          <div className="mt-3 d-flex justify-content-end">
            <button
              className="btn btn-secondary me-2"
              onClick={() => setShowEditModal(false)}
            >
              Cancel
            </button>

            <button
              className="btn btn-primary"
              onClick={updateAssignedUsers}
            >
              Save
            </button>
          </div>

        </div>
      </div>
    </div>
  </>
)}


   
        </div>



      </div>
    
      <ToastContainer />
     
    </div>
 

   
    </>
  );
};

export default Admindashboard;
