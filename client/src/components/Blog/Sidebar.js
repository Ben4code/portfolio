import React from 'react'

export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebar__search">
                
                    <label>
                    
                        <input type="text" placeholder=" Search" />
                    </label>
                
            </div>
            <div className="sidebar__featured">
                <div className="sidebar__featured-item">
                    <img src="./img/projects/1.jpg" alt="" />
                    <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, iure.</h4>
                </div>
                <div className="sidebar__featured-item">
                    <img src="./img/projects/3.jpg" alt="" />
                    <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, iure.</h4>
                </div>
                <div className="sidebar__featured-item">
                    <img src="./img/projects/2.jpg" alt="" />
                    <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, iure.</h4>
                </div>
            </div>
        </div>
    )
}
