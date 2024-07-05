import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BiEdit } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";




const AdminOrders = () => {

  let navigate=useNavigate()

  let [productDetails,setProductDetails]=useState([])

  useEffect(() => {
    fetchProducts(); 
  }, []); 

  useEffect(()=>{
    console.log("All Carts updated",productDetails)
  },[productDetails])

  let fetchProducts = async () => {
    try {
      const response = await axios.post('http://localhost:5164/getAllCarts', {
        eventID: "1001",
        addInfo: {}
      });

      if (response.data.rData.rMessage === 'Successful') {
        setProductDetails(response.data.rData.users);
        // console.log("Fetched All Carts successfully");
        console.log("All Carts ",productDetails);

      } else {
        console.log("Failed to fetch All Carts");
      }
    } catch (error) {
      console.error("Error fetching All Carts:", error);
    }

  };

  return (
    <div className='adminAllProducts'>
       <div className='tableContainer'>
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Brand</th>
                <th>Model</th>
                <th>Selected Problem</th>
                <th>Other Problem</th>
                <th>Date-Time</th>
                <th>User Name</th>
                <th>Contact</th>
                <th>Uploaded Images</th>
                <th>action</th>
              </tr>
            </thead>
            <tbody>
                {productDetails.map((product,index) => (
                  <tr key={index}>
                      <td><img src={product.productImage} alt="image" className='profile'/></td>
                      <td>{product.productName}</td>
                      <td>Rs. {product.productPrice}</td>
                      <td>{product.brand}</td>
                      <td>{product.model}</td>
                      <td>{product.selectedProblem}</td>
                      <td>{product.otherProblem}</td>
                      <td>{product.dateAndTime}</td>
                      <td>--</td>
                      <td>--</td>
                      {/* <td> 
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
                        {product.productDemoText && Array.isArray(JSON.parse(product.productDemoText)) ? (
                          <ul style={{listStyle: 'none'}}>
                            {JSON.parse(product.productDemoText).map((item, idx) => (
                              <li key={idx} >{item}</li>
                            ))}
                          </ul>
                          ) : ('--')
                        }
                      </td> */}
                      <td>
                        <div className='action'>
                          {/* <button onClick={()=>navigate(`/admin/updateproduct/${product.id}`)} className='delete-btn update'>Update <BiEdit style={{fontSize:'1vw'}} /></button> */}
                          <button className='delete-btn' onClick={()=>handleDeleteProduct(product.id)}>Delete <MdDeleteForever style={{fontSize:'1.1vw'}}/></button>
                        </div>
                      </td>
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

export default AdminOrders
