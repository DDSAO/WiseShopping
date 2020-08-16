import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleMenu } from '../redux';

const style={
    height: "95%",
    position: "fixed",
    top: "5%",
    zIndex: 10,
}

const styleMenu = {
    width:"30%",
    height: "95%",
    position: "fixed",
    top: "5%",
    background: "white",
    border: "1px solid black",

}
const styleSide = {
    width: "70%",
    height: "95%",
    position: "fixed",
    top: "5%",
    left: "30%",
    background: "#DCDCDC",
    opacity: "80%",

}

const NavMenu = () => {
    const showMenu = useSelector(state => state.interface.showMenu)
    const dispatch = useDispatch()

    if (showMenu) {
        return (
            <div style={style}>
                <div style={styleMenu}>
                    this is the nav Menu
                </div>
                <div style={styleSide} onClick={()=>dispatch(toggleMenu())}>

                </div>
                
            </div>
        )
    } else {
        return null
    }
}

export default NavMenu