import React from 'react';
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
import { useModalHook } from './ModalHook';
import { CheckboxProps } from '@material-ui/core/Checkbox';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type ConfirmPopUpProps = {
  popUpButton: React.ReactElement<SvgIconProps>,
  size?: "small"|"medium",
  rootStyle?: object,
  title: string,
  content: string,
  confirmButton: string,
  rejectButton: string,
  confirmF?: () => any,
  rejectF?: () => any,
}

export const ConfirmPopUpIcon = (props: ConfirmPopUpProps) => {
  const [open, setOpen] = React.useState(false);
  const {title, content, confirmButton, rejectButton, confirmF, rejectF} = props
  const [modal, setModalOpen] = useModalHook(props)
  return (
    <div style={props.rootStyle? props.rootStyle : undefined}>
      <IconButton 
        size={props.size? props.size: undefined}
        onClick={() => setModalOpen(true)}
      >{props.popUpButton}</IconButton>
      {modal}
    </div>
  );
}
