import React from 'react'
import { useLocation } from 'react-router-dom'
import "../css/cartDetails.css"

const cartDetails = () => {

    let location=useLocation()
    let {details}=location.state
    const uploadedImages = JSON.parse(details.uploadedImages);

  return (
    <div className='cartDetails'>

      {/* <h1 className='heading'>Product Details</h1> */}
      <div  className='card-item'>
        <img src={details.productImage} alt={details.productName} />
        <h1>{details.productName}</h1>
        <h1>{details.productPrice}</h1>   
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
                <div className='data1' >Date</div> 
                <div className='data2' >:</div>
                <div className='data3' >{details.dateAndTime}</div>
            </div>
        </div>
        <div className='box2'>
            {
                uploadedImages.map((img, idx) => (
                    <img key={idx} src={img} alt={`img ${idx}`}  />
                  ))
            }
        </div>

      </div>
      <div className="card-button">
        <button className='card-button-request' >Request</button>
        <button className='card-button-cancel' >Cancel</button>
      </div>
      
    </div>
  )
}

export default cartDetails
