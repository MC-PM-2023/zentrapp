import { NavLink } from 'react-router-dom';
import datasolvelogo from '../assets/datasolve-icon.png'
import '../css/footer.css'
const Footer = () => {
  return (
    <footer className=" text-dark py-4 mt-auto  " id="footerbg" >
      <div className="container text-center ">
        
        
        {/* Logo */}
        <NavLink to="/home">
        <div className="mb-3">
          <img
            src={datasolvelogo}
            alt="Datasolve Analytics Logo"
            style={{ height: "50px", borderRadius:9 }}
          />
        </div>
        </NavLink>

        {/* Social Icons */}
        <div className="mb-3">
          <a
            href="https://www.facebook.com/DataSolve-Analytics-108434804017080/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-dark mx-2"
          >
            <i className="bi bi-facebook" style={{ fontSize: "1.1rem" }}></i>
          </a>
          <a
            href="https://twitter.com/DataSolveAnlyts"
            target="_blank"
            rel="noopener noreferrer"
            className="text-dark mx-2"
          >
            <i className="bi bi-twitter-x" style={{ fontSize: "1.1rem" }}></i>
          </a>
          <a
            href="https://www.linkedin.com/company/datasolve-analytics/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-dark mx-2"
          >
            <i className="bi bi-linkedin" style={{ fontSize: "1.1rem" }}></i>
          </a>
        </div>

        {/* Footer Message */}
        <div className='small'>
          <small style={{letterSpacing:3}} >
            © Datasolve Analytics Pvt Ltd {new Date().getFullYear()}.
            <br />
            </small>
            <small>
            Connecting Dots, Enriching Value.
          </small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
