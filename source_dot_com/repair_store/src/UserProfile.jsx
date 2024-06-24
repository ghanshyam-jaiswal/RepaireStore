import React from "react";
import '../css/profile.css'
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UserProfile = () => {

  let navigate=useNavigate()


  let [userImage,setUserImg]=useState("")
  const [file, setFile] = useState(null);
  // const [user, setUser] = useState('');
  const [userDetails, setUserDetails] = useState({
    userId:'',firstName:'',lastName:'',email:'', password:'',contact:'',streetAddress1:'',streetAddress2:'',city:'',state:'',pincode:'',country:'',profile:''
  });


  const fileInputRef = useRef(null);

  let handleImage = (e) => {
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

  const handleDivClick = () => {
    fileInputRef.current.click(); // Trigger file input click event
  };


  useEffect(()=>{
    let check=localStorage.getItem("user")
    if(check==='' || check===null){
      navigate('/login')
    }
  },[])


  useEffect(() => {
    let userData = localStorage.getItem('user');
    console.log("userData",userData)
    if (userData) {
      try {
        const userDetailsArray = userData.split(" - ");
        const [userId, firstName, lastName, email, password, contact, streetAddress1, streetAddress2, city, state, pincode, country, profile] = userDetailsArray;
        const user = {userId,firstName,lastName,email, password,contact,streetAddress1,streetAddress2,city,state,pincode,country,profile};
        setUserDetails(user)
        // setUser(user);
        // console.log("user",user)
        console.log("userDetails",userDetails)
        // setUserImg(user.profile)
        setUserImg(profile)

        // console.log("user", user);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    } else {
      console.log('No user data found in local storage');
    }
  }, []);

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  
  
  let handleEditProfile=()=>{
    navigate("/updateprofile")
  }

  let handleUploadPhoto= async ()=>{
    // e.preventDefault()
    // console.log("userDetails-handleUploadPhoto",userDetails)
    
    if (!file) {
      toast.warn("Upload Profile");
      return;
    }

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
          if(response.data.rData.rMessage==='No rows affected. Update failed.')
          {
            toast.error("Already Exists")
          }
          else if(response.data.rData.rMessage==='UPDATE SUCCESSFULLY.')
          {
              toast.success('Updated Successfully');
              try{
                const response2 = await axios.post('http://localhost:5164/getUserByEmail', {
                        eventID: "1001",
                        addInfo: {
                          email: userDetails.email  // Assuming userId is passed as prop to UserProfile
                        }
                      });
                console.log("response2",response2)
                localStorage.setItem('user',response2.data.rData.rMessage);
                // setUserImg(userDetails.profile);
                // setUserDetails({ ...userDetails, profile: userImage });
                setUserDetails({ ...userDetails, profile:userDetails.profile });
                // navigate("/profile");

            } 
            catch (error)
            {
              toast.error(error.message);
            }
            
          }
        }
        catch (error)
        {
          console.error('Error Update:', error);
          if (error.response && error.response.status === 409) {
            toast.error('User with this email already exists');
          } else {
            toast.error('An error occurred during Update');
          }
        }

  }


  let handleImageRemove= async ()=>{
    // e.preventDefault()
    // console.log("userDetails",userDetails)
  

    let payload={
      eventID: "1001",
      addInfo: {
        user_id: userDetails.userId,
      }
    }

    try {
      const response = await axios.post('http://localhost:5164/deleteUserPhoto', payload);
      console.log(response)
      if(response.data.rData.rMessage==='No rows affected. Delete failed.'){
        toast.error("Already Exists")
      }
      else if(response.data.rData.rMessage==='DELETE SUCCESSFULLY.'){

        if(userDetails.profile===''|| userDetails.profile===null){
          toast.warn("Upload Profile")
        }
        else{
          console.log('Updated Successfully');
          toast.success('Updated Successfully');
        }
      
        try{
          const response2 = await axios.post('http://localhost:5164/getUserByEmail', {
                  eventID: "1001",
                  addInfo: {
                    email: userDetails.email  // Assuming userId is passed as prop to UserProfile
                  }
                });
          console.log("response2",response2)
          localStorage.setItem('user',response2.data.rData.rMessage);
          setUserImg("");
          // setFile(null);
          setUserDetails(prevDetails => ({ ...prevDetails, profile: "" }));
          // console.log("userDetails ",userDetails)
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

  let handleLogout = async ()=> {

    let confirm=window.confirm("Are You Sure")

    if(confirm){
      let payload={
        eventID: "1001",
        addInfo: {
          user_id: userDetails.userId,
        }
      }
  
      const response = await axios.post('http://localhost:5164/delete', payload);
      console.log(response)
      if(response.data.rData.rMessage==='No rows affected. Delete failed.'){
              toast.error("Already Exists")
      }
      else if(response.data.rData.rMessage==='DELETE SUCCESSFULLY.'){
      localStorage.removeItem('user')
      toast.success("Logout Successful")
      navigate("/")
      }
    }
    
    
  }

  return (
    <div className="profile">
      <div className="profile-body">

        {/* <div className="profile-body-img" style={{ backgroundImage: `url(${userImg})` }} onClick={handleDivClick}>
          <input type="file"  ref={fileInputRef}  style={{ display: 'none' }} onChange={handleImage} />
        </div> */}
        <div className="profile-body-img" onClick={handleDivClick} style={{ backgroundImage: userImage?`url(${userImage})` : "url('../Assests/user-profile-logo-img.png')" }} >
          {/* <img src={user.profile} alt="" /> */}
          <input type="file"  ref={fileInputRef} onChange={handleImage} style={{display:'none'}} placeholder="select image"/>
        </div>
        <div className="upload-btns">
          {/* <button onClick={()=>handleUploadPhoto()} className="upload-btn">{userDetails.profile ? 'Change' : 'Upload'}</button> */}
          <button onClick={()=>handleUploadPhoto()} className="upload-btn">Upload</button>
          <button onClick={()=>handleImageRemove()} className="remove-btn">Remove</button>
        </div>



        <h1>{userDetails.firstName} {userDetails.lastName}</h1>

        <div className="profile-body-details">
          <div><h4>Email</h4>:<p>{userDetails.email}</p></div>
          <div><h4>Contact</h4>:<p>{userDetails.contact?userDetails.contact:'--'}</p></div>
          <div><h4>Address</h4>:<p>
            {userDetails.streetAddress1 ? userDetails.streetAddress1 : '--'}
            {userDetails.streetAddress2 ? `, ${userDetails.streetAddress2}` : ''}
            </p></div>
          <div><h4>City</h4>:<p>{userDetails.city?userDetails.city:'--'}</p></div>
          <div><h4>State</h4>:<p>{userDetails.state?userDetails.state:'--'}</p></div>
          <div><h4>Pin Code</h4>:<p>{userDetails.pincode?userDetails.pincode:'--'}</p></div>
          <div><h4>Country</h4>:<p>{userDetails.country?userDetails.country:'--'}</p></div>
          {/* <img src={user.profile} alt="profile" /> */}
        </div>
        <div className="profile-edit">
          <button className="btn-edit-profile" onClick={()=>handleEditProfile()}>Edit Profile</button>
          <button className="btn-logout" onClick={()=>handleLogout()}>Delete Account</button>
      </div>
      </div>
    </div>
  );
};

export default UserProfile;
