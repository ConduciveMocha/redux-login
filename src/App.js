import React, { Component } from 'react';
import './App.css';
import LoginScreen from './components/LoginScreen.jsx';
import CreateAccountScreen from './components/CreateAcountScreen';
import {Route,Link,BrowserRouter as Router} from 'react-router-dom';

const routing = (
  <Router>
    <div className="App">
      <Route exact path="/" component={LoginScreen}/>
      <Route path='/register' component={CreateAccountScreen}/>
    </div>
  </Router>
)

class App extends Component {
  render() {
    return (
      routing
    );
  }
}

export default App;