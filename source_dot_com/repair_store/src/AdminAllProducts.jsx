import React, { useEffect, useState } from 'react'
import "../css/adminAllProducts.css"
import { Link, NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';
import { MdDeleteForever } from "react-icons/md";


const AdminAllProducts = () => {

  let [productDetails,setProductDetails]=useState([])

  let navigate=useNavigate()

  useEffect(() => {
    fetchProducts(); // Fetch data immediately when component mounts
  }, []); // Empty dependency array means run once on mount

  useEffect(()=>{
    // console.log("userDetails updated",userDetails)
  },[productDetails])

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


  let handleDeleteProduct = async (dataToBeDelete)=> {

    let confirm=window.confirm("Are You Sure")

    if(confirm){

      let payload={
        eventID: "1001",
        addInfo: {
          id: dataToBeDelete,
        }
      }
  
      const response = await axios.post('http://localhost:5164/deleteProduct', payload);
      console.log(response)
      if(response.data.rData.rMessage==='No rows affected. Delete failed.'){
              toast.error("Failed")
      }
      else if(response.data.rData.rMessage==='DELETE SUCCESSFULLY.'){
      // localStorage.removeItem('user')
      // toast.success("Delete Successful")
      console.log("deleted successful")
      toast.success("Deleted Successful")
      fetchProducts();
      // navigate("/")
      }
    }
    
  }
 

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
                      {/* <td><img src={product.productImage} alt="image" className='profile' style={{width:'30%',height:'10%',border:'1px solid'}}/></td> */}
                      <td><img src={product.productImage} alt="image" className='profile'/></td>
                      <td>{product.productName}</td>
                      <td>Rs. {product.productPrice}</td>
                      {/* <td>{product.product || '--'}</td> */}
                      {/* <td>{user.productDemoImages || '--'}</td> */}
                      <td> 
                        {/* Parse the JSON string and map through the array */}
                        {product.productDemoImages && Array.isArray(JSON.parse(product.productDemoImages)) ? (
                          <div className="imageList">
                            {JSON.parse(product.productDemoImages).map((imageData, idx) => (
                              <img key={idx} src={imageData} alt={`demo ${idx}`} style={{ width: '44%', height: '44%' ,boxShadow:'0 0 2px'}} />
                            ))}
                          </div>
                          ) : ('--')
                        }
                      </td>
                      <td> 
                        {/* Parse the JSON string and map through the array */}
                        {product.productDemoText && Array.isArray(JSON.parse(product.productDemoText)) ? (
                          <ul style={{listStyle: 'none'}}>
                            {JSON.parse(product.productDemoText).map((item, idx) => (
                              <li key={idx} >{item}</li>
                            ))}
                          </ul>
                          ) : ('--')
                        }
                      </td>
                      <td>
                        <div className='action'>
                          <button onClick={()=>navigate(`/admin/updateproduct/${product.id}`)} className='delete-btn update'>Update</button>
                          <button className='delete-btn' onClick={()=>handleDeleteProduct(product.id)}>Delete <MdDeleteForever style={{fontSize:'1.4vw'}}/></button>
                        </div>
                      </td>
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
