import React, { Component } from 'react';
import ProjectSingle from './PorjectSingle';
import Projects from '../../ContentStore/store';


class ProjectList extends Component {
    state = {
        current: "personal",
        projects: ''
    }

    componentDidMount() {
        this.setState({projects: Projects});
    }

    getProjectSingle = (projects) => {
        if (projects) {
            const selectedProjects = projects.filter(item => {
                return item.projectCat === this.state.current;
            })
            return selectedProjects.map(project => {
                return (
                    <ProjectSingle key={project.id} project={project} match={this.props.match}/>
                )
            })
        }
    }

    render() {
        return (
            <div className="subMenu">
                <div className="myproject__tab">
                    <button style={{ backgroundColor: this.state.current === "team" ? "#e9bf64" : "#603dac" }}
                        onClick={() => this.setState({ current: "team" })}>
                        Team Projects
                    </button>

                    <button style={{ backgroundColor: this.state.current === "personal" ? "#e9bf64" : "#603dac" }}
                        onClick={() => this.setState({ current: "personal" })}>
                        Personal Projects
                    </button>

                    <button style={{ backgroundColor: this.state.current === "exp" ? "#e9bf64" : "#603dac" }}
                        onClick={() => this.setState({ current: "exp" })}>
                        Experimental Projects
                    </button>
                </div>
                <div className="projectList">
                    {this.getProjectSingle(this.state.projects)}
                </div>
            </div>
        )
    }
}
export default ProjectList;