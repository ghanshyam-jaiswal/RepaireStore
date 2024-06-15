import React from "react";
import '../css/profile.css'
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import axios from 'axios';

const UserProfile = ({login}) => {

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


  const [user, setUser] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (login) {
      fetchUser();
    }
  }, [login]);

    const fetchUser = async () => {
      try {
        const response = await axios.post('http://localhost:5164/getUserByEmail', {
          eventID: "1001",
          addInfo: {
            email: login  // Assuming userId is passed as prop to UserProfile
          }
        });

        console.log("login : ",login)
        console.log("Response : ",response)
        // setUser(response.data.rData.rMessage[0]); // Assuming response.data.users contains user details
        const userDetailsString = response.data.rData.rMessage;
        const userDetailsArray = userDetailsString.split("\n")[1].split(" - ");
        const [userId, firstName, lastName, email, password, contact, streetAddress1, streetAddress2, city, state, pincode,country,profile] = userDetailsArray;

          // Construct user object
          // "Retrieved User Details: 12 - shyam - sinha - shyam@gmail.com - 007 - 1234567890 - 123 Main St - Apt 4B - raipur - cg - 10001 - india"

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
        console.log("User : ",user)

      } catch (error) {
        setError(error.message);
      }
    };


  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="profile">
      <div className="profile-body">

        {/* <div className="profile-body-img" style={{ backgroundImage: `url(${userImg})` }} onClick={handleDivClick}>
          <input type="file"  ref={fileInputRef}  style={{ display: 'none' }} onChange={handleImage} />
        </div> */}
        <div className="profile-body-img" style={{ backgroundImage: "url('../Assests/user-profile-logo-img.jpg')" }}>
          {/* <input type="file"  /> */}
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
