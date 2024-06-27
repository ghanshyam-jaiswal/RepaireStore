import React from 'react'
import "../css/adminAllProducts.css"
const AdminAllProducts = () => {
  return (
    <div className='adminAllProducts'>
       <div className='tableContainer'>
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Id</th>
                <th>Name</th>
                <th>Price</th>
                <th>Demo Images</th>
                <th>Demo Text</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
                {/* {userDetails.map((user,index) => (
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
                      //<td><img src={user.profile} alt="image" style={{width:'0%',height:'4%',border:'1px solid'}}/></td>
                      <td>{user.profile ? <div className='profile' style={{backgroundImage:`url('${user.profile}')`,alt:'image'}}></div> : '--'}</td>
                      <td><button onClick={()=>handleDeleteUser(user.user_id)} className='delete-btn'>Delete</button></td>
                    </tr>
                ))
                } */}
             </tbody>
          
          </table>
        </div>

    </div>
  )
}

export default AdminAllProducts
