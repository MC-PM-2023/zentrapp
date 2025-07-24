//First Design
// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'
// import { NavLink, useNavigate } from 'react-router-dom';


// const apiurl = import.meta.env.VITE_API_URL;


// const Login = ({title}) => {

//   useEffect(()=>{
// document.title=title;
//   })

//   const navigate = useNavigate();

//   const [formdata, setFormdata] = useState({
//     email: "",
//     password: ""
//   })


//   const handlechange = (e) => {
//     setFormdata({ ...formdata, [e.target.name]: e.target.value })

//   }
//   const handlelogin = async (e) => {
//     e.preventDefault();

//     if (!formdata.email || !formdata.password) {
//       toast.error("All fields are Required", { position: "top-right" })
//       return;
//     }
//     try {
//       const response = await axios.post(`${apiurl}/api/auth/login`, formdata)
//       const { token, role,username ,email} = response.data
//       // console.log(response.data)

//       toast.success("Login Successful", { position: "top-right" })
//       localStorage.setItem("token", token)
//       localStorage.setItem("role", role)
//       localStorage.setItem("username",username)
//       localStorage.setItem("email",email)
//       switch (role) {
//         case "IP Team":
//           navigate("/iplandingpage")
//           break;
//         case "MC Team":
//           navigate("/mclandingpage")
//           break;
//         case "Admin":
//           navigate("/admindashboard")
//           break;
//         default:
//           navigate("/")
          
//       }
//     }
//     catch (error) {
//       console.log("Error in fetching login", error)
//       toast.error(error.response?.data?.message || "Login error", { position: "top-right" })
//     }


//   }

//   return (
//     <div>
//       <div className="container d-flex justify-content-center align-items-center vh-100">
//         <div className="card p-4 shadow-lg" style={{ width: "400px" }}>
//           <h3 className="text-center mb-3">Login</h3>

//           <form onSubmit={handlelogin} >

//             <div className="mb-3">

//               <input
//                 type="email"
//                 name="email"
//                 autoComplete='off'
//                 className="form-control"
//                 placeholder="Enter your email"
//                 value={formdata.email}
//                 onChange={handlechange}

//               />
//             </div>
//             <div className="mb-3">
//               <input
//                 type="password"
//                 name="password"
//                 className="form-control"
//                 placeholder="Enter your password"
//                 value={formdata.password}
//                 onChange={handlechange}
//               />
//             </div>
//             <button type="submit" className="btn btn-primary w-100"  >
//               Sign In
//             </button>
//           </form>
//           <p className="text-center mt-3">
//             <NavLink to="/forgotpassword" className='text-dark text-decoration-none'>Forgot Password?</NavLink>
//           </p>
//         </div>
//       </div>
//       <ToastContainer />
//     </div>
//   )
// }

// export default Login


import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { NavLink, useNavigate } from 'react-router-dom'

const apiurl = import.meta.env.VITE_API_URL

const Login = ({ title }) => {
  useEffect(() => {
    document.title = title
  }, [title])

  const navigate = useNavigate()

  const [formdata, setFormdata] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value })
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    if (!formdata.email || !formdata.password) {
      toast.error('All fields are required', { position: 'top-right' })
      return
    }

    try {
      const response = await axios.post(`${apiurl}/api/auth/login`, formdata)
      const { token, role, username, email } = response.data

      toast.success('Login successful', { position: 'top-right' })
      localStorage.setItem('token', token)
      localStorage.setItem('role', role)
      localStorage.setItem('username', username)
      localStorage.setItem('email', email)

      switch (role) {
        case 'IP Team':
          navigate('/iplandingpage')
          break
        case 'MC Team':
          navigate('/mclandingpage')
          break
        case 'Admin':
          navigate('/admindashboard')
          break
        default:
          navigate('/')
      }
    } catch (error) {
      console.error('Login error:', error)
      toast.error(error.response?.data?.message || 'Login error', {
        position: 'top-right',
      })
    }
  }

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-body-tertiary">
      <div className="card shadow-lg border-0 rounded-4 p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="card-body">
        <h2 className="text-center mb-4 fw-bold text-primary">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
             
              <input
                type="email"
                name="email"
                autoComplete="off"
                className="form-control form-control-lg"
                placeholder="Enter your email"
                value={formdata.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                name="password"
                className="form-control form-control-lg"
                placeholder="Enter your password"
                value={formdata.password}
                onChange={handleChange}
              />
            </div>
            <div className="d-grid mb-3">
              <button type="submit" className="btn btn-primary btn-lg">
                Sign In
              </button>
            </div>
            <div className="text-center">
              {/* <NavLink to="/forgotpassword" className="text-decoration-none text-muted">
                Forgot Password?
              </NavLink> */}
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Login
