import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom";
import clsx from 'clsx'
//icon
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import HistoryIcon from '@material-ui/icons/History';
import TitleIcon from '@material-ui/icons/Title';
import EditIcon from '@material-ui/icons/Edit';

import { RootState } from '../../redux/store';
import { createStyles } from '@material-ui/styles';
import { Container, makeStyles, Toolbar, Tooltip, Typography, IconButton, Divider } from '@material-ui/core';
import { PastWishlistCard } from './PastWishlistCard';
import { Wishlist } from './wishlistSlice';
import  SearchIcon  from '@material-ui/icons/Search';
import  InputBase  from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles';
import { SvgIconProps } from "@material-ui/core/SvgIcon";


const useStyles = makeStyles((theme) => createStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  grow: {
    flexGrow: 1,
  },
  container: {
    width: "100%",
    padding: "2%",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    flexWrap : "wrap",
    overflow: "scroll",
  },
  cardIcon: {
    color: "#555555",
    fontSize: "70",
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.primary.light, 0.25),
    '&:hover': {
      backgroundColor: fade(theme.palette.primary.light, 0.15),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },  
  },
  filterButton: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
  focused: {
    background: fade(theme.palette.primary.light, 0.25),
  }
}))

type ReOrderFunction = (wishlists: Wishlist[]) => Wishlist[]

const defualtReorderFunction: ReOrderFunction = (wishlists) => {
  return wishlists
}
const titleReorderFunction: ReOrderFunction = (wishlists) => {
  return wishlists.sort((a,b) => a.title.localeCompare(b.title))
}
const createdReorderFunction: ReOrderFunction = (wishlists) => {
  return wishlists.sort((a,b) => b.createdDate - a.createdDate)
}
const updatedReorderFunction:  ReOrderFunction = (wishlists) => {
  return wishlists.sort((a,b) => b.updatedDate - a.updatedDate)
}

type FilterButtonProps = {
  title: string
  description: string,
  reorderF: ReOrderFunction,
  icon: React.ReactElement<SvgIconProps>,
}

type WishlistContainerProps = {
  wishlists: Wishlist[],
  title: string,
}
export const PastWishlistContainer = (props: WishlistContainerProps) => {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()
  const { wishlists, title } = props
  //const wishlists = useSelector((state: RootState) => state.wishlist.wishlists)
  //const draft = useSelector(state => state.wishlist.newWishlist)
  //const user = useSelector(state => state.interface.user)
  const containerRef = useRef(null)
  const [column, setColumn] = useState(1)
  const [reorder, setReorderF] = useState<ReOrderFunction>(() => titleReorderFunction)
  const [orderBy, setOrderBy] = useState("title")
  const [searchWord, setSearchWord] = useState("")
 
  useEffect(()=> {
    let width = (containerRef.current as any).offsetWidth
    if (width > 300) {
       setColumn(Math.floor(width / 300))
    }
  }, [])

  useEffect(() => {
    
  }, [reorder])

  const FilterButton = (props: FilterButtonProps) => (
    <Tooltip title={props.description}>
      <IconButton 
        className={clsx({
          [classes.filterButton] : true,
          [classes.focused] : orderBy === props.title
        })}
        onClick={() => {
          setReorderF(() => props.reorderF)
          setOrderBy(props.title)
        }}
        size="small"
        >
        {props.icon}
      </IconButton>
    </Tooltip>
  )

  const DynamicContainer = () => {
    if (Object.keys(wishlists).length === 0) return null

    return (
      <Container className={classes.container}>
        {Array(column).fill(0).map((num, index) => {
          return (
          <div id={`column-${index}`} key={index}>
            {Object.values(reorder(wishlists.filter((wishlist) => {
              return wishlist.title.toLowerCase().includes(searchWord) || 
                wishlist.items.some((item) => {return item.name.toLowerCase().includes(searchWord)})
            }))).map((wishlist, i) => {
              if (i % column === index) {
                return <PastWishlistCard 
                  key={wishlist.id} 
                  data={wishlist}
                  onClickF={()=>{
                    console.log('clicked')
              }}/>}
            })}
          </div>
          )
        })}
      </Container>
    )
  }
  

  return (  
    <div className={classes.root}>
    <Toolbar>
      <Typography variant="h5">{title}</Typography>
      <div className={classes.grow}></div>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
          onChange={(e) => setSearchWord(e.target.value.trim().toLowerCase())}
        /> 
      </div>
      <Typography>Filter By:</Typography>
      <FilterButton 
        title="title" description="Title" 
        reorderF={titleReorderFunction} icon={<TitleIcon />}/>/
      <FilterButton 
        title="created" description="Created Time" 
        reorderF={createdReorderFunction} icon={<HistoryIcon />}/>/
      <FilterButton 
        title="updated" description="Updated Time" 
        reorderF={updatedReorderFunction} icon={<EditIcon />}/>
    </Toolbar>
    <Divider variant="middle"/>
    <div ref={containerRef}>
      <DynamicContainer />
    </div>
      
    </div>
  );
}
/*
{! Object.keys(wishlists).length ? "" : 
        Object.values(wishlists).map((wishlist, index) => 
          <WishlistCard 
            key={wishlist.id} 
            data={wishlist}
            onClickF={()=>{
              console.log('clicked')
            }}
          />
        )}
*/
 
