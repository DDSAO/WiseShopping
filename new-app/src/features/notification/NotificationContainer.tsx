import React, { useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom";

//icon
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import HistoryIcon from '@material-ui/icons/History';
import TitleIcon from '@material-ui/icons/Title';
import EditIcon from '@material-ui/icons/Edit';

import { RootState } from '../../redux/store';
import { createStyles } from '@material-ui/styles';
import { Container, makeStyles, Toolbar, Tooltip, Typography, IconButton, Divider } from '@material-ui/core';



const useStyles = makeStyles((theme) => createStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  grow: {
    flexGrow: 1,
  },
  container: {
    width: "100%",
    padding: "2%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flexWrap : "wrap",
    overflow: "scroll",
  },
  cardIcon: {
    color: "#555555",
    fontSize: "70",
  }
}))

export const NotificationContainer = () => {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()
  const wishlists = useSelector((state: RootState) => state.wishlist.wishlists)
  //const draft = useSelector(state => state.wishlist.newWishlist)
  //const user = useSelector(state => state.interface.user)

  const containerRef = useRef(null)

  useEffect(()=> {
    //dispatch(fetchWishlists(user.uid))
    
  }, [])
  

  return (  
    <div className={classes.root}>
    <Toolbar>
      <Typography variant="h5">Notification</Typography>
      <div className={classes.grow}></div>

      <Tooltip title="Updated Time"><IconButton><EditIcon /></IconButton></Tooltip>
    </Toolbar>
    <Divider variant="middle"/>
    <Container className={classes.container} ref={containerRef}>
    hi   
    </Container>
      
    </div>
  );
}
 
