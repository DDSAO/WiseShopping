import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { toggleMenu, jumpTo } from '../redux';
import { useHistory } from 'react-router-dom';
import { displayCenter } from '../css/css';

import {TimelineLite, Power4} from "gsap/all"

import HoverBox from './HoverBox';

const styleShow = {
    position: "fixed",
    height: "95%",
    top:"5%",
    display: "block",
    zIndex: 10,
}
const styleHide = {
    display: "none"
}


const styleMenu = {
    width:"300px",
    height: "95%",
    position: "fixed",
    top: "5%",
    left:"-300px",
    background: "inherit",
    borderRight: "1px solid black",
    backdropFilter: "blur(20px)",

}
const styleSide = {
    width: "100%",
    height: "95%",
    position: "fixed",
    top: "5%",
    background: "#DCDCDC",
    opacity: "80%",
}
const styleMenuBar = {
    ...displayCenter,
    height: "50px",
    marginTop: "5px",
    userSelect: "none",
}
const styleMenuBarCurrent = {
    ...styleMenuBar,
    background: "grey",
}
const styleMenuBarHovered = {
    ...styleMenuBar,
    background:"black",
    color: "white",
}

const NavMenuBar = (props) => {
    const currentPage = useSelector(state => state.interface.currentPage)
    const history = useHistory()
    const dispatch = useDispatch()
    return (
        <HoverBox
            defaultStyle={currentPage === props.pageName ? styleMenuBarCurrent: styleMenuBar}
            hoveredStyle={styleMenuBarHovered}
            onClickF={()=>{
                history.push(props.redirectLink)
                dispatch(jumpTo(props.pageName))
                dispatch(toggleMenu())
            }}
        >{props.displayName}</HoverBox>
    )
}

const NavMenu = () => {
    const showMenu = useSelector(state => state.interface.showMenu)
    const dispatch = useDispatch()
    const t1 = useRef(null)
    const menuRef = useRef(null)
    const sideRef = useRef(null)

    useEffect(()=>{
        t1.current = new TimelineLite({paused:true})
            .fromTo(menuRef.current, 1, {css:{left:"-300px"}}, {css:{left:"0"}, ease:"Power4.eastOut"})
            .fromTo(sideRef.current, 1, {css:{left:0}}, {css:{left:"300px"}, ease:"Power4.eastOut"}, "-=1")
    }, [])

    useEffect(()=>{
        if (t1.current && showMenu) {
            t1.current.restart()
        } 
    }, [showMenu])
    

    return (
    <div style={showMenu ? styleShow: styleHide}>
        <div ref={menuRef} style={styleMenu}>
            <NavMenuBar pageName="home" displayName="Home" redirectLink="/"/>
            <NavMenuBar pageName="addNewWishlist" displayName="Add New Wishlist" redirectLink="/addNewWishlist"/>
            <NavMenuBar pageName="pastWishlists" displayName="View Past Wishlist" redirectLink="/pastWishlists"/>
        </div>
        <div ref={sideRef} style={styleSide} onClick={()=>dispatch(toggleMenu())}>
        </div>
    </div>)
}

export default NavMenu