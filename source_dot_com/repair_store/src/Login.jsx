import React from 'react'
import "../css/login.css"
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios';

const Login = ({addToProfile}) => {

  let [userDetails,setUserDetails]=useState({
    email:'',
    password:'',
  })

  let navigate=useNavigate()

  let handleCreateAccount=()=>{
    navigate('/signup')
  }

  // let handleLogin=(e)=>{
  //    e.preventDefault()
  //   let logged=JSON.parse(localStorage.getItem("user"))
  //   if(userDetails.email===logged.email && userDetails.password===logged.password){
  //     toast.success('Succeessful')
  //     localStorage.setItem('loggedIn',true)
  //     navigate('/')
  //   }
  //   else{
  //     toast.error('Invailid')
  //   }
  // }  

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
        // console.log(response.data)
        // console.log(response)
        toast.success('Login Successful');
        addToProfile(userDetails.email)
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



  return (
    <section className='login-parent'>
    <div className='login'>
    <h1>Login </h1>
    <form >
      <input type='email' placeholder='Email' value={userDetails.email} onChange={e=>setUserDetails({...userDetails,email:e.target.value})} /><br/><br/>
      <input type='password' placeholder='Password' value={userDetails.password} onChange={e=>setUserDetails({...userDetails,password:e.target.value})} /><br/><br/>
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
