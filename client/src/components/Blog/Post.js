import React from 'react'
import { Link } from 'react-router-dom';

export default function Post({post}) {
    
    return (
        <div>
            <div className="myblog__item">
                <div className="myblog__item-img">
                    <Link to={`/blog/${post.id}`}>
                        <img src={post.post_img} alt="blog" />
                        <div className="myblog__item-title">
                            <p>{post.post_title}</p>
                        </div>
                    </Link>
                </div>
                <div className="myblog__item-desc">
                    <p>{post.post_p}</p>
                </div>
                <div className="myblog__item-links">
                    <Link to="/"></Link>
                    <Link to="/">Read More</Link>
                </div>
            </div>
        </div>
    )

}
