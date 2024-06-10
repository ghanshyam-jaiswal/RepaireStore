import React from 'react'
import '../css/landing.css'
import { Link } from 'react-router-dom'
import list from '../Data/product'


const Landing = () => {

  let imageSlide=[
    {
      img:'../Assests/tablet.png'
    },
    {
      img:'../Assests/tv.png'
    },
    {
      img:'../Assests/thankyou.png'
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
  };


  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scrolling behavior 
    });
  };


  return (
    <div className='landing'>

      <div className="landing-hero"></div>
     
        {/* <Slider {...settings} >
          
          {
            imageSlide.map((item,index)=>(

              // <div className="landing-hero" key={index} style={{backgroundImage:`url(${item.img})`}}> </div>
              <div key={index} style={{backgroundImage:`url(${item.img})`}} className="landing-hero"> </div>

            ))
          }

        </Slider>
         */}
    
     
      
      

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
        <div className="landing-footer-logo1" style={{backgroundImage: 'url("../Assests/8303673-removebg-preview.png")'}}></div>
        <div className="landing-footer-info" style={{color: 'rgb(224, 209, 209)'}}>
          <h1 style={{fontSize:'250%'}}>Repair</h1>
          <h1 style={{fontSize:'500%'}}>Store</h1>
          </div>
        <div className="landing-footer-info">
          <div>About</div>
          <div>Customer Support</div>
          <div>FAQ</div>
          <div>Terms & Conditions</div>
        </div>
        <div className="landing-footer-info">
          <div>Facebook</div>
          <div>Instagram</div>
          <div>Twitter</div>
          <div>Youtube</div>
        </div>
        <div className="landing-footer-info landing-footer-info-link">
         <div><Link onClick={scrollToTop}>Home</Link></div>
         <div><Link to={'/category'}>Category</Link></div>
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
