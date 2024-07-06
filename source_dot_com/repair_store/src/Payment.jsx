import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../css/payment.css'
import axios from 'axios';


const Payment = () => {

    const location = useLocation();
    const { selectedCard,selectedPrice,selectedCardDetails } = location.state;

    console.log("selected Card",selectedCard)
    console.log("selected Price ",selectedPrice)
    console.log("selected CardDetails ",selectedCardDetails)

    let user_id;
    let user_name;
    let user_contact;

    useEffect(() => {
      let userData = localStorage.getItem('user');
      if (userData) {
          const userDetailsArray = userData.split(" - ");
          const [userId, firstName, lastName, email, password, contact, streetAddress1, streetAddress2, city, state, pincode, country, profile] = userDetailsArray;
          user_id = {userId};
          user_name = {firstName,lastName};
          user_contact = {contact};
      } 
      else 
      {
        console.log('No user data found in local storage');
      }
    }, []);

    let navigate=useNavigate()
    
    let handleUpload= async (e)=>{
      // e.preventDefault()
      let payload={
        eventID: "1001",
        addInfo: {
          id: user_id.userId,
          productName: selectedCard.productName,
          productImage: selectedCard.productImage,
          productPrice: selectedCard.productPrice,
          brand: selectedCardDetails.brand,
          model:selectedCardDetails.model,
          selectedProblem:selectedCardDetails.selectedProblem,
          otherProblem:selectedCardDetails.otherProblem,
          uploadedImages:selectedCardDetails.uploadedImages,
          userName:user_name.firstName+" "+user_name.lastName,
          contact:user_contact.contact
        }
      }
      const response = await axios.post('http://localhost:5164/addToCart', payload);
        console.log("addToCart response",response)
        if(response.data.rData.rMessage==='Invalid product price'){
                toast.error("Invalid Product Price")
        }
        if(response.data.rData.rMessage==='Duplicate Credentials'){
                toast.error("Already Exists")
        }
        else if(response.data.rData.rMessage==='Added Successful'){
        // localStorage.removeItem('user')
        toast.success("Product Added Successful")
        // navigate("/admin/allproducts")
        navigate('/thankyou')
      }
    }

  return (
    <div className='payment'>
      <div className="payment-body">
        <h1>Payment : {selectedPrice}</h1>
        {/* <button className='btn-proceed' onClick={()=>{addToCart(selectedCard);thankYou()}}>Proceed</button> */}
        <button className='btn-proceed' onClick={()=>{handleUpload()}}>Proceed</button>
        <button className='btn-cancel' onClick={()=>navigate(`/card/${selectedCard.productName}`)}>Cancel</button>
      </div>
    </div>
  )
}

export default Payment
