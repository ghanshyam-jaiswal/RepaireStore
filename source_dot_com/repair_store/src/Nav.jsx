import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "../css/nav.css";
import { FaShoppingCart } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import '../css/dropdown.css'
// import list from "../Data/product";
import { toast } from "react-toastify";
import { CartContext } from "./App";
import axios from 'axios';



const Nav = () => {

  let navigate=useNavigate()

  const [showDropdown, setShowDropdown] = useState(false);
  let {productLength,setProductLength}=useContext(CartContext)
  let [list,setList]=useState([])

  useEffect(() => {
    fetchProducts();
  }, []); 

  useEffect(()=>{
    console.log("category List updated",list)
  },[list])

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
    // console.log("category list",list)
  };


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

  let fetchProducts = async () => {
    try {
      const response = await axios.post('http://localhost:5164/getAllProductName', {
        eventID: "1001",
        addInfo: {}
      });

      if (response.data.rData.rMessage === 'Successful') {

        setList(response.data.rData.users);
        // console.log("Fetched category List successfully");
        // console.log("category response",response)
        // console.log("category response",response.data.rData.users)
        // console.log("category List ",list);

      } else {
        console.log("Failed to fetch  category List");
      }
    } catch (error) {
      console.error("Error fetching category List:", error);
    }
    // fetchProducts()
  };

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
          {/* <div className="dropdown" onClick={()=>toggleDropdown()}  > */}
            <NavLink >Category</NavLink>
            {showDropdown ? (
                <div className="dropdown-content">
                  { list.map((item,index)=>(
                    <NavLink key={index} to={`/card/${item.productName}`} >{item.productName}</NavLink>
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
              <NavLink to={"/cart"}  className="nav-cart"  ><FaShoppingCart />{productLength}</NavLink>
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
