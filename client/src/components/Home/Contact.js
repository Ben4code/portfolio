import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { mail } from '../../ultils/validation'


export default class Contact extends Component {
    state = {
        name: '',
        email: '',
        message: '',
        errors: '',
        confirm: ''
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
        
        //Validate form fields
        const { valid, errors } = mail({ ...mailUser });
        if (!valid) {
            this.setState({ errors })
            setTimeout(() => {
                this.setState({ errors: '' })
            }, 3000)
            return;
        }
        //Format email params and body
        const mailObj = {
            service_id: `${process.env.REACT_APP_SERVICE_ID}`,
            template_id: `${process.env.REACT_APP_TEMPLATE_ID}`,
            user_id: `${process.env.REACT_APP_USER_ID}`,
            template_params: {
                from_name: `${mailUser.name} (${mailUser.email})`,
                to_name: `${process.env.REACT_APP_EMAIL_ADDRESS}`,
                subject: `Mail from Portfolio website`,
                message_html: `${mailUser.message}`
            }
        }
        
        //Send email http request 
        axios.post('https://api.emailjs.com/api/v1.0/email/send', mailObj)
            .then(res => {
                this.setState({
                    name: '',
                    email: '',
                    message: '',
                    errors: '',
                    confirm: "Mail sent successfully."
                });
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        const { errors, confirm } = this.state;

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
                                    <input type="text" placeholder='&#xf007; Enter name' value={this.state.name} onChange={(e) => this.nameFields(e)} className={errors.name ? 'error' : ''} />
                                </label>
                                {errors.name && (<div className="errorMsg">{errors.name}</div>)}

                                <label>
                                    <input type="email" placeholder="&#xf1fa; Enter email" value={this.state.email} onChange={(e) => this.emailFields(e)} className={errors.email ? 'error' : ''} />
                                </label>
                                {errors.email && (<div className="errorMsg">{errors.email}</div>)}

                                <label>
                                    <textarea placeholder="&#xf27a; Enter Message" value={this.state.message} onChange={(e) => this.messageFields(e)} className={errors.message ? 'error' : ''}></textarea>
                                </label>
                                {errors.message && (<div className="errorMsg">{errors.message}</div>)}

                                <input type="submit" className="btn" value="Send &#xf1d8;" />
                                {confirm && (<div style={{ color: 'blue', fontWeight: 'bold' }}>{confirm}</div>)}

                            </form>
                        </div>
                        <div className="features">
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
