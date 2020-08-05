import React from 'react';

import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const data = {
    name: "ddsao"
}

const style = {
    height: "5%",
    backgroundColor: "white",
    display: "flex",
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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0px 16px"
}

const LeftContainer = () => {
    return ( 
    <div style={styleLeft}>
        <span style={styleIcon}><MenuIcon/></span>
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
    return ( 
        <div style={style}>
            <LeftContainer />
            <RightContainer name={data.name}/>
        </div>
    );
}
 
export default Navigation;