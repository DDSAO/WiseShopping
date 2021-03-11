import { Card, createStyles, makeStyles, Grid, TextField, Fade, Button } from '@material-ui/core';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { Star } from '../features/star/Star';
import { Login } from '../features/user/Login';
import { Register } from '../features/user/Register';
import { RootState } from '../redux/store';

const useStyles = makeStyles((theme) => createStyles({
  root: {
    width: "100%",
    height: "100%",
    background: "radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

}))

export const LoginPage = () => {
  const classes = useStyles()
  const showRegister = useSelector((state:RootState) => state.login.showRegister)

  return (
    <div className = {classes.root}>
      <Star/>
      
      <Fade in={showRegister} mountOnEnter unmountOnExit>
        <Register/>
      </Fade > 
      <Fade in={! showRegister} mountOnEnter unmountOnExit>
        <Login/>      
      </Fade>
      
    </div>
  )
}