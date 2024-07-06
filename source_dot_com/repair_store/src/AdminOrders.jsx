import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BiEdit } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import "../css/adminOrders.css"
import { toast } from 'react-toastify';

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

  let handleCartDelete = async (dataToBeDelete)=> {
    let idToDelete=dataToBeDelete.table_id
    // console.log("productLength",productLength)
    // console.log("dataToDelete",idToDelete)
    let confirm=window.confirm("Are You Sure")
    if(confirm){

      let payload={
        eventID: "1001",
        addInfo: {
          table_id: idToDelete,
        }
      }
      const response = await axios.post('http://localhost:5164/deleteCartById', payload);
      // console.log(response)
      if(response.data.rData.rMessage==='No rows affected. Delete failed.'){
        toast.error("Failed")
      }
      else if(response.data.rData.rMessage==='DELETE SUCCESSFULLY.'){
      // localStorage.removeItem('user')
      // toast.success("Delete Successful")
      // console.log("deleted successful")
      toast.success("Deleted Successful")
      fetchProducts();
      // navigate("/")
      }
    }
  }

  return (
    <div className='adminOrders'>
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
                {productDetails.map((product,index) => (
                  <tr key={index}>
                      <td><img src={product.productImage} alt="image" className='profile'/></td>
                      <td>{product.productName}</td>
                      <td>Rs. {product.productPrice}</td>
                      <td>{product.brand || '--'}</td>
                      <td>{product.model || '--'}</td>
                      <td>{product.selectedProblem || '--'}</td>
                      <td>{product.otherProblem || '--'}</td>
                      <td>{product.dateAndTime || '--'}</td>
                      <td>{product.userName || '--' }</td>
                      <td><a href={ product.contact ? `tel:${product.contact}` : ''} style={{textDecoration:'none', pointerEvents: product.contact ? 'auto' : 'none'}}>{product.contact || '--' }</a></td>
                      {/* <td>{product.contact || '--' }</td> */}
                      <td> 
                        {product.uploadedImages && product.uploadedImages.length > 0 ? (
                          <div className="imageList">
                            {JSON.parse(product.uploadedImages).map((imageData, idx) => (
                              <img key={idx} src={imageData} alt={`demo ${idx}`} style={{ width: '44%', height: '44%' ,boxShadow:'0 0 2px'}} />
                            ))}
                          </div>
                           ) : ('--')} 
                      </td>
                     
                      <td>
                        <div className='action'>
                          {/* <button onClick={()=>navigate(`/admin/updateproduct/${product.id}`)} className='delete-btn update'>Update <BiEdit style={{fontSize:'1vw'}} /></button> */}
                          <button className='delete-btn' onClick={()=>handleCartDelete(productDetails[index])}>Delete <MdDeleteForever style={{fontSize:'1.1vw'}}/></button>
                        </div>
                      </td>
                    </tr>
                ))
                }
             </tbody>
          
          </table>
        </div>

        {/* <div className='addProduct' >
          <button onClick={()=>navigate('/admin/addproduct')}>Add New Product</button> 
           <Link to={'/admin/addproduct'}>Add New Product</Link>
        </div> */}

    </div>
  )
}

export default AdminOrders
