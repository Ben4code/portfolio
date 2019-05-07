import React from 'react';
import { Link } from 'react-router-dom';

export default function PorjectSingle({ project }) {

    return (
        <div>
            <div className="myproject__item">
                <div className="myproject__item-img">
                    <Link to={`/projects/${project.id}`}>
                        <img src={project.projectImg} alt="project" />
                        <div className="myproject__item-title">
                            <p>{project.projectTitle}</p>
                        </div>
                    </Link>
                </div>
                <div className="myproject__item-desc">
                    <p>{project.projectDesc}</p>
                </div>
                <div className="myproject__item-links">
                    <Link to={project.projectLink}>View</Link>
                    { project.projectRepo ? <a target="_blank"  rel="noopener noreferrer" href={project.projectRepo}>Github</a> : null}
                    
                </div>
            </div>
        </div>
    )
}
