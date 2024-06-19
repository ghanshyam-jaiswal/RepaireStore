import React from "react";
import '../css/profile.css'
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UserProfile = () => {

  // useEffect(() => {
  //   // Update local storage whenever userImg changes
  //   localStorage.setItem('userImage', userImg);
  // }, [userImg]);

  // let handleImage = (e) => {
  //   const file = e.target.files[0];
  //   setUserImg(URL.createObjectURL(file));
  // };

  // const fileInputRef = useRef(null);
  // const handleDivClick = () => {
  //   fileInputRef.current.click(); // Trigger file input click event
  // };

  let navigate=useNavigate()

  useEffect(()=>{
    let check=localStorage.getItem("user")
    if(check==='' || check===null){
      navigate('/login')
    }
  },[])

  const [user, setUser] = useState('');

  useEffect(() => {
    // Retrieve the data from local storage
    const userData = localStorage.getItem('user');
    console.log("userData",userData)
    if (userData) {
      try {
        // Split the hyphen-separated string into an array
        const userDetailsArray = userData.split(" - ");
        
        // Map the array values to user properties
        const [userId, firstName, lastName, email, password, contact, streetAddress1, streetAddress2, city, state, pincode, country, profile] = userDetailsArray;
        const user = {
          userId,
          firstName,
          lastName,
          email,
          password,
          contact,
          streetAddress1,
          streetAddress2,
          city,
          state,
          pincode,
          country,
          profile
        };
        
        setUser(user);
        console.log("user", user);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    } else {
      console.log('No user data found in local storage');
    }
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }


  let handleLogout=()=>{
    localStorage.removeItem('user')
    toast.success("Logout Successful")
    navigate("/")
  }
  
  let handleEditProfile=()=>{
    navigate("/updateprofile")
  }


  return (
    <div className="profile">
      <div className="profile-body">

        {/* <div className="profile-body-img" style={{ backgroundImage: `url(${userImg})` }} onClick={handleDivClick}>
          <input type="file"  ref={fileInputRef}  style={{ display: 'none' }} onChange={handleImage} />
        </div> */}
        <div className="profile-body-img" style={{ backgroundImage: "url('../Assests/user-profile-logo-img.jpg')" }}>
          <input type="file"  />
        </div>

        <h1>{user.firstName} {user.lastName}</h1>

        <div className="profile-body-details">
          <div><h4>Email</h4>:<p>{user.email}</p></div>
          <div><h4>Contact</h4>:<p>{user.contact}</p></div>
          <div><h4>Address</h4>:<p>{user.streetAddress1} {user.streetAddress2}</p></div>
          <div><h4>City</h4>:<p>{user.city}</p></div>
          <div><h4>State</h4>:<p>{user.state}</p></div>
          <div><h4>Pin Code</h4>:<p>{user.pincode}</p></div>
          <div><h4>Country</h4>:<p>{user.country}</p></div>
          {/* <img src={user.profile} alt="profile" /> */}
        </div>
        <div className="profile-edit">
          <button className="btn-edit-profile" onClick={()=>handleEditProfile()}>Edit Profile</button>
          <button className="btn-logout" onClick={()=>handleLogout()}>Logout</button>
      </div>
      </div>
    </div>
  );
};

export default UserProfile;
