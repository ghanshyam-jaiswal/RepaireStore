import React, { useEffect, useState } from 'react'
import axios from 'axios';
import "../css/adminUsers.css"

const AdminUsers = () => {

  let [userDetails,setUserDetails]=useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.post('http://localhost:5164/getAllUsers', {
          eventID: "1001",
          addInfo: {}
        });
  
        if (response.data.rData.rMessage === 'Successful') {
          setUserDetails(response.data.rData.users);
          console.log("Fetched users successfully");
          console.log("userDetails ",userDetails);

        } else {
          console.log("Failed to fetch users");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers(); // Fetch data immediately when component mounts
  }, []); // Empty dependency array means run once on mount
  
  useEffect(()=>{
    console.log("userDetails updated",userDetails)
  },[userDetails])


  return (
    <div className='adminUsers'>

        <div className='adminUsers-heading'>
            <h1>ID</h1>
            <h1>Name</h1>
            <h1>Email</h1>
            <h1>Password</h1>
            <h1>Contact</h1>
            <h1>Address</h1>
            <h1>City</h1>
            <h1>State</h1>
            <h1>Pin Code</h1>
            <h1>Country</h1>
            <h1>Profile</h1>
            <h1>Delete</h1>
        </div>
            

       
      
          {userDetails.map((user,index) => (
            <div key={index}>
              {/* <td>{user.user_id}</td>
              <td>{user.first_name} {user.last_name}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.contact || '--'}</td>
              <td>{user.street_address1} {user.street_address2}</td>
              <td>{user.city || '--' }</td>
              <td>{user.state || '--' }</td>
              <td>{user.pincode || '--' }</td>
              <td>{user.country || '--' }</td> */}
              {/* <td><img src={user.profile} alt="image" style={{width:'0%',height:'4%',border:'1px solid'}}/></td> */}
              {/* <td><button>Delete</button></td> */}



              {/* Add more table cells as needed */}
            </div>
          ))}
       
      {/* <div> add user</div> */}


    </div>
  )
}

export default AdminUsers
