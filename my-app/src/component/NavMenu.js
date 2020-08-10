import React from 'react';

const style = {
    width: "250px",
    height: "95%",
    position: "fixed",
    top: "5%",
    background: "white",
    border: "1px solid black",

}

const showMenu = useSelector(state => state.interface.showMenu)

const NavMenu = () => {
    if (showMenu) {
        return (
            <div style={style}>
                This is the nav Menu
            </div>
        )
    } 
}

export default NavMenu