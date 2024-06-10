import React from 'react'
import { Outlet } from 'react-router-dom'
import Nav from './Nav'
import '../css/home.css'
const Home = ({count}) => {
  return (
    <div className='home'>
      <Nav count={count}/>
      <Outlet/>
    </div>
  )
}

export default Home
