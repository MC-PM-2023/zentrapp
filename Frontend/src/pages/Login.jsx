

import axios from 'axios';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, NavLink } from 'react-router-dom';
import login from '../assets/Login2.png'
const apiurl = import.meta.env.VITE_API_URL;

const Login = ({ title }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  const navigate = useNavigate();
  const [formdata, setFormdata] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!formdata.email || !formdata.password) {
      toast.error('All fields are required', { position: 'top-right' });
      return;
    }
    try {
      const { data } = await axios.post(`${apiurl}/api/auth/login`, formdata);
      // console.log(data)
      const { token, role, username, email ,profilelink} = data;
      

      toast.success('Login successful', { position: 'top-right' });
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('username', username);
      localStorage.setItem('email', email);
      localStorage.setItem('profilelink',profilelink)

      switch (role) {
        case 'IP Team':
          navigate('/iplandingpage');
          break;
        case 'MC Team':
          navigate('/mclandingpage');
          break;
        case 'Admin':
          navigate('/admindashboard');
          break;
        default:
          navigate('/');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.response?.data?.message || 'Login error', {
        position: 'top-right',
      });
    }
  };

  return (
    <div className="login-container">
      <div className="login-left d-flex flex-column justify-content-center p-5 align-items-center">
        <h1 className="fw-bold mb-4 text-white">Login to your account</h1>
        <p className="text-light mb-4">
          Enter your email below to login to your account
        </p>
        <form onSubmit={handleLogin} style={{ maxWidth: '400px', width: '100%' }}>
          <div className="mb-3">
            <input
              type="email"
              name="email"
              autoComplete="off"
              className="form-control form-control-lg"
              placeholder="name@datasolve-analytics.com"
              value={formdata.email}
              onChange={handleChange}
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
            />
            {/* <div className="mt-1">
              <NavLink to="/forgotpassword" className="text-decoration-none small text-light">
                Forgot your password?
              </NavLink>
            </div> */}
          </div>
          
          <div className='d-flex align-items-center justify-content-center'>
          <button type="submit" className="btn btn-light btn-xs  mb-2">
            Login
          </button>
          </div>
          {/* <div className="text-center text-light mb-3">Or continue with</div>
          <button type="button" className="btn btn-outline-light w-100">
            <i className="bi bi-github me-2"></i> Login with GitHub
          </button> */}
          <div className="text-center text-light mb-2">Or</div>
          <p className="mt-2 text-light small text-center">
            Don’t have an account?{' '}
            <NavLink to="/" className="text-decoration-none text-white">
              Sign up
            </NavLink>
          </p>
        </form>
      </div>
      <div className="login-right">
        <div>
       <img src={login}  className='image-placeholder'/>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
