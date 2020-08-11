import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


import Navigation from './component/Navigation'
import NavMenu from './component/NavMenu'
import HomeMain from './component/HomeMain';
import NewWishlist from './component/NewWishlist'
import PastWishlist from './component/PastWishlist';
import ViewWishlist from './component/ViewWishlist';



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
        <Route path="/pastWishlist">
          <PastWishlist />
        </Route>
        <Route path="/viewWishlist">
          <ViewWishlist />
        </Route>
      </Switch>
        
    </Router>

  );
}

export default App;
