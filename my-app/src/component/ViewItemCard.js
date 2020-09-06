import React, { useState } from 'react';

import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import CheckIcon from '@material-ui/icons/Check';
import HoverBox from './HoverBox';
import { useDispatch } from 'react-redux';
import { toggleItemStatus } from '../redux';

const styleCard = {
    height: "50px",
    padding:"0 8%",
    borderBottom: "1px solid black",
    display:"flex",
}
const styleCardHovered = {
    ...styleCard,
    background: "#DCDCDC"
}

const styleIconFrame = {
    width:"40px",
    margin: "0 20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    
}
const styleIcon = {
    position: "absolute",
    fontSize: "30px",
    fill:"#CCCCCC",
}
const styleIconNotSelected = {
    ...styleIcon,
    fill: "none",
}
const styleIconSelected = {
    ...styleIcon,
    fill: "green",
}
const styleTickNotSelected = {
    ...styleIconNotSelected,

    fontSize: "20px"
}
const styleTickSelected = {
    ...styleTickNotSelected,
    fill: "black",
}

const styleItem = {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    textAlign: "left",
    fontSize: "25px",
    userSelect: "none",
}

const ViewItemCard = (props) => {
    const [isCardClicked, setCardClicked] = useState(props.status);
    const dispatch = useDispatch()
    return (
    <HoverBox
        defaultStyle={styleCard}
        hoveredStyle={styleCardHovered}
        onClickF={()=>{
            setCardClicked(! isCardClicked)
            dispatch(toggleItemStatus(props.wid, props.iid))
        }}
    >
        <div style={styleIconFrame}>
            <RadioButtonUncheckedIcon style={styleIcon} />
            <FiberManualRecordIcon style={isCardClicked ? styleIconSelected : styleIconNotSelected} />
            <CheckIcon style={isCardClicked ? styleTickSelected : styleTickNotSelected}/>
        </div>
        <div style={styleItem}>{props.name}</div>
    </HoverBox>
    )
}

export default ViewItemCard