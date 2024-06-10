import React, { useEffect, useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Login';
import Card from './Card';
import Profile from './Profile';
import Home from './Home';
import Cards from './Cards';
import Cart from './Cart';
import Signup from './Signup';
import { Toaster } from 'react-hot-toast';

const App = () => {

    let [cart,setCart]=useState([])

    let addToCart=(data)=>{

      cart.find(card => card.name === data.name) ? alert('already exists') : setCart([...cart,data])
 
       console.log(cart)
    //    console.log(data)
    //    console.log(setCart)
 
   }

    useEffect(() => {
      console.log(cart.length);
    }, [cart]);


    


    let router= createBrowserRouter([
        {
           path:'/',
           element:<Home count={cart.length}/>,
           children:[
            {
                path:'/cards',
                element:<Cards/>
            },
            {
                path:'/card/:name',
                element:<Card addToCart={addToCart}/>
            },
            {
                path:'/login',
                element:<Login/>
            },
            {
                path:'/signup',
                element:<Signup/>
            },
            {
                path:'/profile',
                element:<Profile/>
            },
            {
                path:'/cart',
                element:<Cart cart={cart} setCart={setCart}/>
            },
           ]
        }
        
      
    ])
   
  return (
    <div>
      <RouterProvider router={router}/>
      <Toaster />
    </div>
  )
}

export default App
