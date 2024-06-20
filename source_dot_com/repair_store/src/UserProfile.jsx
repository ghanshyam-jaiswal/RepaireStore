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

  let [userImage,setUserImg]=useState("")
  const [file, setFile] = useState(null);

  let [userDetails,setUserDetails]=useState({
    userId:'',
    profile:'',
    email:''

})

  let handleImage = (e) => {
    // const selectedFile  = e.target.files[0];
    // setUserImg(URL.createObjectURL(selectedFile ));
    // setFile(selectedFile)
    // console.log("userImage",userImage) // it does show immediate, it loads.

    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setUserImg(reader.result);
      setFile(file);
      setUserDetails({ ...userDetails, profile: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }

  };

  const fileInputRef = useRef(null);

  const handleDivClick = () => {
    fileInputRef.current.click(); // Trigger file input click event
  };

  // const formData = new FormData();
  // formData.append('file', file);


  useEffect(()=>{
    const userData = localStorage.getItem('user');
    const userDetailsArray = userData.split(" - ");
    const [userId, firstName, lastName, email, password, contact, streetAddress1, streetAddress2, city, state, pincode, country, profile] = userDetailsArray;
    setUserDetails({userId,profile,email})
    console.log("userDetails",userDetails)
  },[])

  
  let handleUploadPhoto= async ()=>{
    // e.preventDefault()
    // console.log("userDetails-handleUploadPhoto",userDetails)

    let payload={
  
      eventID: "1001",
      addInfo: {
        user_id: userDetails.userId,
        profile: userDetails.profile,
        // profile: userImage,

      }
    
    }

    try {
      const response = await axios.post('http://localhost:5164/updateUserPhotoById', payload);
      console.log("response",response)
      if(response.data.rData.rMessage==='No rows affected. Update failed.'){
        toast.error("Already Exists")
      }
      else if(response.data.rData.rMessage==='UPDATE SUCCESSFULLY.'){
        console.log('Updated Successfully');
        console.log("userDetails-handleUploadPhoto",userDetails)
        console.log("userImage",userImage)
        console.log("file",file)
        toast.success('Updated Successfully');
        
        // use here to fetch 

        try{
          const response2 = await axios.post('http://localhost:5164/getUserByEmail', {
                  eventID: "1001",
                  addInfo: {
                    email: userDetails.email  // Assuming userId is passed as prop to UserProfile
                  }
                });
          console.log("response2",response2)
          localStorage.setItem('user',response2.data.rData.rMessage);

      } 
        catch (error)
        {
          toast.error(error.message);
        }

      }
    
      
    } catch (error) {
        console.error('Error Update:', error);
        if (error.response && error.response.status === 409) {
          toast.error('User with this email already exists');
        } else {
          toast.error('An error occurred during Update');
        }
      }

  }

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
        setUserImg(user.profile)

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
        <div className="profile-body-img" onClick={handleDivClick} style={{ backgroundImage: userImage?`url(${userImage})` : "url('../Assests/user-profile-logo-img.jpg')" }} >
          {/* <img src={user.profile} alt="" /> */}
          <input type="file"  ref={fileInputRef} onChange={handleImage} style={{display:'none'}} placeholder="select image"/>
        </div>
        <div className="upload-btn">
          <button onClick={()=>handleUploadPhoto()} >Upload</button>
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
