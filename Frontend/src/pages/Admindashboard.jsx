import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Adminheader from '../components/Adminheader';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


const apiurl = import.meta.env.VITE_API_URL;
// console.log(apiurl)



const Admindashboard = ({ title }) => {

  useEffect(() => {
    document.title = title;
  }, [title])

  const [getpendingusers, setPendingGetUsers] = useState([]);
  const [showApprovemodal, setShowApproveModal] = useState(false);
  const [selecteduser, setSelectedUser] = useState(null);
  const [roles, setRoles] = useState([])
  const [selectedrole, SetSelectedRole] = useState("")
  const [getapprovedusers, setGetApprovedUsers] = useState([])
  const [activetab, setActiveTab] = useState("")
  const [showRejectmodal, setShowRejectModal] = useState(false)
  const [getrejectedusers, setGetRejectedUsers] = useState([]);
  const [showipprojectmodal, setShowIpProjectModal] = useState(false)
  const [showmcprojectmodal, setShowMcProjectModal] = useState(false)
  const [appipcard, setAppIPprojectCard] = useState({
    appname: "",
    appdescription: "",
    applink: "",
    assignedteam: ""
  });

  // Open Approve Modal

  const handleapprove = (user) => {
    setSelectedUser(user)
    setShowApproveModal(true)
    SetSelectedRole("")
  }

  const handlereject = (user) => {
    // console.log("selected user:",user)
    setSelectedUser(user)
    setShowRejectModal(true)
  }

  const handleshowaddipcard = () => {
    setShowIpProjectModal(true)
  }

  const handleshowaddmccard = () => {
    setShowMcProjectModal(true)
  }
  // Get Pending Users

  const handlegetpendingusers = async () => {
    try {
      const response = await axios.get(`${apiurl}/api/admin/getpendingusers`)
      // console.log(response.data)
      setPendingGetUsers(response.data)
      toast.success("Fetched Pending Users Successfully !", { position: "top-right" })
    }
    catch (error) {
      console.log("Axios Error in Getpendingusers: ", error)
    }
  }

  // Fetch Available Roles

  useEffect(() => {
    const fetchroles = async () => {
      try {
        const response = await axios.get(`${apiurl}/api/admin/getroles`)
        // console.log("Getroles response is:",response.data)
        setRoles(response.data)
      }
      catch (error) {
        console.log("Error in fetching roles:", error)
      }
    }
    fetchroles()
  }, [])

  // Approve the Signedup User 

  const approveuser = async (e) => {
    e.preventDefault()
    if (!selectedrole) {
      toast.error("Please Select a Role Before Approving")
      return;
    }
    try {
      const response = await axios.post(`${apiurl}/api/admin/approvedusers`, {
        id: selecteduser.id,
        role: selectedrole
      }
      )
      console.log("Approve user response is:", response.data)
      toast.success("User Approved successfully", { position: "top-right" })
      setPendingGetUsers((prevusers) => prevusers.filter((user) => user.id != selecteduser.id))
      setShowApproveModal(false)
    }
    catch (error) {
      console.log("Error in Approve Users:", error)
      toast.error("Error in Approve Users", { position: "top-right" })
    }
  }

  // Get the Approved Signup User 
  const handlegetapproveusers = async () => {
    try {
      const response = await axios.get(`${apiurl}/api/admin/getapprovedusers`)
      // console.log(response.data)
      toast.success("Fetched Approved Users Successfully !")
      setGetApprovedUsers(response.data)
    }
    catch (error) {
      console.log("Error in fetching getapproveusers:", error)
    }
  }


  //post the rejected signup user in admin side

  const handlerejectsignupuser = async (e) => {
    e.preventDefault();
    if (!selecteduser?.id) {
      toast.error("Please select a user", { position: "top-right" })
      return;
    }

    try {
      const response = await axios.post(`${apiurl}/api/admin/rejectedusers`, {
        id: selecteduser.id
      })
      console.log(response.data)
      toast.success("User deleted successfully !", { position: "top-right" })
      setShowRejectModal(false)
      setPendingGetUsers((prevusers) => prevusers.filter(user => user.id != selecteduser.id))
    }
    catch (error) {
      console.log('Error in Post rejecteduser:', error)
    }
  }


  //get the rejected users


  const handlegetrejectedusers = async () => {
    try {
      const response = await axios.get(`${apiurl}/api/admin/getrejectedusers`)
      // console.log(response.data)
      setGetRejectedUsers(response.data)
      toast.success("Fetched Rejected Users Successfully ! ", { position: "top-right" })
    }
    catch (error) {
      console.log("Error in fetching rejected users:", error)
    }
  }

  const handleupdateapprovedusers = async (user) => {
    console.log(user)
    if (!user.id) {
      toast.error("User id doesn't found")
      return;
    }
    try {
      const response = await axios.put(`${apiurl}/api/admin/updateapproveusers`, {
        id: user.id,
      })
      console.log(response.data)
      toast.success("User Updated Successfully !", { position: "top-right" })
      setGetApprovedUsers((prevusers) => prevusers.filter(u => u.id != user.id))
    }
    catch (error) {
      console.log("Error in updating Approve users:", error)
      toast.error("Error in Updating Approve users")
    }
  }

  const addIPappcard = async (e) => {
    e.preventDefault();
    if (!appipcard.appname || !appipcard.appdescription || !appipcard.applink || !appipcard.assignedteam) {
      toast.error("All fields are required !")
      return;
    }


    try {
      const response = await axios.post(`${apiurl}/api/admin/apps/addapp`, {
        appname: appipcard.appname,
        appdescription: appipcard.appdescription,
        applink: appipcard.applink,
        assignedteam: appipcard.assignedteam
      })
      console.log(response.data)
      setAppIPprojectCard({ appname: "", appdescription: "", applink: "", assignedteam: "" })
      toast.success("App added Successfully !", { position: 'top-right' })
    }
    catch (error) {
      console.log("Error in App Adding IP Card:", error)
      toast.error("Error in App Adding IP Card:", error.message)
    }
  }

  return (
    <div>
      <Adminheader />
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
          <nav
            className="col-md-3 col-lg-2 text-white bg-dark sidebar vh-100 position-fixed d-flex flex-column p-3"
            style={{ top: "66px", left: "0", zIndex: "1000" }} // Ensures it's fixed below header
          >
            <ul className="nav flex-column">
              <li className="nav-item">
                <h6 className='text-center'>Admin Dashboard</h6>
                {/* <NavLink to="" className="nav-link active text-white" onClick={handlegetpendingusers}>
                  <i className="bi bi-person-check me-2" ></i>Pending Users
                </NavLink> */}
                <NavLink to="" className={`nav-link active text-white ${activetab === "pending" ? "active" : ""}`} onClick={(e) => {
                  e.preventDefault();
                  setActiveTab("pending")
                  handlegetpendingusers();
                }}>
                  <i className="bi bi-person-check me-2"></i>Pending Users
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="" className={`nav-link active text-white ${activetab === "approved" ? "active" : ""}`} onClick={(e) => {
                  e.preventDefault();
                  setActiveTab("approved")
                  handlegetapproveusers()
                }}>
                  <i className="bi bi-check-circle me-2"></i>Approved Users
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="" className={`nav-link text-white ${activetab === "rejected" ? "active" : ""}`} onClick={(e) => {
                  e.preventDefault();
                  setActiveTab("rejected")
                  handlegetrejectedusers()
                }} >
                  <i className="bi bi-x-circle me-2"></i>Rejected Users
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="" className="nav-link text-white" onClick={handleshowaddipcard}>
                  <i class="bi bi-window-plus me-2"></i>Add IP App
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="" className="nav-link text-white" onClick={handleshowaddmccard}>
                  <i class="bi bi-window-plus me-2"></i> Add MC App
                </NavLink>
              </li>
              {/* <li className="nav-item">
                <NavLink to="" className="nav-link text-white">
                  <i className="bi bi-box-arrow-right me-2"></i>Logout
                </NavLink>
              </li> */}
            </ul>
          </nav>

          {/* Main Content */}

          <main className="col-md-9 ms-auto col-lg-10 px-md-4" >
            {activetab &&
              <div className="d-flex justify-content-between align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h2>{activetab === "pending" ? "Pending User Approvals" : activetab === "approved" ? "Approved Users" : "Rejected Users"}</h2>
              </div>
            }
            {/* Users Table */}
            {activetab === "pending" && (
              <table className="table table-bordered text-center">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Approval</th>
                  </tr>
                </thead>
                {/* <tbody>
   <tr>
     <td>user@example.com</td>
     <td>
       <button className="btn btn-success btn-sm me-2">Approve</button>
       <button className="btn btn-danger btn-sm">Reject</button>
     </td>
   </tr>
   <tr>
     <td>john.doe@example.com</td>
     <td>
       <button className="btn btn-success btn-sm me-2">Approve</button>
       <button className="btn btn-danger btn-sm">Reject</button>
     </td>
   </tr>
 </tbody> */}
                <tbody>
                  {getpendingusers?.length > 0 && getpendingusers.map((pendinguser, index) => (
                    <tr key={index}>
                      <td>{pendinguser.username}</td>
                      <td>{pendinguser.email}</td>
                      <td>{pendinguser.status}</td>
                      <td>
                        <button className="btn btn-success btn-sm me-2" onClick={() => handleapprove(pendinguser)}>Approve</button>
                        <button className="btn btn-danger btn-sm" onClick={() => handlereject(pendinguser)}>Reject</button>
                      </td>
                    </tr>
                  ))}

                </tbody>
              </table>
            )}

            {activetab === "approved" &&
              <table className="table table-bordered text-center">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Update</th>
                  </tr>
                </thead>
                <tbody>
                  {getapprovedusers && getapprovedusers.length > 0 && getapprovedusers.map((approveduser, index) => (
                    <tr key={index}>
                      <td>{approveduser.username}</td>
                      <td>{approveduser.email}</td>
                      <td>{approveduser.role}</td>
                      <td>
                        <button className='btn btn-danger' onClick={() => handleupdateapprovedusers(approveduser)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

            }

            {activetab === "rejected" &&
              <table className='table table-bordered text-center'>
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {getrejectedusers && getrejectedusers.length > 0 && getrejectedusers.map((rejecteduser, index) => (
                    <tr key={index}>
                      <td>{rejecteduser.username}</td>
                      <td>{rejecteduser.email}</td>
                      <td>{rejecteduser.status}</td>
                    </tr>
                  ))
                  }
                </tbody>
              </table>
            }

            {showApprovemodal && (
              <>
                <div className="modal fade show d-block" tabIndex="-1" role="dialog">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="approveModalLabel">Approve User</h5>
                        <button
                          type="button"
                          className="btn-close"
                          onClick={() => setShowApproveModal(false)}
                        ></button>
                      </div>
                      <div className="modal-body">
                        <p>Are you sure you want to approve this user <strong>{selecteduser?.username}</strong> ?</p>
                        <form>
                          <div className="mb-2">
                            <label htmlFor="recipient-name" className="col-form-label">Username</label>
                            <input type="text" className="form-control" id="username" value={selecteduser?.username || ""} disabled />
                          </div>
                          <div className="mb-2">
                            <label htmlFor="recipient-name" className="col-form-label">Email</label>
                            <input type="text" className="form-control" id="email" value={selecteduser?.email || ""} disabled />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="role-select" className="col-form-label">Role</label>
                            <select className="form-select" id="role-select" value={selectedrole} onChange={(e) => SetSelectedRole(e.target.value)}>
                              <option value="" disabled>Select a role</option>
                              {roles.map((role, index) => (
                                <option key={index} value={role}>{role}</option>
                              ))}
                            </select>
                          </div>
                        </form>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={() => setShowApproveModal(false)}>Cancel</button>
                        <button type="button" className="btn btn-success" onClick={approveuser}>Confirm Approval</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-backdrop fade show"></div>
              </>
            )}


            {showRejectmodal &&
              <>
                <div className='modal show d-block' tabIndex="-1" role='dialog'>
                  <div className='modal-dialog'>
                    <div className='modal-content'>
                      <div className='modal-header'>
                        <h5 className='modal-title' id="rejectModalLabel">Reject User</h5>
                        <button type="button" className='btn-close' onClick={() => setShowRejectModal(false)}></button>
                      </div>
                      <div className='modal-body'>
                        <p>Are you sure you want to reject this user <strong>{selecteduser?.username}</strong> ?</p>
                        <form onSubmit={handlerejectsignupuser}>
                          <div className='mb-2'>
                            <label htmlFor='username' className='col-form-label'>Username</label>
                            <input type="text" className="form-control" value={selecteduser?.username || ""} disabled />
                          </div>
                          <div className='mb-2'>
                            <label htmlFor='email' className='col-form-label'>Email</label>
                            <input type="text" className="form-control" value={selecteduser?.email || ""} disabled />
                          </div>
                        </form>
                        <div className="modal-footer">
                          <button className='btn btn-secondary' onClick={() => setShowRejectModal(false)}>Cancel</button>
                          <button className='btn btn-danger' onClick={handlerejectsignupuser}>Confirm Approval</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-backdrop fade show"></div>
              </>
            }


            {showipprojectmodal &&
              <>
                <div className="modal fade show d-block" tabIndex="-1" role='dialog'>
                  <div className='modal-dialog'>
                    <div className='modal-content'>
                      <div className='modal-header'>
                        <h5 className='modal-title' id="rejectModalLabel">Add IP App</h5>
                        <button type="button" className='btn-close' onClick={() => setShowIpProjectModal(false)} />
                      </div>
                      <div className='modal-body'>
                        <form >
                          <label htmlFor='username' className='col-form-label'>App Name</label>
                          <input
                            type="text"
                            className="form-control"
                            value={appipcard.appname}
                            placeholder='Enter App Name'
                            onChange={(e) => setAppIPprojectCard({ ...appipcard, appname: e.target.value })}
                          />
                          <label htmlFor='username' className='col-form-label'>App Description</label>
                          <textarea
                            className="form-control"
                            value={appipcard.appdescription}
                            placeholder='Enter App Description'
                            onChange={(e) => setAppIPprojectCard({ ...appipcard, appdescription: e.target.value })}
                          />
                          <label htmlFor='username' className='col-form-label'>App Link</label>
                          <input
                            type="url"
                            className="form-control"
                            placeholder='Enter App Link'
                            value={appipcard.applink}
                            onChange={(e) => setAppIPprojectCard({ ...appipcard, applink: e.target.value })}
                          />
                          <label className="col-form-label">Assigned Team <small className='text-small'>(IP Team)</small></label>
                          <input
                            type="text"
                            className="form-control"
                            value={appipcard.assignedteam}
                            placeholder="Type Bracket name below to confirm"
                            onChange={(e) => setAppIPprojectCard({ ...appipcard, assignedteam: e.target.value })}
                          />
                          <div className="modal-footer mt-3">
                            <button type="button" className="btn btn-secondary" onClick={() => setShowIpProjectModal(false)}>Cancel</button>
                            <button type="button" className="btn btn-success" onClick={addIPappcard}>Submit</button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>

                </div>
                <div className='modal-backdrop fade show' />
              </>
            }

            {showmcprojectmodal &&
              <>
                <div className='modal fade show d-block ' tabIndex="-1" role='dialog'>
                  <div className='modal-dialog'>
                    <div className='modal-content'>
                      <div className='modal-header'>

                        <h5 className='modal-title' id="rejectModalLabel">Add MC App</h5>
                        <button type='button' className='btn-close' onClick={() => setShowMcProjectModal(false)} />
                      </div>
                      <div className='modal-body'>
                        <form>

                          <div className="mb-3">
                            <label className="form-label">App Name</label>
                            <input type="text" className="form-control" value={appipcard.appname}
                              onChange={(e) => setAppIPprojectCard({ ...appipcard, appname: e.target.value })}
                              placeholder='Enter App Name'
                            />
                          </div>
                          <div className="mb-3">
                            <label className="form-label">App Description</label>
                            <textarea className="form-control" value={appipcard.appdescription}
                              onChange={(e) => setAppIPprojectCard({ ...appipcard, appdescription: e.target.value })} placeholder='Enter App Description'></textarea>
                          </div>
                          <div className="mb-3">
                            <label className="form-label">App Link</label>
                            <input type="url" className="form-control" value={appipcard.applink}
                              onChange={(e) => setAppIPprojectCard({ ...appipcard, applink: e.target.value })} placeholder='Enter App Link' />
                          </div>
                          <div className="mb-3">
                            <label className="col-form-label">Assigned Team <small className='text-small'>(MC Team)</small></label>
                            <input type="text" className="form-control" value={appipcard.assignedteam}
                              onChange={(e) => setAppIPprojectCard({ ...appipcard, assignedteam: e.target.value })} placeholder='Type Bracket name below to confirm' />
                          </div>
                          <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => setShowMcProjectModal(false)}>Cancel</button>
                            <button type="button" className="btn btn-success" onClick={addIPappcard}>Submit</button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='modal-backdrop fade show'></div>
              </>

            }
            

          </main>

        </div>
      </div>
       
       
      <ToastContainer />
    </div>
  );
}

export default Admindashboard;