import  React, { useRef, useState } from 'react';

import { Card, createStyles, makeStyles, Grid, TextField, Typography, Container, Button, FormControl, OutlinedInput, InputAdornment, IconButton, InputLabel } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useDispatch, useSelector } from 'react-redux';
import { displayMessage, login } from './loginSlice';
import { RootState } from '../../redux/store';
import LoopIcon from '@material-ui/icons/Loop';

const useStyles = makeStyles((theme) => createStyles({
  login: {
    width: 400,
    height: 400,
  },
  root: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    height: "100%",
    display:"flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection:"column",
  },
  row: {
    margin: theme.spacing(1),
    width: "100%",
  },
  buttonGroup: {
    width: "100%",
    display:"flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection:"row",
  }
}))

export const Login = () => {

  const [email, setEmail] = useState("")

  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState("")

  const messages = useSelector((state: RootState) => state.login.logInMessages)
  const status = useSelector((state: RootState) => state.login.status)

  const classes = useStyles()
  const dispatch = useDispatch()



  return(
  <Card className={classes.login}>
    <Container className={classes.root}>
      <Typography className={classes.row} variant="h6" align="center">Log In</Typography>
      <TextField  className={classes.row} id="username" label="User Name" variant="outlined" 
        onChange={(e) => setEmail(e.target.value)} value={email}
      />
      <FormControl className={classes.row} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={ 
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) => e.preventDefault()}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={70}
          />
        </FormControl>
        
      {messages.forEach((message) => <Typography>{message}</Typography>)}

      <div className={classes.buttonGroup}>
        <Button variant="outlined" color="primary"
          onClick = {() => {
            if (email && password) {
              dispatch(login({email, password}))
            } else {
              if (email === "") dispatch(displayMessage("Email should not be empty"))
              if (password === "") dispatch(displayMessage("Password should not be empty"))
            }
            
          }}
        >{status === "pending" ? <LoopIcon color="primary" className="rotatingIcon"/>: "Login"}</Button>
        <Button variant="outlined" color="primary">Register</Button>
      </div>
      <div className={classes.buttonGroup}>
        <Button variant="outlined" color="primary"
          onClick = {() => {
            setEmail("admin@admin.com")
            setPassword("password")
          }}
        >Just give me a test account</Button></div>

    </Container>
    
  </Card>
  )
}