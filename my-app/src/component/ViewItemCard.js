import React, { useState } from 'react';

import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import HoverBox from './HoverBox';

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

const styleItem = {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    textAlign: "left",
    fontSize: "25px",
    userSelect: "none",
}

const ViewItemCard = (props) => {
    const [isCardClicked, setCardClicked] = useState(false);

    return (
    <HoverBox
        defaultStyle={styleCard}
        hoveredStyle={styleCardHovered}
        onClickF={()=>setCardClicked(! isCardClicked)}
    >
        <div style={styleIconFrame}>
            <RadioButtonUncheckedIcon style={styleIcon} />
            <FiberManualRecordIcon style={isCardClicked ? styleIconSelected : styleIconNotSelected} />
        </div>
        <div style={styleItem}>{props.name}</div>
    </HoverBox>
    )
}

export default ViewItemCard