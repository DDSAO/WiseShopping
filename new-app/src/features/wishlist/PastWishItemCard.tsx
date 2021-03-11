import { Button, Checkbox, createStyles, makeStyles, Paper, Typography, IconButton } from '@material-ui/core';
import { CheckboxProps } from '@material-ui/core/Checkbox';

import React, { useState } from 'react'

import { removeItem, toggleCheck, WishItem, Wishlist } from './wishlistSlice';

import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { green, red, grey } from '@material-ui/core/colors';
import { ConfirmPopUp } from '../popUp/ConfirmPopUp';
import { ConfirmPopUpIcon } from '../popUp/ConfirmPopUpIcon';




const useStyles = makeStyles((theme) => createStyles({
  root: {
    display: "flex",
    flexDirection: "row", 
    alignItems: "center",
    justifyContent: "stretch",
    marginTop: theme.spacing(0.5)
  },
  container: {
    display: "flex",
    flexDirection: "row", 
    justifyContent: "space-between",
    alignItems: "center",
    userSelect: "none",
   
  },
  text: {
    width: "100%",
    textAlign:"center",
  }
}))

type PastItemCardProps = {
  id: number,
  wid: number,
}

const GreyCheckbox = withStyles({
  root: {
    '&$checked': {
      color: grey[500],
    },
  },
  checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);


export const PastWishItemCard = (props: PastItemCardProps) => {
  const { id, wid } = props
  const item = useSelector((state: RootState) => ((state.wishlist.pastWishlists.find((wishlist) => wishlist.id === wid))! as Wishlist)
    .items.find((item) => item.id === id) as WishItem)

  const classes =  useStyles() 

  return (
    <Paper elevation={3} className={classes.root}>
      <Button className={classes.container} fullWidth>
        <GreyCheckbox checked={item.checked}></GreyCheckbox>
        <Typography className={classes.text}>{item.name}</Typography>
      </Button>
      
    </Paper>
  )
}