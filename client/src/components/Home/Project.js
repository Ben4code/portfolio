import React, { Component } from 'react'
import { Link } from 'react-router-dom';


export default class Project extends Component {
    render() {
        return (
            <section className="projects">

                <div className="bg"></div>
                <div className="bg2"></div>

                <div className="projects__heading">
                    <h2>Projects</h2>
                </div>
                <div className="projects__content">
                    <img src="./img/projects.svg" alt="my-projects"/>
                   
                    <div className="projects__content-img">
                        <ul>
                            <li>
                                <Link to="/projects"><i className="fa fa-users"></i></Link>
                                <span>
                                    <strong>
                                        <Link to="/projects">
                                            <h3>Team Projects</h3>
                                            <p>Working in a team is one of my favourite experience as a developer. It gives me the opportunity to contribute to others as well learn a thin or two.</p>
                                        </Link>
                                    </strong>
                                </span>

                            </li>
                            <li>
                                <Link to="/projects"> <i className="fa fa-wpexplorer"></i></Link>
                                <span>
                                    <strong>
                                        <Link to="/projects">
                                            <h3> Personal Projects </h3>
                                            <p>I became a developer so that I could make my ideas a reality. These are some of the ideas I hope will go mainstream some day.</p>
                                        </Link>
                                    </strong>
                                </span>
                            </li>
                            <li>
                                <Link to="/projects"><i className="fa fa-flask"></i></Link>
                                <span>
                                    <strong>
                                        <Link to="/projects">
                                            <h3>Experimental Projects</h3>
                                            <p>Staying relevant in the tech industry requires a lot of research and development. I spend lots of hours working on new projects by reading blog posts and watching videos with the intention of extending them.</p>
                                        </Link>
                                    </strong>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        )
    }
}
