import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify'
import "../css/adminContact.css"
import { MdDeleteForever } from "react-icons/md";


const AdminContact = () => {

  let [userDetails,setUserDetails]=useState([])

  let fetchUsers = async () => {
    try {
      const response = await axios.post('http://localhost:5164/getAllContact', {
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


let handleDeleteContact = async (dataToBeDelete)=> {

  let confirm=window.confirm("Are You Sure")

  if(confirm){

    // let newData=[...userDetails]
    // newData.splice(dataToBeDelete,1)
    // setUserDetails(newData)
    // console.log('updated')

    let payload={
      eventID: "1001",
      addInfo: {
        Id: dataToBeDelete,
      }
    }

    const response = await axios.post('http://localhost:5164/deleteContact', payload);
    console.log(response)
    if(response.data.rData.rMessage==='No rows affected. Delete failed.'){
            toast.error("Failed")
    }
    else if(response.data.rData.rMessage==='DELETE SUCCESSFULLY.'){
    // localStorage.removeItem('user')
    // toast.success("Delete Successful")
    console.log("deleted successful")
    toast.success("Deleted Successful")
    fetchUsers();
    // navigate("/")
    }
  }
  
}

  return (
    <div className='adminContact'>
       <div className='adminContactTableContainer'>
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
                {userDetails.map((user,index) => (
                    <tr key={index}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.message || '--'}</td>
                        <td><button onClick={()=>handleDeleteContact(user.id)} className='delete-btn'>Delete <MdDeleteForever style={{fontSize:'1.2vw',}} /></button></td>
                    </tr>
                  ))
                }
             </tbody>
          
          </table>
        </div>

    </div>
  )
}

export default AdminContact
