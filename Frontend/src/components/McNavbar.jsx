import React from 'react'
import {datasolve} from '../assets/datasolve.png'
const MCNavbar = () => {
  return (
    <div>
          {/* Navbar */}
              <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
                <div className="container">
            
              <img
                src={datasolve}
                alt="Datasolve Analytics"
            
                height="60"
                className="d-inline-block align-text-top me-2"
              />
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                      <li className="nav-item">
                        <a className="nav-link" href="#">Home</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#">Features</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#">Pricing</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#">Contact</a>
                      </li>
                    </ul>
                    <div className="ms-3">
                      <a href="#" className="btn btn-primary">Login User</a>
                    </div>
                  </div>
                </div>
              </nav>
    </div>
  )
}

export default MCNavbar;