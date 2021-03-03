import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom";

//icon
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import HistoryIcon from '@material-ui/icons/History';
import TitleIcon from '@material-ui/icons/Title';
import EditIcon from '@material-ui/icons/Edit';

import { RootState } from '../../redux/store';
import { createStyles } from '@material-ui/styles';
import { Container, makeStyles, Toolbar, Tooltip, Typography, IconButton, Divider } from '@material-ui/core';
import { WishlistCard } from './WishlistCard';


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
  }
}))

export const WishlistContainer = () => {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()
  const wishlists = useSelector((state: RootState) => state.wishlist.wishlists)
  //const draft = useSelector(state => state.wishlist.newWishlist)
  //const user = useSelector(state => state.interface.user)
  const containerRef = useRef(null)
  const [column, setColumn] = useState(1)

  useEffect(()=> {
    let width = (containerRef.current as any).offsetWidth
    if (width > 300) {
       setColumn(Math.floor(width / 300))
    }
    console.log(column)
  }, [])

  const DynamicContainer = () => {
    if (Object.keys(wishlists).length === 0) return null
    return (
      <Container className={classes.container}>
        {Array(column).fill(0).map((num, index) => {
          return (
          <div id={`column-${index}`}>
            {Object.values(wishlists).map((wishlist, i) => {
              if (i % column === index) {
                return <WishlistCard 
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
    if (column === 3) {
      return (
        <Container className={classes.container}>
          <div id="column-1">
            {Object.values(wishlists).map((wishlist, index) => {
              if (index % 3 === 0) {
                return <WishlistCard 
                  key={wishlist.id} 
                  data={wishlist}
                  onClickF={()=>{
                    console.log('clicked')
                  }}/>}
            })}
          </div>
          <div id="column-2">
            {Object.values(wishlists).map((wishlist, index) => {
              if (index % 3 === 1) {
                return <WishlistCard 
                  key={wishlist.id} 
                  data={wishlist}
                  onClickF={()=>{
                    console.log('clicked')
                }}/>}
            })}
          </div>
          <div id="column-3">
            {Object.values(wishlists).map((wishlist, index) => {
              if (index % 3 === 2) {
                return <WishlistCard 
                  key={wishlist.id} 
                  data={wishlist}
                  onClickF={()=>{
                    console.log('clicked')
                }}/>}
            })}
          </div>
        </Container> 
      )
    } 
    return null
  }
  

  return (  
    <div className={classes.root}>
    <Toolbar>
      <Typography variant="h5">My Wishlists</Typography>
      <div className={classes.grow}></div>
      <Typography>Filter By:</Typography>
      <Tooltip title="Title"><IconButton><TitleIcon/></IconButton></Tooltip>/
      <Tooltip title="Created Time"><IconButton><HistoryIcon /></IconButton></Tooltip>/
      <Tooltip title="Updated Time"><IconButton><EditIcon /></IconButton></Tooltip>
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
 
