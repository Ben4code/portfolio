import React from 'react'
import HeroImage from '../../images/bg.png';

export default function Hero() {

  return (
    <div>
      <div className="hero" style={{ backgroundImage: `url(${HeroImage})` }}>
        <div className="hero__content">
          <div className="hero__content-avatar">
            <img src="./img/avatar.png" alt="my-avatar" />
          </div>
          <div className="hero__content-text">
            <h2>Ben Obioha</h2>
            <h3>Frontend Developer</h3>
            <p>Hello, I am Ben, a frontend developer based in the United Kingdom.</p>
            <span className="hero__content-links">
              <ul>
                <li>
                  <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/nnaemeka-ben-obioha">
                    <i className="fa fa-linkedin"></i>
                  </a>
                </li>
                <li>
                  <a target="_blank" rel="noopener noreferrer" href="https://github.com/Ben4code">
                    <i className="fa fa-github"></i>
                  </a>
                </li>
                <li>
                  <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/degivenchy">
                    <i className="fa fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/channel/UCApXNEn33tCZDSagPcWlA8Q/featured?view_as=subscriber">
                    <i className="fa fa-youtube"></i>
                  </a>
                </li>
              </ul>
            </span>
          </div>
        </div>
        <div className="hero__img">
          <img src="./img/portfolio2-2.png" alt="tech-stack" />
        </div>
      </div>
    </div>
  )
}
