import React from "react";
import "../css/contact.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { MdOutlineMessage } from "react-icons/md";
import { LuPhoneCall } from "react-icons/lu";
import { FaMailBulk } from "react-icons/fa";
// import Landing from "./Landing";
import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// toast.configure();
import { FaUserLarge } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import { MdFax } from "react-icons/md";


const Contact = () => {

  let navigate=useNavigate()

  let handleSend=()=>{
    toast.success('Successful')
    navigate('/thankyou')
  }


  let handleIt=()=>{
    toast("Hello Geeks");
    // nevigate("/home")
    // <Landing/>
    // useNavigate("/home")
  }

  return (
    <>
      <div className="contact">
        
        <div className="contact-details">
          <div className="contact-details-1">
            <div className="contact-details-1-details">
              <div className="icon-text"> <label htmlFor="name"><FaUserLarge className="icon"/></label> <input type="text" id="name" placeholder="Name" /> </div>
              <div className="icon-text"> <label htmlFor="email"><MdEmail className="icon"/></label><input type="email" id="email" placeholder="Email" /> </div>
              <textarea name="" id="" defaultValue="Write Here......"></textarea>
              <div className="contact-details-1-details-button" ><button>Send Message</button></div>
            </div>
          </div>

          <div className="contact-details-2"><img src="../Assests/contact.png" alt="Contact Us" /></div>

          <div className="contact-option">
              <div className="contact-option-box">
                <div className="contact-option-box-icon"><FaLocationDot /></div>
                <div className="contact-option-box-h"><h3>OFFICE</h3></div>
                <div className="contact-option-box-p"><p>Plot No. 16, Electronic City, Phase IV, Udyog Vihar, Sector 18, Gurugram, Haryana 122001</p></div>
              </div>
              <div className="contact-option-box">
                <div className="contact-option-box-icon"><IoCall /></div>
                <div className="contact-option-box-h"><h3>PHONE NUMBER</h3></div>
                <div className="contact-option-box-p"><p><a href="tel:7000365544">+91-7000365544</a></p></div>
              </div>
              <div className="contact-option-box">
                <div className="contact-option-box-icon"><MdFax /></div>
                <div className="contact-option-box-h"><h3>FAX</h3></div>
                <div className="contact-option-box-p"><p><a href="tel:1-234-567-8900">1-234-567-8900</a></p></div>
              </div>
              <div className="contact-option-box">
                <div className="contact-option-box-icon"><MdEmail/></div>
                <div className="contact-option-box-h"><h3>EMAIL</h3></div>
                <div className="contact-option-box-p"><p><a href="mailto:">ghanshyamjaiswal7000@gmail.com</a></p></div>
              </div>
              
            </div>
        </div>

      </div>
    </>
  );
};

export default Contact;
