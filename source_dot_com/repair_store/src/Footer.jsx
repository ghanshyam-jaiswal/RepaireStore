import React from 'react'
import '../css/footer.css'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    
       <div className="landing-footer" style={{height:'24%'}}>
          <div
            className="landing-footer-logo1"
            style={{
              backgroundImage: 'url("../Assests/8303673-removebg-preview.png")',
            }}
          ></div>
          <div
            className="landing-footer-info"
            style={{ color: "rgb(224, 209, 209)" }}
          >
            <h1 style={{ fontSize: "250%" }}>Repair</h1>
            <h1 style={{ fontSize: "500%" }}>Store</h1>
          </div>
          <div className="landing-footer-info">
            <div>About</div>
            <div>Customer Support</div>
            <div>FAQ</div>
            <div>Terms & Conditions</div>
          </div>
          <div className="landing-footer-info">
            <div>Facebook</div>
            <div>Instagram</div>
            <div>Twitter</div>
            <div>Youtube</div>
          </div>
          <div className="landing-footer-info landing-footer-info-link">
            <div>
              <Link to={"/home"}>Home</Link>
            </div>
            <div>
              <Link to={"/category"}>Category</Link>
            </div>
            <div>
              <Link to={"/signup"}>Sign up</Link>
            </div>
            <div>
              <Link to={"/contact"}>Contact</Link>
            </div>
            <div>
              {" "}
              <Link to={"/about"}>About</Link>
            </div>
          </div>
          <div
            className="landing-footer-logo1"
            style={{
              backgroundImage:
                'url("../Assests/energy-charger-logo-removebg-preview.png")',
            }}
          ></div>
        </div>
  )
}

export default Footer
