import React from 'react'
import { useNavigate } from 'react-router-dom'

const Profile = () => {

  let userData=JSON.parse(localStorage.getItem("user"))

  let navigate=useNavigate()

  let handleLogout=()=>{
    // localStorage.removeItem("user")
    navigate('/signup')
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>Name : {userData.name}</p>
      <p>Email : {userData.email}</p>
      <p>Address :{userData.address}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Profile
