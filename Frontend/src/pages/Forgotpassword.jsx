import React, { useEffect } from 'react'

const Forgotpassword = ({title}) => {

    useEffect(()=>{
document.title=title
    })
  return (
    // <div>Forgotpassword</div>
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
    <div className="card shadow-lg p-4" style={{ maxWidth: "400px", width: "100%" }}>
      <h3 className="text-center mb-3">Forgot Password</h3>
      <p className="text-center text-muted">Enter your email to reset your password.</p>
      <form>
        <div className="mb-3">
          <label htmlFor="email" className="form-label fw-bold">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter your email"
          
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Send Reset Link
        </button>
      </form>
      <div className="text-center mt-3">
        <a href="/login" className="text-decoration-none">
          Back to Login
        </a>
      </div>
    </div>
  </div>
  )
}

export default Forgotpassword;