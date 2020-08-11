import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { toggleMenu } from '../redux/interface/interfaceActions';

import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

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
    const [isHovered, setHovered] = useState(false)
    const dispatch = useDispatch()
    return ( 
    <div style = {styleLeft}>
        <span
            style = {isHovered ? styleIconHovered : styleIcon}
            onMouseEnter = {() => setHovered(true)}
            onMouseLeave = {() => setHovered(false)}
            onClick = {() => dispatch(toggleMenu())}
        >
            <MenuIcon/>
        </span>
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