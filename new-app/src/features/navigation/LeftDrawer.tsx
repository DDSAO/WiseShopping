import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { toggleMenu } from './navigationSlice';

//icons
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import HomeIcon from '@material-ui/icons/Home';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import RestoreIcon from '@material-ui/icons/Restore';
import SettingsIcon from '@material-ui/icons/Settings';
import PersonIcon from '@material-ui/icons/Person';



const useStyles = makeStyles({

  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});



export const LeftDrawer = () => {
  const classes = useStyles();
  const openMenu = useSelector((state: RootState) => state.navigation.openMenu)
  const dispatch = useDispatch()

  const toggleDrawer = () => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    dispatch(toggleMenu())
  };

  const list = () => (
    <div
      className={clsx(classes.list)}
      role="presentation"
      onClick={toggleDrawer()}
      onKeyDown={toggleDrawer()}
    >
      <List>
        <ListItem button key={"back"}>
          <ListItemIcon><ArrowBackIosIcon /></ListItemIcon>
          <ListItemText primary={"Back"} />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button key={"home"}>
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary={"Home"} />
        </ListItem>
        <ListItem button key={"add"}>
          <ListItemIcon><PlaylistAddIcon /></ListItemIcon>
          <ListItemText primary={"Add Wishlist"} />
        </ListItem>
        <ListItem button key={"past"}>
          <ListItemIcon><RestoreIcon /></ListItemIcon>
          <ListItemText primary={"Past Wishlist"} />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button key={"setting"}>
          <ListItemIcon><SettingsIcon /></ListItemIcon>
          <ListItemText primary={"Setting"} />
        </ListItem>
        <ListItem button key={"user"}>
          <ListItemIcon><PersonIcon /></ListItemIcon>
          <ListItemText primary={"User"} />
        </ListItem>
      </List>
    </div>
  );

  return (
    <Drawer  anchor="left" open={openMenu} onClose={toggleDrawer()}>
      {list()}
    </Drawer>
  );
}
