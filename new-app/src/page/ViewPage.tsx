
import { Container, makeStyles, createStyles, Typography, Toolbar, Button, ButtonGroup } from '@material-ui/core'
import React from 'react'
import clsx from 'clsx'
import { useHistory, useParams } from 'react-router';
import { RootState } from '../redux/store'
import { WishItem, Wishlist } from '../features/wishlist/wishlistSlice'
import { useDispatch, useSelector } from 'react-redux';
import { NotFound } from './NotFound';
import { WishItemCard } from '../features/wishlist/WishItemCard';
import { ConfirmPopUp } from '../features/popUp/ConfirmPopUp';

import { finishWishlist } from '../features/wishlist/wishlistSlice'


const useStyles = makeStyles((theme) => createStyles({
  root: {
    marginBottom: theme.spacing(3),
  },
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

export const ViewPage = () => {

  const { id } = useParams<ViewParams>();

  const wishlist: Wishlist|undefined = useSelector((state: RootState) => 
    state.wishlist.wishlists.find((wishlist) => wishlist.id === parseInt(id)))

  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()

  if (id === undefined || wishlist === undefined) return <NotFound/>

  return (
    <Container className={classes.root}>
     
      <Toolbar className={clsx(classes.flexCenter, classes.toolbar)}>
        <Typography align="center" variant="h3">{wishlist.title}</Typography>
      </Toolbar>
      <Button fullWidth>
        <div className={classes.flexGrow}></div>
        <Typography>Created at: {new Date(wishlist.createdDate).toDateString()}</Typography>
      </Button>
      <Button fullWidth>
        <div className={classes.flexGrow}></div>
        <Typography>Updated at: {new Date(wishlist.updatedDate).toDateString()}</Typography>
      </Button>
      <Container>
          {wishlist.items.map((item) => {
            return <WishItemCard key={item.id} id={item.id} wid={parseInt(id)} />
          })}
      </Container>
      <Toolbar className={classes.buttonGroup}>
        <Button color="primary" variant="contained"
          onClick={() => {
            history.push('/')
          }}
        >Back</Button>
        <ConfirmPopUp variant="contained" popUpButton="Finish" color="primary"
        title={`Finish ${wishlist.title}`}
        content={`Once finish the wishlist, this wishlist will be marked as finished and moved to past wishlists. Are you sure to do so?`}
        confirmButton="Sure" rejectButton="Not yet"
        confirmF={() => {
          dispatch(finishWishlist({wid: wishlist.id}))
          history.push('/')
        }}
        rejectF={() => {}}
        ></ConfirmPopUp>
        
      </Toolbar>
    </Container>
  )
}

