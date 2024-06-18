import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import '../css/updateProfile.css'

const UpdateProfile = () => {

    let [userDetails,setUserDetails]=useState({
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

  return (
    <div className='signup'>
    <form onSubmit>
      <h1>Update Profile</h1>
      <div className='signup-div'>
        <div className="signup-fullname">
          <label htmlFor="name" >Full Name</label><br/><br/>
          <input type="text" id="name" placeholder='First Name' value={userDetails.firstName} onChange={e=>setUserDetails({...userDetails,firstName:e.target.value})}/>
          <input type="text" placeholder='Last Name' value={userDetails.lastName} onChange={e=>setUserDetails({...userDetails,lastName:e.target.value})} />
        </div>
        <div className="signup-email">
          <label htmlFor="email">Email</label><br/><br/>
          <input type="email" id="email" placeholder='eg: shyam@gmail.com' value={userDetails.email} onChange={e=>setUserDetails({...userDetails,email:e.target.value})} />
        </div>
        <div className="signup-email">
          <label htmlFor="pass">Password</label><br/><br/>
          <input type="password" id="pass" placeholder='Enter Password' value={userDetails.password} onChange={e=>setUserDetails({...userDetails,password:e.target.value})} />
        </div>
        <div className="signup-contact">
          <label htmlFor="contact">Contact</label><br/><br/>
          <input type="tel" id="contact" placeholder='Enter Number' value={userDetails.contact} onChange={e=>setUserDetails({...userDetails,contact:e.target.value})} />
        </div>
        <div className="signup-address">
          <label htmlFor="address">Address</label><br/><br/>
          <input type="text" id="address" placeholder='Street Address 1' value={userDetails.streetAddress1} onChange={e=>setUserDetails({...userDetails,streetAddress1:e.target.value})} />
          <input type="text" placeholder='Street Address 2' value={userDetails.streetAddress2} onChange={e=>setUserDetails({...userDetails,streetAddress2:e.target.value})} />
          <input type="text" placeholder='City' value={userDetails.city} onChange={e=>setUserDetails({...userDetails,city:e.target.value})}/>
          <input type="text" placeholder='state' value={userDetails.state} onChange={e=>setUserDetails({...userDetails,state:e.target.value})}/>
          <input type="number" placeholder='Postal / Zip Code' value={userDetails.pincode} onChange={e=>setUserDetails({...userDetails,pincode:e.target.value})}/>
          <input type="text" placeholder='Country' value={userDetails.country} onChange={e=>setUserDetails({...userDetails,country:e.target.value})} />
        </div>
        <div className="signup-submit">
          <input type="submit" value={'Sign up'} style={{backgroundColor:'rgb(81, 81, 222)',color:'white'}}/>
        </div>
        
      </div>
    </form>
  </div>
  )
}

export default UpdateProfile
