import React, { useState } from 'react'
import { SvgIconProps } from "@material-ui/core/SvgIcon";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import { useDispatch } from 'react-redux';
import { Action } from '@reduxjs/toolkit';
import IconButton from '@material-ui/core/IconButton';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type ModalHookProps = {
  title: string,
  content: string,
  confirmButton: string,
  rejectButton: string,
  confirmF?: () => any,
  rejectF?: () => any,
}

export const useModalHook = (props: ModalHookProps) => {
  const [open, setOpen] = useState(false)

  const modal = (
    <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpen(false)}
      >
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {props.content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="secondary" onClick={()=> {
            setOpen(false);
            if (props.rejectF) {
              props.rejectF();
            }
          }}>
            {props.rejectButton}
          </Button>
          <Button variant="contained" color="primary" onClick={()=> {
            setOpen(false);
            if (props.confirmF) {
              props.confirmF();
            }
          }}>
            {props.confirmButton}
          </Button>
        </DialogActions>
      </Dialog>
  )

  return [modal, setOpen] as const
}