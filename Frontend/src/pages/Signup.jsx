// import React, {  useEffect, useState } from 'react'
// import axios from 'axios'
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'
// import {NavLink, useNavigate} from 'react-router-dom'





// const Signup = ({title}) => {


//   useEffect(()=>{
//     document.title=title;
//   },)

//   const navigate=useNavigate();

// const [formdata,setFormdata]=useState({
//   username:"",
//   email:"",
//   password:""
// })


// const apiURL=import.meta.env.VITE_API_URL;
// // console.log("Apiurl is:",apiURL)



//   const handlesignup=async(e)=>{
// e.preventDefault()

// if(!formdata.username.trim() || !formdata.email.trim() || !formdata.password.trim()){
// toast.error("All fields are Required !",{position:"top-right"})
// return;
// }

// const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
// if (!emailRegex.test(formdata.email)) {
//   toast.error("Please enter a valid email address.", { position: "top-right" });
//   return;
// }

// // Password Length Validation
// if (formdata.password.length < 6) {
//   toast.error("Password must be at least 6 characters long.", { position: "top-right" });
//   return;
// }
// try{
//   const response=await axios.post(`${apiURL}/api/auth/signup`,formdata)
//   console.log(response.data)
// toast.success("OTP sent! Enter it now to complete your signup.",{position:"top-right"})
// setTimeout(()=>{
//   navigate("/otpverification",{state:{email:formdata.email}})
// },3000)

// }
// catch(error){
//   console.log(error)
//   toast.error(error.response?.data.message||"Signup",{position:"top-right"})
// }
    
//   }


//   const handlechange=(e)=>{

//    setFormdata({...formdata ,[e.target.name]:e.target.value})
//   }


//   return (
//     <div>
//         <div className="container d-flex justify-content-center align-items-center vh-100">
//       <div className="card p-4 shadow-lg" style={{ width: "400px" }}>
//         <h3 className="text-center mb-3">Sign Up</h3>
       
//         <form  onSubmit={handlesignup} >
//           <div className="mb-3">
           
//             <input
//               type="text"
//               name="username"
//               className="form-control"
//               placeholder="Enter your username"
//               value={formdata.username}
//               onChange={handlechange}
//               autoComplete='off'
//             />
//           </div>
//           <div className="mb-3">
        
//             <input
//               type="email"
//               name="email"
//               className="form-control"
//               placeholder="Enter your email"
//               value={formdata.email}
//               onChange={handlechange}
//               autoComplete='off'
              
//             />
//           </div>
//           <div className="mb-3">
//             <input
//               type="password"
//               name="password"
//               className="form-control"
//               placeholder="Enter your password"
//             value={formdata.password}
//             onChange={handlechange}
//             autoComplete='off'
//             />
//           </div>
//           <button type="submit" className="btn btn-primary w-100"  >
//             Sign Up
//           </button>
//         </form>
//         <p className="text-center mt-3">
//           <NavLink to="/login" className='text-dark text-decoration-none'>Already a user?</NavLink>
//         </p>
//       </div>
//     </div>
//     <ToastContainer/>
//     </div>
//   )
// }

// export default Signup;



import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { NavLink, useNavigate } from 'react-router-dom'

const Signup = ({ title }) => {
  useEffect(() => {
    document.title = title
  }, [title])

  const navigate = useNavigate()

  const [formdata, setFormdata] = useState({
    username: '',
    email: '',
    password: '',
  })

  const apiURL = import.meta.env.VITE_API_URL

  const handlesignup = async (e) => {
    e.preventDefault()

    if (!formdata.username.trim() || !formdata.email.trim() || !formdata.password.trim()) {
      toast.error('All fields are required!', { position: 'top-right' })
      return
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    if (!emailRegex.test(formdata.email)) {
      toast.error('Please enter a valid email address.', { position: 'top-right' })
      return
    }

    if (formdata.password.length < 6) {
      toast.error('Password must be at least 6 characters long.', { position: 'top-right' })
      return
    }

    try {
      const response = await axios.post(`${apiURL}/api/auth/signup`, formdata)
      toast.success('OTP sent! Enter it now to complete your signup.', { position: 'top-right' })
      setTimeout(() => {
        navigate('/otpverification', { state: { email: formdata.email } })
      }, 3000)
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || 'Signup failed', {
        position: 'top-right',
      })
    }
  }

  const handlechange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value })
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-body-tertiary">
      <div className="card shadow-lg p-4 rounded-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center mb-4 fw-bold text-primary">Create Account</h2>

        <form onSubmit={handlesignup} className="needs-validation" noValidate>
          <div className="mb-3">
            <input
              type="text"
              name="username"
              className="form-control form-control-lg"
              placeholder="Username"
              value={formdata.username}
              onChange={handlechange}
              autoComplete="off"
            />
          </div>

          <div className="mb-3">
            <input
              type="email"
              name="email"
              className="form-control form-control-lg"
              placeholder="Email address"
              value={formdata.email}
              onChange={handlechange}
              autoComplete="off"
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              name="password"
              className="form-control form-control-lg"
              placeholder="Password"
              value={formdata.password}
              onChange={handlechange}
              autoComplete="off"
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 btn-lg">
            Sign Up
          </button>
        </form>

        <p className="text-center mt-3">
          <NavLink to="/login" className="text-decoration-none text-secondary">
            Already a user? <strong>Login</strong>
          </NavLink>
        </p>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Signup
