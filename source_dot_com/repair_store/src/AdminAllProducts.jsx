import React, { useEffect, useState } from 'react'
import "../css/adminAllProducts.css"
import { Link, NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios';


const AdminAllProducts = () => {

  let [productDetails,setProductDetails]=useState([])

  useEffect(() => {
    // fetchProducts(); // Fetch data immediately when component mounts
  }, []); // Empty dependency array means run once on mount

  // useEffect(()=>{
  //   // console.log("userDetails updated",userDetails)
  // },[productDetails])


  let fetchProducts = async () => {
    try {
      const response = await axios.post('http://localhost:5164/getAllProduct', {
        eventID: "1001",
        addInfo: {}
      });

      if (response.data.rData.rMessage === 'Successful') {
        setProductDetails(response.data.rData.users);
        console.log("Fetched productDetails successfully");
        console.log("productDetails ",productDetails);

      } else {
        console.log("Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }

    // fetchProducts()
  };

 

  let navigate=useNavigate()

  return (
    <div className='adminAllProducts'>
       <div className='tableContainer'>
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Product Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Demo Images</th>
                <th>Demo Text</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
                {productDetails.map((product,index) => (
                  <tr key={index}>
                      <td>{product.id}</td>
                      <td><img src={product.productImage} alt="image" style={{width:'0%',height:'4%',border:'1px solid'}}/></td>
                      <td>{product.productName}</td>
                      <td>{product.productPrice}</td>
                      {/* <td>{product.product || '--'}</td> */}
                      {/* <td>{user.productDemoImages || '--'}</td> */}
                      {/* <td>{user.productDemoText }</td> */}
                      <td> 
                        {/* <ul>
                          {product.productDemoText.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul> */}
                      </td>
                      {/* <td><img src={user.profile} alt="image" style={{width:'0%',height:'4%',border:'1px solid'}}/></td> */}
                      <td><button  className='delete-btn'>Update</button></td>
                      {/* <td><button onClick={()=>handleDeleteUser(user.user_id)} className='delete-btn'>Delete</button></td> */}
                    </tr>
                ))
                }
             </tbody>
          
          </table>
        </div>
        <div className='addProduct' >
          <button onClick={()=>navigate('/admin/addproduct')}>Add New Product</button>
          {/* <Link to={'/admin/addproduct'}>Add New Product</Link> */}
        </div>

    </div>
  )
}

export default AdminAllProducts
