// import  { useEffect, useState } from 'react'
// import axios from 'axios'
// import { ToastContainer, toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'
// import { NavLink, useNavigate } from 'react-router-dom'

// const Signup = ({ title }) => {
//   useEffect(() => {
//     document.title = title
//   }, [title])

//   const navigate = useNavigate()

//   const [formdata, setFormdata] = useState({
//     username: '',
//     email: '',
//     password: '',
//   })

//   const apiURL = import.meta.env.VITE_API_URL

//   const handlesignup = async (e) => {
//     e.preventDefault()

//     if (!formdata.username.trim() || !formdata.email.trim() || !formdata.password.trim()) {
//       toast.error('All fields are required!', { position: 'top-right' })
//       return
//     }

//     const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
//     if (!emailRegex.test(formdata.email)) {
//       toast.error('Please enter a valid email address.', { position: 'top-right' })
//       return
//     }

//     if (formdata.password.length < 6) {
//       toast.error('Password must be at least 6 characters long.', { position: 'top-right' })
//       return
//     }

//     try {
//       const response = await axios.post(`${apiURL}/api/auth/signup`, formdata)
//       toast.success('OTP sent! Enter it now to complete your signup.', { position: 'top-right' })
//       setTimeout(() => {
//         navigate('/otpverification', { state: { email: formdata.email } })
//       }, 3000)
//     } catch (error) {
//       console.log(error)
//       toast.error(error.response?.data?.message || 'Signup failed', {
//         position: 'top-right',
//       })
//     }
//   }

//   const handlechange = (e) => {
//     setFormdata({ ...formdata, [e.target.name]: e.target.value })
//   }

//   return (
//     <div className="d-flex justify-content-center align-items-center vh-100 bg-body-tertiary">
//       <div className="card shadow-lg p-4 rounded-4" style={{ width: '100%', maxWidth: '400px' }}>
//         <h2 className="text-center mb-4 fw-bold text-primary">Create Account</h2>

//         <form onSubmit={handlesignup} className="needs-validation" noValidate>
//           <div className="mb-3">
//             <input
//               type="text"
//               name="username"
//               className="form-control form-control-lg"
//               placeholder="Username"
//               value={formdata.username}
//               onChange={handlechange}
//               autoComplete="off"
//             />
//           </div>

//           <div className="mb-3">
//             <input
//               type="email"
//               name="email"
//               className="form-control form-control-lg"
//               placeholder="Email address"
//               value={formdata.email}
//               onChange={handlechange}
//               autoComplete="off"
//             />
//           </div>

//           <div className="mb-3">
//             <input
//               type="password"
//               name="password"
//               className="form-control form-control-lg"
//               placeholder="Password"
//               value={formdata.password}
//               onChange={handlechange}
//               autoComplete="off"
//             />
//           </div>

//           <button type="submit" className="btn btn-primary w-100 btn-lg">
//             Sign Up
//           </button>
//         </form>

//         <p className="text-center mt-3">
//           <NavLink to="/login" className="text-decoration-none text-secondary">
//             Already a user? <strong>Login</strong>
//           </NavLink>
//         </p>
//       </div>
//       <ToastContainer />
//     </div>
//   )
// }

// export default Signup


import { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink, useNavigate } from 'react-router-dom';
import '../css/signup.css'
import login from '../assets/Login2.png'
const Signup = ({ title }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  const navigate = useNavigate();

  const [formdata, setFormdata] = useState({
    username: '',
    email: '',
    password: '',
  });

  const apiURL = import.meta.env.VITE_API_URL;

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!formdata.username.trim() || !formdata.email.trim() || !formdata.password.trim()) {
      toast.error('All fields are required!', { position: 'top-right' });
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(formdata.email)) {
      toast.error('Please enter a valid email address.', { position: 'top-right' });
      return;
    }

    if (formdata.password.length < 6) {
      toast.error('Password must be at least 6 characters long.', { position: 'top-right' });
      return;
    }

    try {
      await axios.post(`${apiURL}/api/auth/signup`, formdata);
      toast.success('OTP sent! Enter it now to complete your signup.', { position: 'top-right' });
      setTimeout(() => {
        navigate('/otpverification', { state: { email: formdata.email } });
      }, 3000);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'Signup failed', {
        position: 'top-right',
      });
    }
  };

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  return (
    <div className="login-container">
     <div className="login-left d-flex flex-column justify-content-center align-items-center p-5">
        
        {/* Left black panel */}
      
          <h1 className="fw-bold mb-4 text-white">Create your account</h1>
          <p className="text-light mb-4">Enter your details below to sign up for an account</p>

          <form onSubmit={handleSignup} style={{ maxWidth: '400px', width: '100%' }}>
            <div className="mb-3">
              <input
                type="text"
                name="username"
                className="form-control form-control-lg"
                placeholder="Username"
                value={formdata.username}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>

            <div className="mb-3">
              <input
                type="email"
                name="email"
                className="form-control form-control-lg"
                placeholder="name@datasolve-analytics.com"
                value={formdata.email}
                onChange={handleChange}
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
                onChange={handleChange}
                autoComplete="off"
              />
            </div>
<div className='d-flex align-items-start justify-content-center'>
            <button type="submit" className="btn btn-light w-20 btn-xs text-black">
              Sign Up
            </button>
            </div>
          </form>

          <p className="mt-3 text-light ">
            Already have an account?{' '}
            <NavLink to="/login" className="text-decoration-none text-light fw-bold">
              Login
            </NavLink>
          </p>


 

        </div>

        {/* Right image/illustration panel */}
         <div className="login-right">
        <div >
                   <img src={login}  className='image-placeholder'/>
        </div>
      </div>
      
      <ToastContainer />
    </div>
  );
};

export default Signup;

