import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';

export default class Contact extends Component {
    state = {
        name:'',
        email: '',
        message: '',
        errors: ''
      }
    
      nameFields(e) {
        this.setState({ name: e.target.value });
      }
      emailFields(e) {
        this.setState({ email: e.target.value });
      }
      messageFields(e) {
        this.setState({ message: e.target.value });
      }
      postField = (e) => {
        e.preventDefault();
        const mailUser = {
            name: this.state.name,
            email: this.state.email,
            message: this.state.message
        }
        console.log(mailUser);
        
        axios.post('/api/users/mail', mailUser)
        .then(res => {
            console.log(res)
            this.setState({
                name: '',
                email: '',
                message: '',
                errors: ''
            })
        })
        .catch(err => this.setState({errors: err.response.data}))}
    
    render() {
        const {errors} = this.state;

        return (
            <section className="contact">
                    <h2 className="contact__heading">Contact</h2>
                    <div className="container">
                        <div className="contact__form">
                            <div className="form">
                                <h1>Tell me something</h1>
                                <p>Or you can request a quote.</p>
                                <form onSubmit={this.postField}>
                                    <label>
                                        <input type="text" placeholder='&#xf007; Enter name' value={this.state.name} onChange={(e) => this.nameFields(e)} className={errors.name ? 'error' : ''}/>
                                    </label>
                                    {errors.name && (<div className="errorMsg">{errors.name}</div>)}

                                    <label>
                                        <input type="email" placeholder="&#xf1fa; Enter email" value={this.state.email} onChange={(e) => this.emailFields(e)} className={errors.email ? 'error' : ''}/>
                                    </label>
                                    {errors.email && (<div className="errorMsg">{errors.email}</div>)}
                                    
                                    <label>
                                        <textarea  placeholder="&#xf27a; Enter Message" value={this.state.message} onChange={(e) => this.messageFields(e)} className={errors.message ? 'error' : ''}></textarea>
                                    </label>
                                    {errors.message && (<div className="errorMsg">{errors.message}</div>)}


                                    <input type="submit" className="btn" value="Send &#xf1d8;" />
                                </form>
                            </div>
                            <div className="features">
                                <h4>FIND ME ON</h4>
                                    <ul className="social">
                                        <li> <Link to=""><i className="fa fa-linkedin"></i> LinkedIn</Link></li>
                                        <li> <Link to=""><i className="fa fa-twitter"></i> Twitter</Link></li>
                                        <li> <Link to=""><i className="fa fa-github"></i> Github</Link></li>
                                        <li> <Link to=""><i className="fa fa-youtube"></i> Youtube</Link></li>
                                    </ul>
                            </div>
                        </div>
                    </div>
            </section>
        )
    }
}
