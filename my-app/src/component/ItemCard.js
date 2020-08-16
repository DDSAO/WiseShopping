import React from 'react';
import HoverBox from './HoverBox';

const styleCard = {
    width: "60%",
    height: "40px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

}
const styleLabel = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
}
const styleIcon = {
    height: "30px",
    width: "30px",
    borderRadius:"10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    userSelect: "none",
}
const styleIconHovered = {
    ...styleIcon,
    background: "#DCDCDC",
}
const ItemCard = (props) => {
    return (
        <div style={styleCard}>
            <div style={styleLabel}>{props.index}.  {props.name}</div>
            <HoverBox 
                defaultStyle={styleIcon} 
                hoveredStyle={styleIconHovered}
                onClickF={props.onClickF}
            >❌</HoverBox>
        </div>
    )
}

export default ItemCard