
import { Button, Checkbox, createStyles, makeStyles, Paper, Typography, IconButton } from '@material-ui/core';

import React, { useState } from 'react'

import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { green, red } from '@material-ui/core/colors';
import { ConfirmPopUp } from '../popUp/ConfirmPopUp';
import { ConfirmPopUpIcon } from '../popUp/ConfirmPopUpIcon';
import { NotFound } from '../../page/NotFound';




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

type ItemCardProps = {
  nid: string,
  item: number,
  createdDate: number,
}

const toDays = (second: number) => {
  return Math.floor((Date.now() - second) / (86400 * 1000 ))
}


export const NotificationCard = (props: ItemCardProps) => {
  const { nid, item, createdDate } = props

  const classes =  useStyles() 
  const dispatch = useDispatch()

  return (
    <Paper elevation={3} className={classes.root}>
      <Button className={classes.container} fullWidth>
        <Typography className={classes.text}>{`${item} is created ${toDays(createdDate)} days ago`}</Typography>
      </Button>
      <Button color="secondary"><DeleteOutlineIcon /></Button>
    </Paper>
  )
}