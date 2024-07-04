import React, { useEffect } from 'react'
import '../css/cart.css'
import { Link, useNavigate } from 'react-router-dom'

const Cart = ({cart,setCart}) => {

  let cartDelete=(dataToDelete)=>{

    let newData=[...cart]
    newData.splice(dataToDelete,1)
    console.log('deleted')
    setCart(newData)
  }

  let navigate=useNavigate()
  
  useEffect(()=>{
    let check=localStorage.getItem("user") 
    if(check==='' || check===null){
      navigate('/login')
    }
  },[])


  return (
    <>
      {cart.length>0 ?

          <div className='cart'>
            {/* <h1>Cart</h1> */}
            
            {
                cart.map((item,index)=>(
                              <div key={item.id} className='cards' >
                                        <Link to={`/card/${item.productName}`}><img src={item.productImage} alt="" /></Link> 
                                        <div className="cards-info">
                                            <p>{item.productName}</p>
                                            <button onClick={()=>cartDelete(index)}>Delete</button>
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
