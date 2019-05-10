import React, { Component } from 'react'
import './Navbar.css';
import { NavLink, Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { logOut } from '../../actions/authActions'

class Navbar extends Component {
    state = {
        showShadow: false
    }

    componentDidMount() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 10) {
                this.setState({
                    showShadow: true,
                    addOpacity: false
                })
            } else {
                this.setState({
                    showShadow: false,
                    addOpacity: true
                })
            }
        })
    }

    onLogOut = (e) => {
        e.preventDefault();
        this.props.logOut(this.props.history);
    }

    render() {
        
        const { isAuth, user } = this.props.auth;
         
        const authLinks = (
            <ul className="nav-link">
                <li className="menu-item"><NavLink exact to="/">Home</NavLink></li>
                <li className="menu-item"><NavLink to="/projects">Projects</NavLink></li>
                <li className="menu-item"><NavLink to="/blog">Blog</NavLink></li>
                <li className="menu-item"><Link to="./img/downloads/nnaemekaObioha_UK_CV.pdf" download>Resume</Link></li>
                <li className="menu-item"><a href="/" onClick={this.onLogOut.bind(this)}>Logout</a></li>
                <li className="menu-item">
                    <img src={ isAuth ? user.avatar : ''} width="30" style={{backgroundColor: 'fff', borderRadius: '50%'}} alt="User avatar"/>
                </li>
            </ul>
        );
        const guestLinks = (
            <ul className="nav-link">
                <li className="menu-item"><NavLink exact to="/">Home</NavLink></li>
                <li className="menu-item"><NavLink to="/projects">Projects</NavLink></li>
                <li className="menu-item"><NavLink to="/blog">Blog</NavLink></li>
                <li className="menu-item"><Link to="./img/downloads/nnaemekaObioha_UK_CV.pdf" download>Resume</Link></li>
               {this.props.location.pathname === '/blog' ? <li className="menu-item"><NavLink to="/login">Login</NavLink></li> : null} 
            </ul>
            
        )
        return (
            <nav style={{
                boxShadow: this.state.showShadow ? `0 .1rem 1rem .1rem rgba(0,0,0, .3)` : '',
                opacity: this.state.addOpacity ? '1' : '.9'
            }} className="toolbar">
                <div className="toolbar__logo">
                    <Link to="/">
                        <img src="./img/logo.svg" alt="logo" width="100" />
                    </Link>
                </div>
                <input type="checkbox" className="toggler" />
                <div className="hamburger">
                    <div></div>
                </div>
                {isAuth ? authLinks : guestLinks}

            </nav>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logOut })(withRouter(Navbar));