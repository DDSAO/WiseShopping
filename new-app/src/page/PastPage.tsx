import React from 'react';


import { createStyles } from '@material-ui/styles';
import { Container, makeStyles } from '@material-ui/core';
import { Divider } from '@material-ui/core';
import { WishlistContainer } from '../features/wishlist/WishlistContainer';
import { NotificationContainer } from '../features/notification/NotificationContainer';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { PastWishlistContainer } from '../features/wishlist/PastWishlistContainer';


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
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent:"start",
    alignItems: "flex-start",
    marginBottom: theme.spacing(3),
  },
 
}))

export const PastPage = () => {
  const classes = useStyles()
  const wishlists = useSelector((state: RootState) => state.wishlist.pastWishlists)
  return ( 
      <div className={classes.root}>
        <Container className={classes.wishlistContainer}> 
          <PastWishlistContainer wishlists={wishlists} title="Past Wishlists"/>
        </Container>
      </div>
  );
}
