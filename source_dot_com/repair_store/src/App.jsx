import React, { createContext, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Category from "./Category";
import Signup from "./Signup";
import About from "./About";
import Contact from "./Contact";
import Login from "./Login";
import Cart from "./Cart";
import CartDetails from "./CartDetails";
import UserProfile from "./UserProfile";
import Landing from "./Landing";
import Card from "./Card";
import Payment from "./Payment";
import ThankYou from "./ThankYou";
import { ToastContainer, toast } from 'react-toastify';
import UpdateProfile from "./UpdateProfile";
import Admin from "./Admin";
import AdminProduct from "./AdminProduct";
import AdminUsers from "./AdminUsers";
import AdminOrders from "./AdminOrders";
import AdminContact from "./AdminContact";
import AdminAllProducts from "./AdminAllProducts";
import AdminAddProduct from "./AdminAddProduct";
import AdminUpdateProduct from "./AdminUpdateProduct";

export const CartContext = createContext(); 

const App = () => {

  let [productLength,setProductLength]=useState('')
 
  return (
    <>
    <CartContext.Provider value={{productLength,setProductLength}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home  />}> 
            <Route path="/" element={<Landing />}>
              {/* <Route path="/home/alarm" element={<Alarm/>}></Route> */}
            </Route>
            <Route path="/category" element={<Category />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/contact" element={<Contact />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/cartDetails" element={<CartDetails/>}></Route>
            <Route path="/profile" element={<UserProfile/>}></Route>
            <Route path="/card/:productName" element={<Card/>}></Route>
            <Route path="/payment" element={<Payment />}></Route>
            <Route path="/thankyou" element={<ThankYou/>}></Route>
            <Route path="/updateprofile" element={<UpdateProfile/>}></Route>
            <Route path="/admin" element={<Admin/>} >
              <Route index element={<Navigate to="/admin/users" />} />
              <Route path="/admin/products" element={<AdminProduct/>} ></Route>
              <Route path="/admin/allproducts" element={<AdminAllProducts/>} ></Route>
              <Route path="/admin/updateproduct/:id" element={<AdminUpdateProduct/>} ></Route>
              <Route path="/admin/addproduct" element={<AdminAddProduct/>} ></Route>
              <Route path="/admin/users" element={<AdminUsers/>} ></Route>
              <Route path="/admin/orders" element={<AdminOrders/>} ></Route>
              <Route path="/admin/contact" element={<AdminContact/>} ></Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer/>
    </CartContext.Provider>
    </>
    
  );
};

export default App;
