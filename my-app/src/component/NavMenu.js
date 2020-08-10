import React from 'react';
import { useSelector } from 'react-redux';

const style = {
    width: "250px",
    height: "95%",
    position: "fixed",
    top: "5%",
    background: "white",
    border: "1px solid black",
}



const NavMenu = () => {
    const showMenu = useSelector(state => state.interface.showMenu)

    if (showMenu) {
        return (
            <div style={style}>
                This is the nav Menu
            </div>
        )
    } else {
        return null
    }
}

export default NavMenu