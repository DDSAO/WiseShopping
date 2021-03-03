import React from 'react';


import { createStyles } from '@material-ui/styles';
import { Container, makeStyles } from '@material-ui/core';
import { Divider } from '@material-ui/core';
import { WishlistContainer } from '../features/wishlist/WishlistContainer';
import { NotificationContainer } from '../features/notification/NotificationContainer';

const useStyles = makeStyles((theme) => createStyles({
  root : { 
    //height: "100%",
    width: "100%",
    display: "flex",
    [theme.breakpoints.down('md')]: {
      flexDirection:"column",
    },
    flexDirection:"row",
  },
  wishlistContainer : {
    [theme.breakpoints.down('md')]: {
      width: "100%",
    },
    width: "70%",
    display: "flex",
    flexDirection: "row",
    justifyContent:"start",
    alignItems: "flex-start",
  },
  notificationContainer: {
    [theme.breakpoints.down('md')]: {
      width: "100%",
    },
    width: "30%",
    display: "flex",
    flexDirection: "row",
    justifyContent:"start",
    alignItems: "flex-start",
  }
}))

export const MainPage = () => {
  const classes = useStyles()
  return ( 
      <div className={classes.root}>
        <Container className={classes.wishlistContainer}>
          <WishlistContainer />
        </Container>
        <Container className={classes.notificationContainer}>
          <NotificationContainer />
        </Container>
      </div>
  );
}
