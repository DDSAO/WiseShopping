import { Card, createStyles, makeStyles, Grid, TextField } from '@material-ui/core';
import React from 'react';

import { Star } from '../features/star/Star';
import { Login } from '../features/user/Login';

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
  return (
    <div className = {classes.root}>
      <Star/>
      <Login/>
    </div>
  )
}