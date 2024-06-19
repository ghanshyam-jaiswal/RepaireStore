import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import '../css/updateProfile.css'
import axios from 'axios';
import { ImEyeBlocked } from "react-icons/im";
import { ImEye } from "react-icons/im";


const UpdateProfile = () => {

    let [userDetails,setUserDetails]=useState({
        userId:'',
        firstName:'',
        lastName:'',
        email:'',
        password:'',
        contact:'',
        streetAddress1:'',
        streetAddress2:'',
        city:'',
        state:'',
        pincode:'',
        country:'',
        profile:''
    })
    
      let isValidate=()=>{

        let proceed=true
        let message='Enter';
    
        if(userDetails.firstName===''|| userDetails.firstName===null){
          proceed=false
          message+=' Name'
          
        }
        if(userDetails.email===''|| userDetails.email===null){
          proceed=false
          message+=' Email'
          
        }
        if(userDetails.password===''|| userDetails.password===null){
          proceed=false
          message+=' Password'
        }
       
        if(!proceed){
          // alert(message)
          toast.info(message)
        }
       
        return proceed
      }
    
      let navigate=useNavigate()

      useEffect(()=>{
        const userData = localStorage.getItem('user');
        const userDetailsArray = userData.split(" - ");
        const [userId, firstName, lastName, email, password, contact, streetAddress1, streetAddress2, city, state, pincode, country, profile] = userDetailsArray;
        setUserDetails({
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
        })
      },[])

      let handleSubmit= async (e)=>{
        e.preventDefault()
        console.log("userDetails",userDetails)

        let payload={
      
          eventID: "1001",
          addInfo: {
            user_id: userDetails.userId,
            first_name: userDetails.firstName,
            last_name: userDetails.lastName,
            email: userDetails.email,
            password:userDetails.password,
            contact: userDetails.contact,
            street_address1: userDetails.streetAddress1,
            street_address2: userDetails.streetAddress2,
            city: userDetails.city,
            state: userDetails.state,
            pincode: userDetails.pincode,
            country:userDetails.country,
            profile: userDetails.profile,
          }
        
        }
  
        if (!isValidate()) return;
    
        try {
          const response = await axios.post('http://localhost:5164/updateById', payload);
          console.log(response)
          if(response.data.rData.rMessage==='No rows affected. Update failed.'){
            toast.error("Already Exists")
          }
          else if(response.data.rData.rMessage==='UPDATE SUCCESSFULLY.'){
            console.log('Updated Successfully');
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
          } 
          catch (error)
          {
            toast.error(error.message);
          }
            navigate('/profile');
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

       let handleCancel=()=>{
        navigate("/profile")
       }
       
       let handleClear=()=>{
        setUserDetails({
          userId:'',
          firstName:'',
          lastName:'',
          email:'',
          password:'',
          contact:'',
          streetAddress1:'',
          streetAddress2:'',
          city:'',
          state:'',
          pincode:'',
          country:'',
          profile:''
        })
       }

    let [visible,setVisible]=useState(false)

  return (
    <div className='update'>
      <form onSubmit={handleSubmit}>
        <h1>Update Profile</h1>
        <div className='update-div'>
          <div className="update-fullname">
            <label htmlFor="name" >Full Name</label><br/><br/>
            <input type="text" id="name" placeholder='First Name' value={userDetails.firstName} onChange={e=>setUserDetails({...userDetails,firstName:e.target.value})}/>
            <input type="text" placeholder='Last Name' value={userDetails.lastName} onChange={e=>setUserDetails({...userDetails,lastName:e.target.value})} />
          </div>
          <div className="update-email">
            <label htmlFor="email">Email</label><br/><br/>
            <input type="email" id="email" placeholder='eg: shyam@gmail.com' value={userDetails.email} onChange={e=>setUserDetails({...userDetails,email:e.target.value})} />
          </div>

          <div className="update-email">
            <label htmlFor="pass">Password {visible ? <ImEyeBlocked onClick={() => setVisible(!visible)} className='icon'/> : <ImEye onClick={() => setVisible(!visible)} className='icon' />}</label>
              <br/><br/>
            <input type={visible ? 'text' : 'password'} id="pass" placeholder='Enter Password' value={userDetails.password} onChange={e=>setUserDetails({...userDetails,password:e.target.value})} />
            {/* <ImEyeBlocked />
            <ImEye /> */}
           
          </div>
          <div className="update-contact">
            <label htmlFor="contact">Contact</label><br/><br/>
            <input type="tel" id="contact" placeholder='Enter Number 'pattern="[0-9]{10}" value={userDetails.contact} onChange={e=>setUserDetails({...userDetails,contact:e.target.value})} />
          </div>
          <div className="update-address">
            <label htmlFor="address">Address</label><br/><br/>
            <input type="text" id="address" placeholder='Street Address 1' value={userDetails.streetAddress1} onChange={e=>setUserDetails({...userDetails,streetAddress1:e.target.value})} />
            <input type="text" placeholder='Street Address 2' value={userDetails.streetAddress2} onChange={e=>setUserDetails({...userDetails,streetAddress2:e.target.value})} />
            <input type="text" placeholder='City' value={userDetails.city} onChange={e=>setUserDetails({...userDetails,city:e.target.value})}/>
            <input type="text" placeholder='state' value={userDetails.state} onChange={e=>setUserDetails({...userDetails,state:e.target.value})}/>
            <input type="number" placeholder='Postal / Zip Code' max={6} min={6} value={userDetails.pincode} onChange={e=>setUserDetails({...userDetails,pincode:e.target.value})}/>
            <input type="text" placeholder='Country' value={userDetails.country} onChange={e=>setUserDetails({...userDetails,country:e.target.value})} />
          </div>
          <div className="update-submit">
            {/* <input type="submit" value={'Save'}  className="btn-save" /> */}
            <button type="submit" className="btn-save" >Save</button>
            <button onClick={handleClear} className="btn-clear" >Clear</button>
            <button onClick={handleCancel}  className="btn-cancel" >Cancel</button>
          </div>
          
        </div>
      </form>
    </div>
  )
}

export default UpdateProfile
