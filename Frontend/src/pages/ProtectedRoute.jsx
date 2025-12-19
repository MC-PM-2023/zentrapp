// import React from 'react'
// import { Navigate,Outlet } from 'react-router-dom'

// const ProtectedRoute = ({allowedroles}) => {

   
//     const token=localStorage.getItem("token")
//     const userrole=localStorage.getItem("role")

//     if(!token){
//         return <Navigate to="/" replace/>
//     }
//     if(!allowedroles.includes(userrole)){
//         return <Navigate to="/unauthorized" replace/>
//     }

//     return <Outlet/>
// }

// export default ProtectedRoute;

import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedroles }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role")?.trim();

  if (!token) return <Navigate to="/" replace />;

  if (allowedroles.includes(role)) return <Outlet />;

  return <Navigate to="/unauthorized" replace />;
};

export default ProtectedRoute;
