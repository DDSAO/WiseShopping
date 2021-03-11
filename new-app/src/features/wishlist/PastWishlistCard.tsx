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
import { WishItem, Wishlist } from './wishlistSlice';
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

type PastWishlistCardProps = {
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
      {props.checked ? <CheckBoxIcon/> : <CheckBoxOutlineBlankIcon/>}
    </ListItemIcon>
    <ListItemText primary={props.title} />
  </ListItem>
)}

export const PastWishlistCard = (props: PastWishlistCardProps ) => {

  const { data } = props
  const createdDate = new Date(data.createdDate)
  const classes = useStyles();
  const [openMenu, setOpenMenu] = useState(false);
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const [extend, setExtend] = useState(false)
  const history = useHistory()

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
        setAnchor(null)
      }}
    >
      <MenuItem dense>
        <IconButton aria-label="edit" color="inherit" size="small">
          <EditIcon/>
        </IconButton>
        <p>Edit</p>
      </MenuItem>
      <MenuItem dense>
        <IconButton aria-label="delete" color="inherit" size="small">
          <DeleteIcon/>
        </IconButton>
        <p>Delete</p>
      </MenuItem>
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
          <div className={classes.buttonGroup}>      
              <Tooltip title="Delete">  
                <IconButton size="small">
                  <DeleteIcon color="secondary"/>
                </IconButton>
              </Tooltip>
          </div>     
        }
        title={data.title}
        subheader={createdDate.toDateString()}
      />
      <Divider variant="middle" />
      <CardActionArea onClick={() => {
        history.push(`/past/${data.id}`)
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
