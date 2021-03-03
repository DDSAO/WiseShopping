import React, { useEffect } from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import { LoginPage } from './page/LoginPage';
import { MainPage } from './page/MainPage';
import { NavigationBar } from './features/navigation/NavigationBar';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {

  let login = useSelector( (state: RootState) => state.login)
  let isLoggedIn = useSelector( (state: RootState) => state.login.isLoggedIn)

  useEffect(() => {
    console.log(login)
  }, [isLoggedIn])

  
  if (isLoggedIn) {
    return (
      <Router>
        <NavigationBar />
        <Switch>
          <Route exact path="/">
            <MainPage />
          </Route>
          
        </Switch>   
      </Router>
    )
  } else {
    return <LoginPage />
  }
  
}

export default App;

/*
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
          */