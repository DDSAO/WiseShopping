import React from 'react';
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
import { useModalHook } from './ModalHook';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type ConfirmPopUpProps = {
  popUpButton: string,
  color?: "primary" | "secondary",
  variant?: "contained"|"outlined",
  rootStyle?: object,
  title: string,
  content: string,
  confirmButton: string,
  rejectButton: string,
  confirmF?: () => any,
  rejectF?: () => any,
}



export const ConfirmPopUp = (props: ConfirmPopUpProps) => {
  const [modal, setModalOpen] = useModalHook(props)
  return (
    <div style={props.rootStyle? props.rootStyle : undefined}>
      <Button 
        variant={props.variant? props.variant: "text"} color={props.color ? props.color : "default"}
        onClick={() => setModalOpen(true)}
      >{props.popUpButton}</Button>
      {modal}
    </div>
  );
}
