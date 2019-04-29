import React, { Component } from 'react';
import Content from '../../ContentStore/posts';

export default class PostShow extends Component {
  state = { post: '' };

  componentDidMount() {    
    const id = this.props.match.params.postId;
    const postObj = Content.filter(post => {        
      return post.id === id;
    })
    this.setState({ post: postObj });
  }

  // Render Main Body
  getPost = (postArray) => {
    if (postArray) {        
      return postArray.map(postItem => {
        return (
          <div key={postItem.id} className="case">
            <div className="case__title">
              <h1>{postItem.post_title}</h1>
            </div>
            <div className="case__thumb">
              <img src={postItem.post_img} alt="sldksdksd" />
            </div>
            <div className="projectBio">
              <p>{postItem.post_p}</p>
            </div> 
          </div>
        )
      })
    }
  }

  render() {
    return (
      <div>
        {this.getPost(this.state.post)}
      </div>
    )
  }
}