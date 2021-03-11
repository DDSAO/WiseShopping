
import { Container, makeStyles, createStyles, Typography, Toolbar, Button, ButtonGroup } from '@material-ui/core'
import React from 'react'
import clsx from 'clsx'
import { useHistory, useParams } from 'react-router';
import { RootState } from '../redux/store'
import { WishItem, Wishlist } from '../features/wishlist/wishlistSlice'
import { useDispatch, useSelector } from 'react-redux';
import { NotFound } from './NotFound';
import { PastWishItemCard } from '../features/wishlist/PastWishItemCard';
import { ConfirmPopUp } from '../features/popUp/ConfirmPopUp';

import { finishWishlist } from '../features/wishlist/wishlistSlice'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';


const useStyles = makeStyles((theme) => createStyles({
  toolbar: {
    marginTop: theme.spacing(2),
  },
  flexCenter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  flexGrow: {
    flexGrow: 1,
  },
  buttonGroup: {
    display:"flex",
    justifyContent:"space-around",
    alignItems: "center",
  }
}))

type ViewParams = {
  id: string
}

export const ViewPastPage = () => {

  const { id } = useParams<ViewParams>();

  const wishlist: Wishlist|undefined = useSelector((state: RootState) => 
    state.wishlist.pastWishlists.find((wishlist) => wishlist.id === parseInt(id)))

  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()

  if (id === undefined || wishlist === undefined) return <NotFound/>

  return (
    <Container>
      <Toolbar className={classes.buttonGroup}>
        <Button color="primary" variant="contained"
          onClick={() => {
            history.push('/')
          }}
          endIcon={<ArrowBackIosIcon />}
        >Back</Button>
        <div className={classes.flexGrow}></div>
      </Toolbar>
      <Toolbar className={clsx(classes.flexCenter, classes.toolbar)}>
        <Typography align="center" variant="h3">{wishlist.title}</Typography>
      </Toolbar>
      <Button fullWidth>
        <div className={classes.flexGrow}></div>
        <Typography>Created at: {new Date(wishlist.createdDate).toDateString()}</Typography>
      </Button>
      <Button fullWidth>
        <div className={classes.flexGrow}></div>
        <Typography>Last Updated at: {new Date(wishlist.updatedDate).toDateString()}</Typography>
      </Button>
      <Container>
          {wishlist.items.map((item) => {
            return <PastWishItemCard key={item.id} id={item.id} wid={parseInt(id)} />
          })}
      </Container>
      
    </Container>
  )
}

