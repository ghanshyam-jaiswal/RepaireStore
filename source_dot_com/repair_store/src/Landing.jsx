import React, { useEffect } from 'react'
import '../css/landing.css'
import { Link } from 'react-router-dom'
import list from '../Data/product'
import { CiFacebook } from "react-icons/ci";
import { LuInstagram } from "react-icons/lu";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaYoutubeSquare } from "react-icons/fa";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';

const Landing = () => {

  let imageSlide=[
    {
      img:'../Assests/hero-image.jpg'
    },
    {
      img:'tv.png'
    },
    {
      img:'../Assests/test.png'
    },
  ]

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    // pauseOnHover: false, // Disable pause on hover
  };


  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scrolling behavior 
    });
  };


  return (
    <div className='landing'>

      {/* <div className="landing-hero"></div> */}
     
      <Slider {...settings}>
        {imageSlide.map((item, index) => (
          // <div key={index} className="landing-hero" style={{ backgroundImage: `url(${item.img})` }}>
          <div className="landing-hero" >
            <img key={index} src={item.img} alt={`image${index+1}`} />
          </div>
        ))}
      </Slider>
      
      

      <div className="landing-item">

        {
          list.map((item,index)=>(

                <div className="landing-item-items">
                  <Link key={item.id} to={`/card/${item.name}`} style={{textDecoration:"none"}}>
                    {/* <div className="landing-item-img" style={{backgroundImage:'url("../Assests/alarm\ watch.jpg")'}}></div> */}
                    <img src={item.img} alt="" className="landing-item-img" />
                    {/* <div className="landing-item-text">Alarm</div> */}
                    <div className="landing-item-text">{item.name}</div>
                  </Link>
                </div>
          ))
        }
       
      </div>

      <div className="landing-back-to-top" onClick={scrollToTop}>Back-to-top</div>
      <div className="landing-footer">
        <div className="landing-footer-logo1" style={{backgroundImage: 'url("../Assests/logo-removebg.png")'}}></div>
        <div className="landing-footer-info landing-footer-info-title" >
          <h1 style={{color: 'rgb(203, 203, 37)'}}>Repair</h1>
          <h3 style={{color: 'rgb(224, 209, 209)'}} >Store</h3>
          </div>
        <div className="landing-footer-info">
          <div>About</div>
          <div>Customer Support</div>
          <div>FAQ</div>
          <div>Terms & Conditions</div>
        </div>
        <div className="landing-footer-info">
          <div><CiFacebook className='footer-info-icon' />Facebook</div>
          <div><LuInstagram className='footer-info-icon' />Instagram</div>
          <div><FaSquareXTwitter className='footer-info-icon' />Twitter</div>
          <div><FaYoutubeSquare className='footer-info-icon' />Youtube</div>
        </div>
        <div className="landing-footer-info landing-footer-info-link">
         <div><Link onClick={scrollToTop}>Home</Link></div>
         {/* <div><Link to={'/category'}>Category</Link></div> */}
         <div><Link to={'/signup'}>Sign up</Link></div>
         <div><Link to={'/contact'}>Contact</Link></div>
         <div> <Link to={'/about'}>About</Link></div>
        </div>
        <div className="landing-footer-logo1" style={{backgroundImage:'url("../Assests/energy-charger-logo-removebg-preview.png")'}}></div>

      </div>

    </div>
  ) 
}

export default Landing
