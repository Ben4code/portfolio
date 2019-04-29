import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux'
import {registerUser} from '../../../actions/authActions';



class SignUp extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    avatar: '',
    errors: ''
  }

  //Route Guard
  componentDidMount(){
    if(this.props.auth.isAuth){
      this.props.history.push('/');
    }
  }

  //Update errors from redux state into comp state
  componentWillReceiveProps(nextProps){
    if(nextProps.errors){
      this.setState({errors: nextProps.errors})
    }
  }

  nameFields(e) {
    this.setState({name: e.target.value });
  }
  emailFields(e) {
    this.setState({email: e.target.value });
  }
  pwdFields(e) {
    this.setState({password: e.target.value });
  }
  conPwdFields(e) {
    this.setState({confirmPassword: e.target.value });
  }
  fileFields(e) {
    this.setState({avatar: e.target.files[0] });
  }
  postField = (e) => {
    e.preventDefault();
    
    const regUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      avatar: this.state.avatar
    }
    //Call action
    this.props.registerUser(regUser, this.props.history);
  }



  render() {
    const {errors} = this.state;
    return (
      <section className="blog">
        <div className="container">
          <div className="blog__form">
            <div className="form">
              <h1>Sign up </h1>
              <form onSubmit={this.postField} encType="multipart/form-data">
                <label>
                  <input type="text" placeholder='&#xf007; Enter name' value={this.state.name} onChange={(e) => this.nameFields(e)} className={errors.handle ? 'error' : ''}/>
                </label>
                {errors.handle && (<div className="errorMsg">{errors.handle}</div>)}

                <label>
                  <input type="email" placeholder='&#xf1fa; Enter email' value={this.state.email} onChange={(e) => this.emailFields(e)} className={errors.email ? 'error' : ''}/>
                </label>
                {errors.email && (<div className="errorMsg">{errors.email}</div>)}

                <label>
                  <input type="password" placeholder='&#xf023; Enter password' value={this.state.password} onChange={(e) => this.pwdFields(e)} className={errors.password ? 'error' : ''}/>
                </label>
                {errors.password && (<div className="errorMsg">{errors.password}</div>)}

                <label>
                  <input type="password" placeholder='&#xf023; Confirm password' value={this.state.confirmPassword} onChange={(e) => this.conPwdFields(e)} className={errors.confirmPassword ? 'error' : ''}/>
                </label>
                {errors.confirmPassword && (<div className="errorMsg">{errors.confirmPassword}</div>)}

                <label className="file">
                  <input type="file" name="avatar" onChange={(e) => this.fileFields(e)} className={errors.image ? 'error' : ''}/>
                </label>
                {errors.image && (<div className="errorMsg">{errors.image}</div>)}

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

export default connect(mapStateToProps, {registerUser} )(withRouter(SignUp));