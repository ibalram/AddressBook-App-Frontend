import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,Switch,
  Route,} 
from 'react-router-dom';
import AddressForm from "./components/address-form/address-form";
import Home from './components/home/home';

export default class App extends React.Component{
  render(){
    return(
      <div className="App">
        <Router>
        <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
          </Switch>
          <Switch>
            <Route exact path='/person-form'>
              <AddressForm />
            </Route>
          </Switch>
        </Router>
      </div>
    )
  }
}

// export default App;
