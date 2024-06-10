import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { json, useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';

const Signup = () => {

  let [userDetails,setUserDetails]=useState({
    name:'',
    email:'',
    password:'',
    address:'',
  })

  let handleChange=(e)=>{
    let { name, value } = e.target;
    setUserDetails({...userDetails,[name]: value})
  }

  let navigate=useNavigate()

  let isValidate=()=>{

    let proceed=true
    let message='Enter';

    if(userDetails.name===''|| userDetails.name===null){
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
      toast.error(message)
    }
   
    return proceed
  }

  let handleSubmit=(e)=>{
    e.preventDefault();

    if(isValidate()){
      localStorage.setItem("user",JSON.stringify(userDetails))
      // alert('Successful')
      toast.success('successful')
      navigate('/login');
    }

    // axios.post("http://localhost:4000/users",userDetails)
    // .then(() => {
    //   console.log("User details submitted successfully:", userDetails);
    //   navigate('/login');
    // })
    // .catch((error) => {
    //   console.error('Failed to submit user details:', error);
    // });
    
  }

  return (
    <div>
        <h1>Sign up</h1>
        <form action="" onSubmit={handleSubmit}>
        <input type="text" placeholder='Name' name='name' value={userDetails.name} onChange={handleChange}/><br/><br/>
        {/* <input type="text" placeholder='Name' name='name' value={userDetails.name} onChange={(e)=>setUserDetails({...userDetails,name:e.target.value})}/><br/><br/> */} 
        <input type="email" placeholder='Email' name='email' value={userDetails.email} onChange={handleChange}/><br/><br/>
        <input type="password" placeholder='Password' name='password' value={userDetails.password} onChange={handleChange}/><br/><br/>
        <input type="text" placeholder='Address' name='address' value={userDetails.address} onChange={handleChange}/><br/><br/>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default Signup