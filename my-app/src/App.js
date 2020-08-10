import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


import Navigation from './component/Navigation'
import NavMenu from './component/NavMenu'
import HomeMain from './component/HomeMain';
import NewWishlist from './component/NewWishlist'



function App() {
  return (
    <Router>
      <Navigation />
      <NavMenu />
      <Switch>
        <Route exact path="/">
          <HomeMain />
        </Route>
        <Route path="/addNewWishlist">
          <NewWishlist />
        </Route>
      </Switch>
        
    </Router>

  );
}

export default App;
