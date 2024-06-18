import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../css/payment.css'
const Payment = ({addToCart}) => {

    const location = useLocation();
    const { selectedCard } = location.state;

    let navigate=useNavigate()
    
    let handleCancel=()=>{
        navigate(`/card/${selectedCard.name}`)
    }

    let thankYou=()=>{
        navigate('/thankyou')
        // toast.success('Successful')
    }

  return (
    <div className='payment'>
      <div className="payment-body">
        <h1>Payment</h1>
        <button className='btn-proceed' onClick={()=>{addToCart(selectedCard);thankYou()}}>Proceed</button>
        <button className='btn-cancel' onClick={()=>handleCancel()}>Cancel</button>
      </div>
    </div>
  )
}

export default Payment
