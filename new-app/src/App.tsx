import React, { useEffect } from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  useLocation,
} from "react-router-dom";
import { LoginPage } from './page/LoginPage';
import { MainPage } from './page/MainPage';
import { CreatePage } from './page/CreatePage';
import { NavigationBar } from './features/navigation/NavigationBar';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { EditPage } from './page/EditPage';
import { ViewPage } from './page/ViewPage';
import { PastPage } from './page/PastPage';
import { ViewPastPage } from './page/ViewPastPage';
import { useModalHook } from './features/popUp/ModalHook';
import { loggedIn } from './features/user/loginSlice';



function App() {

  let login = useSelector( (state: RootState) => state.login)
  let isLoggedIn = useSelector( (state: RootState) => state.login.isLoggedIn)
  
  const history = useHistory()
  const dispatch = useDispatch()

  const [renderModal, setModalOpen] = useModalHook({
    title: "You need to log in",
    content: "It seems your access right is expired, you will need to log in again.",
    confirmButton: "Go to Login Page",
    rejectButton: "no",
    confirmF: () => {
      history.push('/login')
    },
    rejectF: () => {
      dispatch(loggedIn())
    }
  })

  

  useEffect(() => {
    if (! isLoggedIn) setModalOpen(true)
  }, [isLoggedIn])


  return (
    <Router basename="/wishlist/v2">
      {renderModal}
      <Switch>
        <Route exact path="/">
          <NavigationBar />
          <MainPage />
        </Route>
        <Route path="/create">
          <NavigationBar />
          <CreatePage />
        </Route>
        <Route path="/edit/:id">
          <NavigationBar /> 
          <EditPage />
        </Route>
        <Route path="/view/:id">
          <NavigationBar />
          <ViewPage />
        </Route>
        <Route exact path="/past">
          <NavigationBar />
          <PastPage />
        </Route>
        <Route path="/past/:id">
          <NavigationBar />
          <ViewPastPage />
        </Route>
        <Route exact path="/login">
          <LoginPage />
        </Route> 
      </Switch>   
    </Router>
  )
 
  
}

export default App;
