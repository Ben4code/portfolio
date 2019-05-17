import React, { Component } from 'react'

export default class Resume extends Component {

  render() {
    const pdf = {
        width: "100%",
        height: "1000px"
    }
    const pdf2 = {
        width: "100%",
        height: "100%"
    }
    return (
      <div style={pdf}>
        <object style={pdf2} alt="cv" aria-label="my resume" data="./img/downloads/nnaemekaObioha_UK_CV.pdf" type="application/pdf"></object>
      </div>
    )
  }
}
