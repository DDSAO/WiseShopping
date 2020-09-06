import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { toggleMenu } from '../redux/interface/interfaceActions';

import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { addExample } from '../redux/wishlist/wishlistActions';
import HoverBox from './HoverBox';

const backgroundColor = "rgba(255,255,255,0.5)"

const data = {
    name: "ddsao"
}

const style = {
    position: "fixed",
    top:"0",
    height: "5%",
    background: "inherit",
    display: "flex",
    borderBottom: "1px solid black",
    backdropFilter: "blur(20px) saturate(80%)",
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
    background: "inherit",
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
        <HoverBox
            defaultStyle={styleIcon}
            hoveredStyle={styleIconHovered}
            onClickF={() => alert('user')}
        >
            <AccountCircleIcon/>
        </HoverBox>
    </div> 
    );
}

const Navigation = () => {

    const dispatch = useDispatch()
    //useEffect(() => {dispatch(addExample())}, [])

    return ( 
        <div style={style}>
            <LeftContainer />
            <RightContainer name={data.name}/>
        </div>
    );
}
 
export default Navigation;