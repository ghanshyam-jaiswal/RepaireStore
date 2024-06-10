import React from 'react'
import "../css/login.css"
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { toast } from 'react-toastify'

const Login = () => {

  let [userDetails,setUserDetails]=useState({
    email:'',
    password:'',
  })

  let navigate=useNavigate()

  let handleCreateAccount=()=>{
    navigate('/signup')
  }

  let handleLogin=(e)=>{
     e.preventDefault()
    let logged=JSON.parse(localStorage.getItem("user"))
    if(userDetails.email===logged.email && userDetails.password===logged.password){
      toast.success('Succeessful')
      localStorage.setItem('loggedIn',true)
      navigate('/')
    }
    else{
      toast.error('Invailid')
    }
    

  }  


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
