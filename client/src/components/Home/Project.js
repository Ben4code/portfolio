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
                                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae eligendi ipsa quod in nobis qui quisquam ad? Unde, sapiente nihil!</p>
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
                                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae eligendi ipsa quod in nobis qui quisquam ad? Unde, sapiente nihil!</p>
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
