import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { toggleMenu } from '../redux/interface/interfaceActions';

import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { addExample } from '../redux/wishlist/wishlistActions';
import HoverBox from './HoverBox';
const data = {
    name: "ddsao"
}

const style = {
    height: "5%",
    backgroundColor: "white",
    display: "flex",
    borderBottom: "1px solid black"
}
const styleLeft = {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
}

const styleRight = {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
}

const styleIcon = {
    width:"50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0px 10px",
    padding: "5px",
    background: "white",
    borderRadius: "5px",

}
const styleIconHovered = {
    ...styleIcon,
    background: "#DCDCDC",
}

const LeftContainer = () => {
    const dispatch = useDispatch()
    return ( 
    <div style = {styleLeft}>
        <HoverBox
            defaultStyle={styleIcon}
            hoveredStyle={styleIconHovered}
            onClickF={() => dispatch(toggleMenu())}
        >
            <MenuIcon/>
        </HoverBox>
    </div> );
}

const RightContainer = (prop) => {
    return ( 
    <div style={styleRight}>
        <p>Welcome, {prop.name}</p>
        <span style={styleIcon}><AccountCircleIcon/></span>
    </div> 
    );
}

const Navigation = () => {

    const dispatch = useDispatch()
    useEffect(() => {dispatch(addExample())}, [])


    return ( 
        <div style={style}>
            <LeftContainer />
            <RightContainer name={data.name}/>
        </div>
    );
}
 
export default Navigation;