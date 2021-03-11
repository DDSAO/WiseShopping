
import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, Theme, createStyles, withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { Button, Chip, Container, TextField, Tooltip, ButtonGroup, useMediaQuery, Switch } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';

import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';

import { WishlistCard } from '../features/wishlist/WishlistCard';
import { WishItem, Wishlist } from '../features/wishlist/wishlistSlice'
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import HelpIcon from '@material-ui/icons/Help';
import { grey, green } from '@material-ui/core/colors';
import { ConfirmPopUp } from '../features/popUp/ConfirmPopUp';
import { useHistory, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store'
import { NotFound } from './NotFound';


const drawerWidth = 400;

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    display: 'flex',
    width: "100%",
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    //marginTop: theme.spacing(8),
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  content: {
    //flexGrow: 1,
    //padding: theme.spacing(3),
    width: "100%",
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
  wishlistBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  flexGrow: {
    flexGrow: 1,
  },
  itemsInput: {
    width: "100%",
    '& textarea': {
      minHeight: 200,
    }
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-around",
    '& button': {
      overflow: "hidden",
    }
  },
  chip: {
    margin: theme.spacing(1),
  },
  tooltipIcon: {
    color: theme.palette.primary.main,
    fontSize: "1.2em",
    marginLeft: theme.spacing(1),
  },
  colorBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
}),
  
);

