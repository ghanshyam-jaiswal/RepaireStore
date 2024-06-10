import React from 'react'
import {useNavigate, useParams } from 'react-router-dom';
import list from '../Data/product';

const Card = ({addToCart}) => {
 
  const {name} = useParams();  
  // const selectedCard = list[index];
  const selectedCard = list.find(card => card.name === name); // it is arrow function --> list.find((card) => { return card.name === name}); 
  // console.log(selectedCard)


  // let timePss=()=>{
  //   console.log('timepass')
  // }
  // let navigate= useNavigate()

  // let cartAdded=(data)=>{
  //   console.log('compo');
  //   <Cart cartAdded={data}/>
  // }


  let navigate=useNavigate()
  let handleCancel=()=>{
    console.log('navigate called')
    navigate('/cards')
  }


  return (
    <div>
      <h2>Details</h2>
      <img src={selectedCard.img} style={{width:"20%",height:"20%"}}></img>
      <h1>{selectedCard.name}</h1>
      <h5>Write the Damage Problem Here</h5>
      <textarea name="" id="" cols={'50'} rows={'10'}></textarea> 
      {/* <TextField id="filled-basic" label="Filled" variant="filled" /> */}

      <p>you can write the problem like this</p><br/>

        {selectedCard.Description.map((description,index)=>(
          // console.log(description) 
          <li key={index}>{description}</li>
          // <li>{description}</li>
          )
         
        )}
        
      <br/>
      <button onClick={() => {addToCart(selectedCard)}}>Request</button>
      <button onClick={()=>handleCancel()}>Cancel</button>
    </div>
  )
}

export default Card
