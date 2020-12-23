import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,Switch,
  Route,} 
from 'react-router-dom';
import AddressForm from "./components/address-form/address-form";

export default class App extends React.Component{
  render(){
    return(
      <div className="App">
        <Router>
          <Switch>
            <Route exact path=''>
              <AddressForm />
            </Route>
          </Switch>
        </Router>
      </div>
    )
  }
}

// export default App;
