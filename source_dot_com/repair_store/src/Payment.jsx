import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../css/payment.css'
const Payment = ({addToCart}) => {

    const location = useLocation();
    const { selectedCard,selectedPrice,selectedCardDetails } = location.state;

    console.log("selected Card",selectedCard)
    console.log("selected Price ",selectedPrice)
    console.log("selected CardDetails ",selectedCardDetails)

    let navigate=useNavigate()
    
    let thankYou=()=>{
        navigate('/thankyou')
        // toast.success('Successful')
    }

  return (
    <div className='payment'>
      <div className="payment-body">
        <h1>Payment : {selectedPrice}</h1>
        <button className='btn-proceed' onClick={()=>{addToCart(selectedCard);thankYou()}}>Proceed</button>
        <button className='btn-cancel' onClick={()=>navigate(`/card/${selectedCard.productName}`)}>Cancel</button>
      </div>
    </div>
  )
}

export default Payment
