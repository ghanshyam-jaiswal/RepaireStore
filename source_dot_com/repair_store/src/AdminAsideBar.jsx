import React from 'react'
import { NavLink } from 'react-router-dom'
import "../css/adminAsideBar.css"

const AdminAsideBar = () => {
  
  return (
    <div className='adminAsideBar'>
      <h1>Admin</h1>
      <NavLink to={"/admin/products"}  className={(e) => (e.isActive ? "active" : " ")} > Products </NavLink>
      <NavLink to={"/admin/users"} className={(e)=>{return e.isActive?"active":" "}} >Users</NavLink>
      <NavLink to={"/admin/orders"} className={(e)=>{return e.isActive?"active":" "}} >Orders</NavLink>
      <NavLink to={"/admin/contact"} className={(e)=>{return e.isActive?"active":" "}} >Contact</NavLink>
    </div>
  )
}

export default AdminAsideBar
