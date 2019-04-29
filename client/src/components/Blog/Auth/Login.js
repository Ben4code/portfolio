import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import {connect} from 'react-redux'
import {loginUser} from '../../../actions/authActions'

 class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: ''
  }

  emailFields(e) {
    this.setState({ email: e.target.value });
  }
  pwdFields(e) {
    this.setState({ password: e.target.value });
  }
  postField = (e) => {
    e.preventDefault();
    const loginUser = {
      email: this.state.email,
      password: this.state.password
    }
    this.props.loginUser(loginUser, this.props.history);
  }

  //Route Guard
  componentDidMount(){
    if(this.props.auth.isAuth){
      this.props.history.push('/');
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.errors){
      this.setState({errors: nextProps.errors})
    }
  }


  render() {
    const {errors} = this.state;


    return (
      <section className="blog">
        <div className="container">
          <div className="blog__form">
            <div className="form">
              <h1>Login </h1>
              <p>Not yet registered? Click <Link style={{ color: '#603dac', fontWeight: 'bold' }} to="/signup">here </Link> to sign up.</p>

              <form onSubmit={this.postField}>
                <label>
                  <input type="email" placeholder='&#xf1fa; Enter email' value={this.state.email} onChange={(e) => this.emailFields(e)} className={errors.email ? 'error' : ''}/>
                </label>
                {errors.email && (<div className="errorMsg">{errors.email}</div>)}
                <label>
                  <input type="password" placeholder="&#xf0e0; Enter password" value={this.state.password} onChange={(e) => this.pwdFields(e)} className={errors.password ? 'error' : ''}/>
                </label>
                {errors.password && (<div className="errorMsg">{errors.password}</div>)}

                <input type="submit" className="btn" value="Send &#xf1d8;" />
              </form>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
})


export default connect(mapStateToProps, {loginUser})(withRouter(Login))