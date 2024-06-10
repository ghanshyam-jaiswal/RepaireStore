import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


const Login = () => {

  let [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
  });




  let navigate=useNavigate()


  let handleSubmit= (e)=>{
    e.preventDefault()

    let logged=JSON.parse(localStorage.getItem("user"))
    if(userDetails.username===logged.name && userDetails.password===logged.password){
      // alert('successful')
      toast.success('Succeessful')
      localStorage.setItem('loggedIn',true)
      navigate('/cards')
    }
    else{
      // alert('invailid')
      toast.error('Invailid')
    }
    


  // useEffect(() => {
  //   // Fetch data from JSON server
  //   axios.get('http://localhost:4000/users')
  //     .then(response => {
  //       // Set the fetched data in the state
  //       setAxiosData(response.data);
  //       console.log(axiosData)
  //     })
  //     .catch(error => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, []);

  

    // if (userDetails.name === username && userDetails.password === password ) {
    //   console.log('Login successful');
      // alert('Successful')
      // navigate('/home')



    // } else {
    //   console.log('Invalid username or password');
    //   // alert('Invailid')
    
    
    // }


    // if(isValidate()){}

      // axios.get('http://localhost:4000/users/'+username).then((res)=>{
      //   return  res.json();
      // }).then((resp)=>{
      //    console.log(resp)
      // }).catch((error)=>{
      //   alert('Login failed due to : '+error)
      // })
      // alert('successful')

 
  }

  // let isValidate=()=>{
  //   let proceed=true;
  //   if(username===''|| username===null){
  //     proceed=false
  //     alert('Enter Name')
  //   }
  //   if(password===''|| password===null){
  //     proceed=false
  //     alert('Enter Password')
  //   }
    
  //   return proceed;
  // }

  

  return (
    <div>
      <h1>Login</h1>

      <form  onSubmit={handleSubmit}>

        <input type="text" placeholder='Name' name='username' value={userDetails.username} onChange={(e)=>setUserDetails({ ...userDetails, username: e.target.value })}/><br/><br/>
        <input type="password" placeholder='Password' name='password' value={userDetails.password} onChange={(e)=>setUserDetails({ ...userDetails, password: e.target.value })}/><br/><br/>
        <button type='submit'>submit</button>
      </form>
     
      
    </div>
  )
}

export default Login
