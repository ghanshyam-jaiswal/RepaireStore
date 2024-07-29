import React, { useEffect, useState } from 'react'
import axios from 'axios';
import "../css/adminUsers.css"
import { useNavigate } from 'react-router-dom';
import { MdDeleteForever } from "react-icons/md";
import { toast } from 'react-toastify';

const AdminUsers = () => {

  let [userDetails,setUserDetails]=useState([])

  // let [adminDetails,setAdminDetails]=useState('')

  let navigate=useNavigate()

  useEffect(()=>{
    let check=localStorage.getItem("user") || localStorage.getItem("admin")
    if(check==='' || check===null){
      navigate('/login')
    }
  },[])

    let fetchUsers = async () => {
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

  useEffect(() => {
      fetchUsers(); // Fetch data immediately when component mounts
  }, []); // Empty dependency array means run once on mount
  
  useEffect(()=>{
    console.log("userDetails updated",userDetails)
  },[userDetails])


  let handleDeleteUser = async (dataToBeDelete)=> {

    let confirm=window.confirm("Are You Sure")

    if(confirm){

      // let newData=[...userDetails]
      // newData.splice(dataToBeDelete,1)
      // setUserDetails(newData)
      // console.log('updated')

      let payload={
        eventID: "1001",
        addInfo: {
          user_id: dataToBeDelete,
        }
      }
  
      const response = await axios.post('http://localhost:5164/delete', payload);
      console.log(response)
      if(response.data.rData.rMessage==='No rows affected. Delete failed.'){
          toast.error("Failed")
      }
      else if(response.data.rData.rMessage==='DELETE SUCCESSFULLY.'){
        // localStorage.removeItem('user')
        toast.success("Delete Successful")
        console.log("deleted successful")
        fetchUsers();
        // navigate("/")
      }
    }
    
  }


  return (
    <div className='adminUsers'>
       <div className='tableContainer'>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Contact</th>
                <th>Address</th>
                <th>City</th>
                <th>State</th>
                <th>Pin Code</th>
                <th>Country</th>
                <th>Profile</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
                {userDetails.map((user,index) => (
                  <tr key={index}>
                      <td>{user.user_id}</td>
                      <td>{user.first_name} {user.last_name}</td>
                      <td>{user.email}</td>
                      <td>{user.password}</td>
                      <td>{user.contact || '--'}</td>
                      <td>{user.street_address1} {user.street_address2} </td>
                      <td>{user.city || '--' }</td>
                      <td>{user.state || '--' }</td>
                      <td>{user.pincode || '--' }</td>
                      <td>{user.country || '--' }</td> 
                      {/* <td><img src={user.profile} alt="image" style={{width:'0%',height:'4%',border:'1px solid'}}/></td> */}
                      <td>{user.profile ? <div className='profile' style={{backgroundImage:`url('${user.profile}')`,alt:'image'}}></div> : '--'}</td>
                      <td><button onClick={()=>handleDeleteUser(user.user_id)} className='delete-btn'>Delete <MdDeleteForever style={{fontSize:'1vw'}} /></button></td>
                    </tr>
                ))
                }
             </tbody>
          
          </table>
        </div>

    </div>
  )
}

export default AdminUsers
