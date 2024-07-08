import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import "../css/cartDetails.css"
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { SlCalender } from "react-icons/sl";
import axios from 'axios';
import { toast } from 'react-toastify';


const cartDetails = () => {

    let location=useLocation()
    let {details}=location.state
    // console.log("cartDetails",details)
    const uploadedImages = JSON.parse(details.uploadedImages);

    let navigate=useNavigate()

    useEffect(()=>{
    },[details])


    let handleCartDelete = async ()=> {
      let confirm=window.confirm("Are You Sure")
      if(confirm){
  
        let payload={
          eventID: "1001",
          addInfo: {
            table_id: details.table_id,
          }
        }
        const response = await axios.post('http://localhost:5164/deleteCartById', payload);
        // console.log(response)
        if(response.data.rData.rMessage==='No rows affected. Delete failed.'){
          toast.error("Failed")
        }
        else if(response.data.rData.rMessage==='DELETE SUCCESSFULLY.'){
        toast.success("Deleted Successful")
        navigate("/cart")
        }
      }
    }

  return (
    <div className='cartDetails'>

      {/* <h1 className='heading'>Product Details</h1> */}
      <div  className='card-item'>
        <div className='img-name'>
          <img src={details.productImage} alt={details.productName} />
          <h1>{details.productName}</h1>
        </div>
        <div className='price-date'>
          <h1><RiMoneyRupeeCircleFill /> {details.productPrice}</h1>  
          <p>{details.dateAndTime}</p>
        </div>
         
          
        
      </div>

      <div className='card-description'>
        <div className='box1'>
            <div className='data'>
                <div className='data1'>Brand</div>
                <div className='data2' >:</div>
                <div className='data3' >{details.brand}</div>
            </div>
            <div className='data'>
                <div className='data1'>Model</div>
                <div className='data2' >:</div>
                <div className='data3' >{details.model}</div>
            </div>
            {
                details.selectedProblem ? 
                    <div className='data'>
                        <div className='data1' >Problem</div> 
                        <div className='data2' >:</div> 
                        <div className='data3' >{details.selectedProblem}</div>
                    </div> 
                : ' '
            }
            {
                details.otherProblem ? 
                    <div className='data'> 
                        <div className='data1' >Problem</div> 
                        <div className='data2' >:</div>
                        <div className='data3' >{details.otherProblem}</div>
                    </div> 
                :' '

            }
            <div className='data'>
                <div className='data1 date' ><SlCalender /> Date</div> 
                <div className='data2' >:</div>
                <div className='data3' > {details.dateAndTime}</div>
            </div>
        </div>
        <div className='box2'>
          {/* { details.uploadedImages ? <p>Your Uploaded Images</p> : '--'} */}
          <p>Your Uploaded Images</p>
          { 
            uploadedImages.map((img, idx) => (
                    <img key={idx} src={img} alt={`img ${idx}`}  />
                  ))
            
          }
        </div>

      </div>
      <div className="card-button">
        <button className='card-button-request' onClick={()=>navigate('/cart')}>Back</button>
        <button className='card-button-cancel' onClick={handleCartDelete}>Cancel</button>
      </div>
      
    </div>
  )
}

export default cartDetails
