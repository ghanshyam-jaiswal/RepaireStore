import React from 'react'
import { Outlet } from 'react-router-dom'
import Nav from './Nav'
import '../css/home.css'
const Home = () => {
  return (
    <div className='home'>
      <Nav/>
      <Outlet/>
    </div>
  )
}

export default Home
