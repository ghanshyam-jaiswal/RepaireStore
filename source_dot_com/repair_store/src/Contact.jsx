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
        <h1 className="contact-text">Want to chat now or get a call from us?</h1>

        <div className="contact-type">

          <div className="contact-type-box1">
            <h3><MdOutlineMessage style={{marginRight:'2%',fontSize:'200%'}}/> Send Your Queries or Questions Here</h3>
            <form>
              {/* <textarea name="" id="" style={{maxHeight:'50%',minHeight:'50%',maxWidth:'60%',minWidth:'60%',border:'none',padding:'2%'}}>Write Here.........</textarea> */}
              <textarea name="" id="" style={{maxHeight:'50%',minHeight:'50%',maxWidth:'60%',minWidth:'60%',border:'none',padding:'2%'}} defaultValue="Write Here......"></textarea>
              {/* <input type="text" placeholder="Hello........" className="contact-type-box1-msg"/> */}
              <div className="contact-type-box1-submit"><input type="submit" value={'Send'} onClick={()=>handleSend()}/> </div>
              {/* <div className="contact-type-box1-submit"><button onClick={handleIt}>click</button><ToastContainer /></div> */}
            </form>
          </div>

          <div className="contact-type-box2">
            <div className="contact-type-box2-1"><h3><LuPhoneCall style={{marginRight:'2%',fontSize:'150%'}}/><Link to={"tel:7000365544"}>+91 7000365577</Link></h3></div>
            <div className="contact-type-box2-2"><h3><FaMailBulk style={{marginRight:'2%',fontSize:'150%'}}/><Link to={"mailto:ghanshyamjaiswal7000@gmail.com"}>ghanshyamjaiswal7000@gmail.com</Link></h3></div>
          </div>

        </div>

        <div className="contact-footer">
          <div
            className="contact-footer-logo1"
            style={{
              backgroundImage: 'url("../Assests/8303673-removebg-preview.png")',
            }}
          ></div>
          <div
            className="contact-footer-info"
            style={{ color: "rgb(224, 209, 209)" }}
          >
            <h1 style={{ fontSize: "250%" }}>Repair</h1>
            <h1 style={{ fontSize: "500%" }}>Store</h1>
          </div>
          <div className="contact-footer-info">
            <div>About</div>
            <div>Customer Support</div>
            <div>FAQ</div>
            <div>Terms & Conditions</div>
          </div>
          <div className="contact-footer-info">
            <div>Facebook</div>
            <div>Instagram</div>
            <div>Twitter</div>
            <div>Youtube</div>
          </div>
          <div className="contact-footer-info contact-footer-info-link">
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
            className="contact-footer-logo1"
            style={{
              backgroundImage:
                'url("../Assests/energy-charger-logo-removebg-preview.png")',
            }}
          ></div>
        </div>

      </div>
    </>
  );
};

export default Contact;
