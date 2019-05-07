import React from 'react';


export default function About() {
  return (
    <section className="about">
      <div className="about__heading">
        <h2>About</h2>
      </div>
      <div className="about__content">
        <div className="about__content-desc">
          <p>My name is Ben. I am a front end developer based in the UK who is very passionate about producing high quality responsive websites and exceptional user experiences. My goal is to help my clients improve response, drive sales and maximise profitability. 
          </p>

          <p>I have continued to use my design and development skills to serve agencies and startups in the UK and abroad.
          My contributions has led to the lunch of several start ups like Campus Portal, Ugarsoft and Manamuz Electric.
          I am also the founder of Varsity Lancer, an online platform that provides frelancing services to students.
          I enjoy contributing as a cofounder of Safety for Kids, an NGO that seeks to raise more awareness on the importance of child safety in Nigeria.
        </p>

          <p>
            I horned my front end development skills at Ugarsoft, a leading digital agency based in Nigeria.
            I have also worked as a contract engineer outsourced to Barclays Bank Inventment Capital by Line Managemant Group - A technology company based London.
            I interned as a developer at Greenwich Bright - a digital agency managed by the University of Greenwich in the UK.
          </p>

          <p>
            I have a master's distinction in mechanical and manufacturing engineering from the University of Greenwich.
          </p>

        </div>
        <img className="about__content-img" src="./img/about-me.png" alt="about ben obioha" />

      </div>
    </section>
  )
}
