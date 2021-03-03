import React from 'react';
import logo from './logo.svg';
import './App.css';
import './css.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { useSelector } from 'react-redux';


import Navigation from './component/Navigation'
import NavMenu from './component/NavMenu'
import HomeMain from './component/HomeMain';
import NewWishlist from './component/NewWishlist'
import PastWishlistContainer from './component/PastWishlistContainer';
import PastWishlist from './component/PastWishlist'
import ViewWishlist from './component/ViewWishlist';
import Empty from './component/Empty'
import Notification from './component/Notification';
import EditWishlist from './component/EditWishlist';
import Welcome from './component/Welcome';
import LoadingFrame from './component/LoadingFrame';

function App() {
  let shouldShow = useSelector(state => state.interface.notification.shouldShow)
  let isLoggedIn = useSelector(state => state.interface.isLoggedIn)

  if (isLoggedIn) {
    return (
      <Router>
        <Navigation />
        <LoadingFrame />
        {/*fetching.status ? <LoadingFrame /> : null*/}
        <NavMenu />
        {shouldShow ? <Notification /> : null}
        <Switch>
          <Route exact path="/">
            <HomeMain />
          </Route>
          <Route path="/addNewWishlist">
            <NewWishlist />
          </Route>
          <Route path="/editWishlist/:wid">
            <EditWishlist />
          </Route>
          <Route path="/pastWishlists">
            <PastWishlistContainer />
          </Route>
          <Route path="/pastWishlist/:wid">
            <PastWishlist />
          </Route>
          <Route path="/viewWishlist/:wid">
            <ViewWishlist />
          </Route>
          <Route path="/pastWishlist/:wid">
            <ViewWishlist />
          </Route>
          <Route path='/empty' >
            <Empty />
          </Route>
          <Route path="*">
            <HomeMain />
          </Route>
        </Switch>
          
      </Router>
    )
  } else {
    return <Welcome />
  }
}

export default App;
