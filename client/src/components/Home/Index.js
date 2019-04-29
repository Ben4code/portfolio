import React, { Component } from 'react'
import Hero  from './Hero';
import About from './About';
import Projects from './Project';
import Contact from './Contact';

import './Home.css';

export default class Home extends Component {
  render() {
    return (
      <div>
        <Hero/>
        <About/> 
        <Projects/>
        <Contact/>
      </div>
    )
  }
}
