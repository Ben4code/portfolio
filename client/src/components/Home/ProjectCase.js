import React, { Component } from 'react';
import Projects from '../../ContentStore/store';

export default class ProjectCase extends Component {
  state = { project: '' };

  componentDidMount() {
    const id = this.props.match.params.proId;
    const projectObj = Projects.filter(project => {
      return project.id === id;
    })
    this.setState({ project: projectObj });
  }

  //Render tags
  getProjectTags = (project) => {
    if (project) {
      return project.projectTags.map(tag => {
        return (
          <div className="case__tags-item" key={tag}>
            <span>{tag}</span>
          </div>
        )
      });
    }
  }



  //Render inner body
  getProjectBody = (project) => {
    if (project) {
      return project.projectBody.map(item => {
        return (
          <div className="case__item" key={item.id}>
            <div className="case__p">
              <p>{item.case_p}</p>
            </div>
            <img className="case__img" src={item.case_img} alt="project screen shot" />
          </div>
        )
      });
    }
  }

  // Render Main Body
  getProject = (projectArray) => {
    if (projectArray) {
      return projectArray.map(project => {
        return (
          <div key={project.id} className="case">
            <div className="case__title">
              <h1>{project.projectTitle}</h1>
            </div>
            <div className="case__tags">
              {this.getProjectTags(project)}
            </div>
            <div className="case__thumb">
              <img src={project.projectImg} alt="sldksdksd" />
            </div>
            <div className="projectBio">
              <p>{project.projectBio}</p>
            </div>
            <div className="case__body">
              {this.getProjectBody(project)}
            </div>
          </div>
        )
      })
    }
  }

  render() {
    return (
      <div>
        {this.getProject(this.state.project)}
      </div>
    )
  }
}