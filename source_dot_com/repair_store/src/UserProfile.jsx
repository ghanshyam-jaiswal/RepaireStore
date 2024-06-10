import React from "react";
import '../css/profile.css'
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";

const UserProfile = () => {

  let user=JSON.parse(localStorage.getItem('user'))

  let [userImg,setUserImg]=useState(localStorage.getItem('userImage') || '../Assests/user-profile-logo-img.jpg');
  // let [userImg,setUserImg]=useState('../Assests/user-profile-logo-img.jpg');

  useEffect(() => {
    // Update local storage whenever userImg changes
    localStorage.setItem('userImage', userImg);
  }, [userImg]);

  let handleImage = (e) => {
    const file = e.target.files[0];
    setUserImg(URL.createObjectURL(file));
  };

  const fileInputRef = useRef(null);
  const handleDivClick = () => {
    fileInputRef.current.click(); // Trigger file input click event
  };

  
  return (
    <div className="profile">
      <div className="profile-body">

        <div className="profile-body-img" style={{ backgroundImage: `url(${userImg})` }} onClick={handleDivClick}>
          {/* {<img src={userImg} alt="" />} */}
          {/* <input type="file" id="" value={userImg.img} onChange={handleImage} /> */}
          <input type="file"  ref={fileInputRef}  style={{ display: 'none' }} onChange={handleImage} />
          {/* <button onClick={handleButtonClick}>Change Profile</button> */}

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
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
