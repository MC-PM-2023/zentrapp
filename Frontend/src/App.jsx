
import './App.css'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { Routes, Route } from 'react-router-dom'
import Otpverify from './pages/Otpverify'
import Admindashboard from './pages/Admindashboard'
import Unauthorized from './pages/Unauthorized'
import IPlandingpage from './pages/IPlandingpage'
import MClandingpage from './pages/MClandingpage'
import ProtectedRoute from './pages/ProtectedRoute'
import Forgotpassword from './pages/Forgotpassword'
import './App.css'

function App() {


  return (
    <>
      {/* public routes*/}
      <Routes>
        <Route path="/" element={<Signup title="Registration Information" />} />
        <Route path="/otpverification" element={<Otpverify title="OTP Verification" />} />
        <Route path="/login" element={<Login title="Login User Credentials" />} />
        {/* <Route path="/forgotpassword" element={<Forgotpassword title="Account Recovery"/>}/> */}
        <Route path="/unauthorized" element={<Unauthorized title="Unauthorized Page Access" />} />
        {/* protected routes*/}
        <Route element={<ProtectedRoute allowedroles={['Admin']} />}>
          <Route path="/admindashboard" element={<Admindashboard title="Admin Dashboard" />} />
        </Route>
        <Route element={<ProtectedRoute allowedroles={["IP Team"]} />}>
          <Route path="/iplandingpage" element={<IPlandingpage title="IP LandingPage"/>} />
        </Route>
        <Route element={<ProtectedRoute allowedroles={["MC Team"]} />}>
          <Route path="/mclandingpage" element={<MClandingpage title="MC LandingPage" />} />
        </Route>
      </Routes>
    </>
  )
}

export default App;
