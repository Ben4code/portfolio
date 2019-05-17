import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import { Provider } from 'react-redux';
import store from './store/store';
import jwt_decode from 'jwt-decode'



//Component imports
import Navbar from './components/Layouts/Navbar';
import Footer from './components/Layouts/Footer';
import Home from './components/Home/Index';
import PorjectList from './components/Home/ProjectList';
import PorjectCase from './components/Home/ProjectCase';
import Resume from './components/Home/Resume';
import Posts from './components/Blog/Posts';
import PostShow from './components/Blog/PostShow';
import Login from './components/Blog/Auth/Login';
import Signup from './components/Blog/Auth/SignUp';
import setAuthToken from './ultils/setAuthToken';
import { setCurrentUser, logOut } from './actions/authActions';

//Check for token
if(localStorage.jwtToken){
  //Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  //Decode token and get user info
  const decode = jwt_decode(localStorage.jwtToken)
  //Set user and isAuth
  store.dispatch(setCurrentUser(decode))

  //Check for expired token
  const currentTime = Date.now() / 1000;
  if(decode.exp < currentTime){
    //Logout user
    store.dispatch(logOut())
    
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Navbar />
          <div className="App">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/blog" component={Posts} />
              <Route exact path="/projects" component={PorjectList} />
              <Route exact path="/resume" component={Resume} />
              <Route exact path="/projects/:proId" component={PorjectCase} />
              <Route exact path="/blog/:postId" component={PostShow} />
            </Switch>
          </div>
          <Footer />
        </Router >
      </Provider>
    );
  }
}

export default App;
