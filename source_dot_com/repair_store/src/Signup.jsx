import React from 'react'
import '../css/signup.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios';
import { ImEyeBlocked } from "react-icons/im";
import { ImEye } from "react-icons/im";

const Signup = () => {


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
    // profile:'C:\\Users\\ghanshyam\\shyam-cloned\\RepaireStore\\source_dot_com\\repair_store\\Assests\\user-profile-logo-img.jpg'
    profile:'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fuser-profile-pic&psig=AOvVaw2NEnLfSfXTnW2MUyXAzsK_&ust=1718536138379000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKjxrP293YYDFQAAAAAdAAAAABAE'
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
  

  // let handleSubmit=(e)=>{
  //   e.preventDefault()

  //   if(isValidate()){
  //     localStorage.setItem("user",JSON.stringify(userDetails))
  //     // alert('Successful')
  //     toast.success('successful')
  //     navigate('/login');
  //   }
    
  // }

  // let clearData=()=>{
  //   useState({
  //     firstName:'',
  //     lastName:'',
  //     email:'',
  //     password:'',
  //     contact:'',
  //     streetAddress1:'',
  //     streetAddress2:'',
  //     city:'',
  //     state:'',
  //     pincode:'',
  //     country:''
  //   })
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();

    let payload={
      
        eventID: "1001",
        addInfo: {
          email: userDetails.email,
          password: userDetails.password,
          first_name:userDetails.firstName ,
          last_name: userDetails.lastName,
          contact: userDetails.contact,
          street_address1:userDetails.streetAddress1 ,
          street_address2: userDetails.streetAddress2,
          city: userDetails.city,
          state: userDetails.state,
          pincode: userDetails.pincode,
          country: userDetails.country,
          profile:userDetails.profile
        }
      
    }
    // clearData()

    if (!isValidate()) return;

    try {
      const response = await axios.post('http://localhost:5164/signup', payload);
      console.log(response)
      if(response.data.rData.rMessage==='Duplicate Credentials'){
        toast.error("Already Exists")
      }
      else if(response.data.rData.rMessage==='Signup Successful'){
        console.log('Signup successful');
        toast.success('Signup successful');
        console.log(response.data);
        navigate('/login');
      }
    
      
    } catch (error) {
      console.error('Error signing up:', error);
      if (error.response && error.response.status === 409) {
        toast.error('User with this email already exists');
      } else {
        toast.error('An error occurred during signup');
      }
    }

    
  };

  let [visible,setVisible]=useState(false)


  return (
    <div className='signup'>
      <form onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
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
            <label htmlFor="pass">Password {visible ? <ImEyeBlocked onClick={() => setVisible(!visible)} className='icon'/> : <ImEye onClick={() => setVisible(!visible)} className='icon' />}</label><br/><br/>
            <input type={visible ? 'text' : 'password'} id="pass" placeholder='Enter Password' value={userDetails.password} onChange={e=>setUserDetails({...userDetails,password:e.target.value})} />
          </div>
          <div className="signup-contact">
            <label htmlFor="contact">Contact</label><br/><br/>
            <input type="tel" id="contact" placeholder='Enter Number' pattern="[0-9]{10}"  value={userDetails.contact} onChange={e=>setUserDetails({...userDetails,contact:e.target.value})} />
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
            {/* <input type="submit" value={'Sign up'} style={{backgroundColor:'rgb(81, 81, 222)',color:'white'}}/> */}
            <button type='submit'>Sign up</button>
          </div>
          
        </div>
      </form>
    </div>
  )
}

export default Signup
