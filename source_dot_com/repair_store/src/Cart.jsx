import React, { createContext, useContext, useEffect, useState } from 'react'
import '../css/cart.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { CartContext } from './App';
import { toast } from 'react-toastify';


const Cart = () => {

  let navigate=useNavigate()
  let {productLength,setProductLength}=useContext(CartContext)
  let [productDetails,setProductDetails]=useState([])
  let [user_id,setUser_id]=useState('')
  // let user_id;

  useEffect(()=>{
    let check=localStorage.getItem("user") 
    if(check==='' || check===null){
      navigate('/login')
    }
    else if (check) {
      const userDetailsArray = check.split(" - ");
      const [userId, firstName, lastName, email, password, contact, streetAddress1, streetAddress2, city, state, pincode, country, profile] = userDetailsArray;
      // userId = {userId};
      setUser_id(userId)
      console.log("user_id",user_id)
    } 
    else 
    {
      console.log('No user data found in local storage');
    }
  },[navigate])

  useEffect(() => {
    if (user_id) {
      fetchProducts();
    // console.log("called....fetch") // Fetch data immediately when component mounts
    }
  }, [user_id]); // Empty dependency array means run once on mount

  useEffect(()=>{
    console.log("Cart updated",productDetails)
    setProductLength(productDetails.length)
  },[productDetails,setProductLength])

  let fetchProducts = async () => {
    try {
      const response = await axios.post('http://localhost:5164/getAllAddedCartById', {
        eventID: "1001",
        addInfo: {
          id:user_id
        }
      });

      // console.log("response",response)

      if (response.data.rData.rMessage === 'Successful') {
        setProductDetails(response.data.rData.users);
        console.log("Fetched Cart successfully");
        console.log("Cart ",productDetails);

      } else {
        console.log("Failed to fetch Cart");
      }
    } catch (error) {
      console.error("Error fetching Cart:", error);
    }

    // fetchProducts()
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
    <>
      {productDetails.length>0 ?

          <div className='cart'>
            {/* <h1>Cart</h1> */}
            
            {
                productDetails.map((item,index)=>(
                              <div key={index} className='cards' >
                                        <Link to={`/card/${item.productName}`}><img src={item.productImage} alt="" /></Link> 
                                        <div className="cards-info">
                                            <p>{item.productName}</p>
                                            <button onClick={()=>handleCartDelete(productDetails[index])}>Cancel</button>
                                        </div> 
                              </div>
                      )
                  )
            }
          </div>
          
        : <div className='no-data' ><h1 >No Item</h1></div>
      }
    </>
  )
}

export default Cart
