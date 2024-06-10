import React from 'react'
import '../css/thankyou.css'
import { useNavigate } from 'react-router-dom'
const ThankYou = () => {

    let navigate=useNavigate()
    let handleOk=()=>{
        navigate('/')
    }
  return (
    <div className='thankyou'>
      <div className="thankyou-section">
        <img src="../Assests/thankyou.png" alt="" />
        <button onClick={()=>handleOk()}>Ok</button>
      </div>
    </div>
  )
}

export default ThankYou
