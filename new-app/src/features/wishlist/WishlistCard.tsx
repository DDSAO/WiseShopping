import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { green, red, blue } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CardActionArea from '@material-ui/core/CardActionArea';
import { deleteWishlist, WishItem, Wishlist } from './wishlistSlice';
import { Divider, Hidden, Menu, Tooltip, Button } from '@material-ui/core';
import  MenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';


import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreIcon from '@material-ui/icons/MoreVert';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { ConfirmPopUpIcon } from '../popUp/ConfirmPopUpIcon';
import { ConfirmPopUp } from '../popUp/ConfirmPopUp';
import { useModalHook } from '../popUp/ModalHook';





const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 284,
      //height: 250,
      margin: theme.spacing(1),
    },
    avatar: {
      backgroundColor: red[500],
    },
    buttonGroup : {
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      marginTop: theme.spacing(2),
    },
    editButton: {
      marginRight: theme.spacing(1)
    },
    contentContainer: {
      padding: 0,
      overflow: "scroll",
    },
    flexGrow: {
      flexGrow: 1,
    },
    red: {
      backgroundColor: red[100],
    },
    blue: {
      backgroundColor: blue[100],
    },
    green: {
      backgroundColor: green[100],
    },
    fullWidth: {
      width: "100%"
    }
  }),
);

type WishlistCardProps = {
  data: Wishlist,
  onClickF: () => void,
  disabled?: boolean,
}

type CardItemProps = {
  title: String
  checked: boolean
}

const CardItem = (props: CardItemProps) => {
  return (
  <ListItem>
    <ListItemIcon>
      {props.checked ? <CheckBoxIcon style={{ color: green[500] }}/> : <CheckBoxOutlineBlankIcon/>}
    </ListItemIcon>
    <ListItemText primary={props.title} />
  </ListItem>
)}

export const WishlistCard = (props: WishlistCardProps ) => {

  const { data } = props
  const createdDate = new Date(data.createdDate)
  const classes = useStyles();
  const [openMenu, setOpenMenu] = useState(false);
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const [extend, setExtend] = useState(false)
  const history = useHistory()
  const dispatch = useDispatch()

  const [renderModal, setModalOpen] = useModalHook({
    title:`Delete ${data.title}`,
    content:"Are you sure you want to remove this wishlist?",
    confirmButton:"yes", 
    rejectButton:"No",
    confirmF: () => {dispatch(deleteWishlist({wid: data.id}))}
  })

  const MobileMenu = () => (
    <Menu
      anchorEl={anchor}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={`menu-${data.id}`}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={openMenu}
      onClose={() => {
        setOpenMenu(false)
        setModalOpen(false)
        setAnchor(null)
      }}
    >
      <MenuItem dense  onClick={() => history.push(`/edit/${data.id}`)}>
        <IconButton aria-label="edit" color="inherit" size="small">
          <EditIcon/>
        </IconButton>
        <p>Edit</p>
      </MenuItem>
      <MenuItem dense onClick={(e) => {
        setOpenMenu(false)
        setAnchor(null)
        setModalOpen(true) 
      }}>
        <IconButton aria-label="edit" color="inherit" size="small">
          <DeleteIcon/>
        </IconButton>
        <p>Delete</p>
      </MenuItem>
      {renderModal}
    </Menu>
  );


  return (
    <Card className={
      clsx({
        [classes.root]: true,
        [classes.red]: data.color? data.color === "red" : false,
        [classes.blue]: data.color? data.color === "blue" : false,
        [classes.green]: data.color? data.color === "green" : false,
      })}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {data.title.charAt(0)}
          </Avatar>
        }
        action={
          <div>
            <div className={classes.buttonGroup}>
              <Hidden mdDown>
                <Tooltip title="Edit" className={classes.editButton}>
                  <IconButton size="small"  onClick={() => history.push(`/edit/${data.id}`)}>
                    <EditIcon color="primary"/>  
                  </IconButton>
                </Tooltip>
                
                <ConfirmPopUpIcon popUpButton={ <DeleteIcon style={{color: red[500]}}/>} size="small"
                  title={`Delete ${data.title}`}
                  content="Are you sure you want to remove this wishlist?"
                  confirmButton="yes" rejectButton="No"
                  confirmF={() => {dispatch(deleteWishlist({wid: data.id}))}}
                />
                
              </Hidden>
            </div>
            <div>
              <Hidden mdUp>
                <IconButton
                aria-label="show more"
                aria-controls={`menu-${data.id}`}
                aria-haspopup="true"
                onClick={(e: React.MouseEvent<HTMLElement>) => {
                  setAnchor(e.currentTarget);
                  setOpenMenu(true);
                }}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
              <MobileMenu />
              </Hidden>         
            </div>      
          </div>
        }
        title={data.title}
        subheader={createdDate.toDateString()}
      />
      <Divider variant="middle" />
      <CardActionArea onClick={() => {
        history.push(`/view/${data.id}`)
      }}>
        <CardContent className={classes.contentContainer}>
          <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          className={classes.flexGrow}
          dense
          >
            {data.items.map((item: WishItem, index) => {
              if (index < 4) {
                return <CardItem key={index} title={item.name} checked={item.checked}/>
              }
            })}
          <Collapse in={extend} timeout="auto" unmountOnExit>
            <List component="div" disablePadding dense>
              {data.items.map((item: WishItem, index) => {
                if (index >= 4) {
                  return <CardItem key={index+4} title={item.name} checked={item.checked}/>
                }
              })}
            </List>
          </Collapse>
        </List>
        </CardContent>
      </CardActionArea>
      
      
      <Collapse className={classes.fullWidth} in={data.items.length > 4}>
        <Divider variant="middle"/>
        <CardActions> 
          <Button onClick={()=>setExtend(!extend)} fullWidth>
            {extend ? "Hide" :"Show More" }
            {extend ?  <ExpandLess /> : <ExpandMore />}
          </Button>
        </CardActions>
      </Collapse>
        
     
    </Card>
  );
}