const DefaultCheckbox = withStyles({
  root: {
    color: grey[400],
    '&$checked': {
      color: grey[600],
    },
  },
  checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

type EditParams = {
  id: string
}

export const EditPage = () => {

  const { id } = useParams<EditParams>();

  const wishlist: Wishlist|undefined = useSelector((state: RootState) => 
    state.wishlist.wishlists.find((wishlist) => wishlist.id === parseInt(id)))

  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md')); 
  const [open, setOpen] = useState(false);
  const [showDemo, setShowDemo] = useState(true);
  const [syncUpdate, setSyncUpdate] = useState(true)
  const [asyncItems, setAsyncItems] = useState<WishItem[]>(wishlist ? wishlist.items : []);
  const [showColor, setShowColor] = useState(true);
  const [cardColor, setCardColor] = useState<Wishlist["color"]>(wishlist? wishlist.color: "default");

  const [title, setTitle] = useState(wishlist? wishlist.title : "")
  const [rawItems, setRawItems] = useState(wishlist? wishlist.items.map((item) => {return item.name}).join("\n") : "")

  const [items, setItems] = useState<WishItem[]>(wishlist? wishlist.items: []);
  const [inputing, setInputing] = useState(false)

  const rawItemsRef = useRef(null)

  const RenderItems = () => {
    if (syncUpdate) {
      return (
        <div>
          {items.map((item) => <Chip className={classes.chip} variant="outlined" color="primary" size="small" label={`${item.id + 1}. ${item.name}`} key={item.id}/>)}
        </div>
      )
    } else {
      return (
        <div>
          {asyncItems.map((item, index) =>  <Chip className={classes.chip} variant="outlined" color="primary" size="small" label={item.name} key={item.id}/>)}
        </div>
      )
    }  
  }

  if (id === undefined || wishlist === undefined) return <NotFound/>

  return (
    <div className={classes.root}>
      <CssBaseline />
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}>
        <Toolbar>
          <Typography variant="h5">Edit Wishlist: {wishlist.title}</Typography>
          <div className={classes.flexGrow}></div>
          <Button 
            color="primary"
            variant="contained" onClick={() => setOpen(!open)}>
              {open ? "hide" : "show"} Demo {open ? <ChevronRightIcon /> : <ChevronLeftIcon />}</Button>
        </Toolbar>
        <Divider variant="middle"/>
        <Container>
          <form> 
            <List>
              <ListItem>
                <Typography>Title: </Typography>
                <div className={classes.flexGrow}></div>
                
              </ListItem>
              <ListItem>
                <TextField
                  id="title"
                  label="Title"
                  variant="outlined"
                  color="primary"
                  value={title}
                  onChange={(e) => {
                    if (e.target.value.trim() !== "") {
                      setTitle(e.target.value)
                    }}}
                />
              </ListItem>
              <ListItem>
                <Typography>Items:</Typography>
                <Tooltip title="Enter item in the text area, press Enter to seperate each items">
                  <HelpIcon className={classes.tooltipIcon} />
                </Tooltip>
              </ListItem>
              <ListItem><RenderItems/></ListItem>
              <ListItem>
                <TextField
                  inputRef={rawItemsRef}
                  className={classes.itemsInput}
                  id="rawItems"
                  label="Input Items"
                  variant="outlined"
                  color="primary"
                  multiline
                  value={rawItems}
                  onChange={(e) => {
                    setRawItems(e.target.value)
                    let itemsArray = e.target.value.split('\n')
                    let items: WishItem[] = []
                    itemsArray.filter((item) => item.trim() !== "").map((item, index) => {
                      items.push({id: index, name: item, checked: false})
                    })
                    setItems(items)
                  }}
                  onFocus={() => setInputing(true)}
                  onBlur={() => setInputing(false)}
                />
              </ListItem>
              <ListItem  className={classes.buttonGroup}>
              <ConfirmPopUp popUpButton="Cancel" color="secondary" variant="contained"
                confirmButton="Confirm" confirmF={() => history.push('/')}
                rejectButton="Back" 
                title="Leaving without saving?"
                content="Are you sure you want to leave without saving this wishlist?"
              />
              
              <ConfirmPopUp popUpButton="Edit" color="primary" variant="contained"
                confirmButton="Confirm" confirmF={() => history.push('/')}
                rejectButton="Back" 
                title={`Edit ${title}`}
                content={
                  items.length === 0 ? "The Wishlist is empty, are you sure you want to change it to an empty wishlist?" :
                  title === "" ? "The wishlist's title is empty, are you sure you want to create a wishlist without a titile?" : 
                  `Press confirm to edit this Wishlist <${title}> with ${items.length} items: ${items.map((item)=>item.name).join(', ')}.`
                }
              />
              </ListItem>
            </List> 
          </form>
        </Container>
      </main>
      <Drawer
        className={classes.drawer}
        variant={isSmallScreen ? undefined : "persistent"}
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={() => setOpen(false)}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List> 
          <ListItem button onClick={() => setSyncUpdate( !syncUpdate )}>
            <Typography>Synchronic update demo</Typography>
            <Tooltip title="Editting items will synchronically update demo">
              <HelpIcon className={classes.tooltipIcon} />
            </Tooltip>
            <div className={classes.flexGrow}></div>
            <Switch
              checked={syncUpdate}
            ></Switch>
          </ListItem>
          <Collapse in={! syncUpdate} timeout="auto" unmountOnExit>
            <ListItem>
              <div className={classes.flexGrow}></div>
              <Button variant="contained" color="primary"
              onClick={() => setAsyncItems([...items])}>Update Demo</Button>
            </ListItem>
          </Collapse>
          <Divider />
          <ListItem onClick={() => setShowDemo(! showDemo)}>
            <ListItemText primary="Demo" />      
            {showDemo ? <ExpandLess /> : <ExpandMore />}    
          </ListItem>
          <Divider />
          <Collapse in={showDemo} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem className={classes.wishlistBox}>
                <WishlistCard
                  data = {{
                    title: title === "" ? "Unknown" : title,
                    id: Date.now(), 
                    status: "draft",
                    items: syncUpdate ? items : asyncItems,
                    createdDate: Date.now(),
                    updatedDate: Date.now(),
                    color: cardColor,
                  }}
                  onClickF={() => {}}
                  disabled
                />
              </ListItem> 
            </List>
          <Divider />
        </Collapse>
        <ListItem onClick={() => setShowColor(! showColor)}>
          <ListItemText primary="Color" />      
          {showColor ? <ExpandLess /> : <ExpandMore />}    
        </ListItem>
        <Collapse in={showColor} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem className={classes.colorBox}>
                Grey: <DefaultCheckbox onClick={() => setCardColor("default")} checked={cardColor === "default"}></DefaultCheckbox>
                Red: <Checkbox color="secondary" onClick={() => setCardColor("red")} checked={cardColor === "red"}></Checkbox>
                Blue: <Checkbox color="primary" onClick={() => setCardColor("blue")} checked={cardColor === "blue"}></Checkbox>
                Green: <GreenCheckbox onClick={() => setCardColor("green")} checked={cardColor === "green"}></GreenCheckbox>
              </ListItem> 
            </List>
        </Collapse>
        <Divider/>
        </List>   
      </Drawer>

    </div>
  );
}

