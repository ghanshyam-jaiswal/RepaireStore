import React, { useEffect, useState } from 'react'

const Login = () => {

  // let [isLoggedIn,setIsLoggedIn]=useState(false)
  // useEffect(
  //   ()=>{
  //     setIsLoggedIn(true)
  //   },[]
  // )
  // if(isLoggedIn){
  //   <Navigator to={<Welcome/>} />
  // }
  // else{
  //   <h1>please login.....</h1>
  // }

  return (
    <section className='login-parent'>
      <div className='login'>
      <h1>Login </h1>
      <form>
        <input type='text' placeholder='Name'/><br/><br/>
        <input type='text' placeholder='Email'/><br/><br/>
        <input type='submit' value='Login' className='submit-btn' />
        
      </form>
    </div>
    </section>
  )
}

export default Login
