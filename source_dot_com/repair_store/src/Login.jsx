import React, { useEffect } from 'react'
import "../css/login.css"
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios';
import { MdEmail } from "react-icons/md";
import { ImEyeBlocked } from "react-icons/im";
import { ImEye } from "react-icons/im";



const Login = () => {

  let navigate=useNavigate()

  useEffect(()=>{
    let check=localStorage.getItem("user")
    if(check==='' || check===null){
      navigate('/login')
    }
  },[])

  let [userDetails,setUserDetails]=useState({
    email:'',
    password:'',
  })



  let handleCreateAccount=()=>{
    navigate('/signup')
  }


  const handleLogin = async (e) => {
    e.preventDefault();

    let payload = {
      eventID: "1001",
      addInfo: {
        email: userDetails.email,
        password: userDetails.password,
      },
    };

    try {
      const response = await axios.post('http://localhost:5164/loginservice', payload);
      
      if (response.data==='Login successful') {
        console.log('response',response)
        // console.log(response)
        toast.success('Login Successful');
        // addToProfile(userDetails.email)

        try{
            const response2 = await axios.post('http://localhost:5164/getUserByEmail', {
                    eventID: "1001",
                    addInfo: {
                      email: userDetails.email  // Assuming userId is passed as prop to UserProfile
                    }
                  });
            console.log("response2",response2)
            localStorage.setItem('user',response2.data.rData.rMessage);
            // localStorage.setItem("token","RepairStore")
            // console.log("user",response2.data.rData.rMessage)
        } 
        catch (error)
        {
          toast.error(error.message);
        }
        navigate('/');
      } else {
        // console.log(response.data)
        // console.log(response)
        toast.error('Invalid');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      toast.error('An error occurred during login');
      // toast.error('Invalid Credentials');
    }
  };

  let [visible,setVisible]=useState(false)


  return (
    <section className='login-parent'>
    <div className='login'>
    <h1>Login </h1>
    <form >
      {/* <input type='email' placeholder='Email' value={userDetails.email} onChange={e=>setUserDetails({...userDetails,email:e.target.value})} /><br/><br/> */}
      <div className="icon-text"> <label htmlFor="email"><MdEmail className="icon"/></label> <input type="email" id="email" placeholder="Email" value={userDetails.email} onChange={(e)=>setUserDetails({...userDetails,email:e.target.value})}/> </div>
      <div className="icon-text"> <label htmlFor="pass">{visible ? <ImEyeBlocked onClick={() => setVisible(!visible)} className='icon'/> : <ImEye onClick={() => setVisible(!visible)} className='icon' />}</label> <input type={visible?'text':'password'} id="pass" placeholder="Password" value={userDetails.password} onChange={(e)=>setUserDetails({...userDetails,password:e.target.value})}/> </div>

      {/* <input type='password' placeholder='Password' value={userDetails.password} onChange={e=>setUserDetails({...userDetails,password:e.target.value})} /><br/><br/> */}
      {/* <input type='submit' value='Login' className='submit-btn' /> */}
      <button className='submit-btn' onClick={handleLogin}>Login</button>
      <button className='submit-btn' onClick={()=>handleCreateAccount()}>Create Account</button>
      {/* <input type='submit' value='create account' className='submit-btn' /> */}
      {/* <Link t={'/signup'}>create account</Link> */}
      
    </form>
  </div>
  </section>
  )
}

export default Login
