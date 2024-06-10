import React from 'react'

const Cart = ({cart,setCart}) => {
  
  let cartDelete=(dataToDelete)=>{
    console.log('delete')
    let newData=[...cart]
    newData.splice(dataToDelete,1) // specify the number of elements to remove
    console.log('cart: '+cart)
    console.log('new cart: '+newData)
    setCart(newData)
  }

  return (
    <div>
      <h1>cart</h1>
      
      {
           cart.map((item,index)=>(
            
                   
                        <div key={item.id} className='cards' >
                                    <img src={item.img} alt="" style={{width:"100%",height:"5%"}}/>
                                    <p>{item.name}</p>
                                    <button onClick={()=>cartDelete(index)}>Delete</button>
                        </div>
                
                        
                )
            )
      }
      
    </div>
  )
}

export default Cart
