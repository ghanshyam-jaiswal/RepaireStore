import React, { useState } from 'react'
import '../css/about.css'
const About = () => {

//   let [use,setUse]=useState([
//     {
//       name:'gk',
//       profession:'engineer'
//     },
//     {
//       name:'shyam',
//       profession:'brand'
//     },
//     {
//       name:'ghanshyam',
//       profession:'engineer'
//     },

// ])
//   console.log(use[1].profession)

  return (
    <div className='about'>
      <h1>About Us</h1>

      <div className="about-box1">
        <div className="about-box1-item1">
          <h2>The Future Is Repairable</h2>
          <p>Things break. Wear and tear is normal, but throwing away almost-functional products shouldn’t
              be. As the world’s largest online repair community, we help thousands of people fix their broken
              stuff every day. We also have everything you need to fix your electronic devices yourself—quality
              replacement parts, specialty precision tools, and most importantly—free step-by-step repair 
              guides for thousands of products.
              A repairable future starts with you taking repair into your own hands and looks like active
              legislation and products designed to be fixed. iFixit is working at every level possible to make 
              that repairable future a reality, and we couldn’t do it without your support. Together we can fix 
              any thing.
          </p>
        </div>
        <div className="about-box1-item2"></div>
      </div>

      <div className="about-box1">
        <div className="about-box1-item2" style={{backgroundImage:'url(../Assests/8303673-removebg-preview.png)'}}></div>
        <div className="about-box1-item1">
        <h2>Broken Isn’t the End</h2>
          <p>Necessity, they say, is the mother of invention—and for college students, the father of invention is probably
             a shoestring budget. In 2003, Kyle Wiens and Luke Soules found themselves with a broken iBook G3. Replacing the 
             busted part wasn’t easy, especially with no instructions, but they managed to succeed with minimal broken tabs 
             and lost screws. They began harvesting parts from partially broken laptops and selling them online. And then, they
              were making repair manuals and posting them online
          </p>
        </div>
      </div>

      <div className="about-footer-card"><h2>CARD</h2></div>
      <h2>FOOTER</h2>
      
    </div>
  )
}

export default About
