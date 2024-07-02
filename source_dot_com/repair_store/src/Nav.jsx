import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "../css/nav.css";
import { FaShoppingCart } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import '../css/dropdown.css'
import list from "../Data/product";
import { toast } from "react-toastify";


const Nav = ({count}) => {

  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  let navigate=useNavigate()

  // let effectCall= useEffect(()=>{
  //   let check=localStorage.getItem("user")
  //   if(check===''|| check===null){
  //     navigate("/")
  //   }
  // },[navigate])

  let handleLogout=()=>{
    localStorage.removeItem('user') || localStorage.removeItem("admin")
    toast.success("Logout Successful")
    navigate("/")
  }

  

  return (
    <>
      <div className="nav">
        <div className="nav-logo"></div>
        <div className="nav-title">
          <h2 style={{color: 'rgb(203, 203, 37)'}}>Repair</h2>
          <h3 style={{color: 'rgb(224, 209, 209)'}} >Store</h3>
        </div>
        <div className="nav-links">
          <NavLink to={"/"} className={(e)=>{return e.isActive?"red":" "}} >Home</NavLink>
          {/* <NavLink to={"/category"} className={(e)=>{return e.isActive?"red":" "}} >Category</NavLink> */}

          <div className="dropdown" onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}  >
            <NavLink >Category</NavLink>
            {showDropdown ? (
                <div className="dropdown-content">
                  {list.map((item,index)=>(
                    <NavLink to={`/card/${item.name}`} key={index}>{item.name}</NavLink>
                  ))}
                </div>
                ) : null}
          </div>

          {/* <NavLink to={"/signup"} className={(e)=>{return e.isActive?"red":" "}}>Sign Up</NavLink> */}

          {localStorage.getItem("user") || localStorage.getItem("admin") ?
                                  <NavLink to={"/login"} className={(e)=>{return e.isActive?"red":" "}} onClick={()=>handleLogout()}>Logout</NavLink>
                                  :<NavLink to={"/login"} className={(e)=>{return e.isActive?"red":" "}} >Login</NavLink>}
          {
            localStorage.getItem("admin") 
            ? 
            <NavLink to={"/admin"} className={(e)=>{return e.isActive?"red":" "}} >Admin</NavLink> 
            :
            <>
              <NavLink to={"/contact"} className={(e)=>{return e.isActive?"red":" "}} >Contact</NavLink>
              <NavLink to={"/about"} className={(e)=>{return e.isActive?"red":" "}} >About</NavLink>
              {/* <NavLink to={"/admin"} className={(e)=>{return e.isActive?"red":" "}} >Admin</NavLink> */}
              <NavLink to={"/cart"}  className="nav-cart"  ><FaShoppingCart />{count}</NavLink>
              <NavLink to={"/profile"}> <CgProfile className="nav-profile" /> </NavLink>
              {/* <NavLink to={"/profile"}>{userImage.profile ? userImage.profile : <CgProfile className="nav-profile" /> }</NavLink> */}
              {/* {user.profile} */}
            </>
          }

        </div>
      </div>
    </>
  );
};

export default Nav;
