import React, { Component } from 'react'
//import ProjectSingle from '../Home/PorjectSingle';
import Post from './Post'
import Content from '../../ContentStore/posts';
import BlogImage from '../../images/blog2.jpg'
import Sidebar from './Sidebar';

import './Blog.css';

export default class Posts extends Component {
    state = {
        posts: ''
    }

    componentDidMount() {
        this.setState({ posts: Content });
    }

    getProjectSingle = (posts) => {
        if (posts) {
            return posts.map(post => {
                return (
                    <Post key={post.id} post={post} match={this.props.match} />
                )
            })
        }
    }

    render() {
        return (
            <div className="subMenu">
                <div className="myblog__tab" style={{
                    background: `url(${BlogImage})`,
                    backgroundPosition: 'center bottom',
                    backgroundSize: 'cover',
                    backgroundAttachment: 'fixed'
                }}>
                    <div className="overlay">
                        <h1>Coming Soon...</h1>
                    </div>
                </div>
                <div className="myblog__content">
                    <div className="blogList">
                        {this.getProjectSingle(this.state.posts)}
                    </div>
                    <div className="myblog__sidebar">
                        <Sidebar />
                    </div>
                </div>
            </div>
        )
    }
}
