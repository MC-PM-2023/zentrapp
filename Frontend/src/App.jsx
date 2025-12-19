

import './App.css';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { Routes, Route } from 'react-router-dom';
import Admindashboard from './pages/Admindashboard';
import LandingPage from './pages/Landingpage';
import ProtectedRoute from './pages/ProtectedRoute';
import Unauthorized from './pages/Unauthorized';
import Forgotpassword from './pages/Forgotpassword';
import Otpverify from './pages/Otpverify';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/signup" element={<Signup title="Sign up" />} />
      <Route path="/otpverification" element={<Otpverify title="OTP Verification" />} />
      <Route path="/" element={<Login title="Sign in" />} />
      <Route path="/unauthorized" element={<Unauthorized title="Unauthorized Page Access" />} />
      <Route path="/forgot-password" element={<Forgotpassword title="Forgot Password" />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute allowedroles={['Admin']} />}>
        <Route path="/admindashboard" element={<Admindashboard title="Admin Dashboard" />} />
      </Route>

      <Route element={<ProtectedRoute allowedroles={['User']} />}>
        <Route path="/home" element={<LandingPage title="Zentra" />} />
      </Route>
    </Routes>
  );
}

export default App;
