import React from 'react'
import {Link} from 'react-router-dom';
import HeroImage from '../../images/bg.png';

export default function Hero() {
  
  return (
    <div>
      <div className="hero" style={{backgroundImage: `url(${HeroImage})`}}>
          <div className="hero__content">
            <div className="hero__content-avatar">
              <img src="./img/avatar.png" alt="my-avatar"/>
            </div>
            <div className="hero__content-text">
            <h2>Ben Obioha</h2>
              <h3>Frontend Developer</h3>
              <p>Hello, I am Ben, a frontend developer based in United Kingdom.</p>
              <span className="hero__content-links">
                <ul>
                  <li><Link to="/"><i className="fa fa-github"></i></Link></li>
                  <li><Link to="/"><i className="fa fa-linkedin"></i></Link></li>
                  <li><Link to="/"><i className="fa fa-twitter"></i></Link></li>
                  <li><Link to="/"><i className="fa fa-youtube"></i></Link></li>
                </ul>
              </span>
            </div>
          </div>
          <div className="hero__img">
            <img src="./img/portfolio2-2.png" alt="tech-stack"/>
          </div>
        </div>
    </div>
  )
}
