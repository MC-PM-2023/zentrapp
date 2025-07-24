import React from 'react'
import { Navigate,Outlet } from 'react-router-dom'

const ProtectedRoute = ({allowedroles}) => {

   
    const token=localStorage.getItem("token")
    const userrole=localStorage.getItem("role")

    if(!token){
        return <Navigate to="/" replace/>
    }
    if(!allowedroles.includes(userrole)){
        return <Navigate to="/unauthorized" replace/>
    }

    return <Outlet/>
}

export default ProtectedRoute;