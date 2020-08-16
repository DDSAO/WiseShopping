import React from 'react';
import { useDispatch } from 'react-redux';
import { removeWishlist } from '../redux'

//icons
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';
import HoverBox from './HoverBox';



const borderRadius = "10px"

const style = {
    position: "relative",
    top: "-5px",
    left: "5px",
    width: "100px",
    height: "25px",
    border: "1px solid black",
    borderRadius: borderRadius,
    float: "right",
    display: "flex",
}

const styleLeft = {
    width:"50px",
    borderRight: "1px solid black",
    borderTopLeftRadius: borderRadius,
    borderBottomLeftRadius: borderRadius,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}

const styleLeftHovered = {
    ...styleLeft,
    backgroundColor: "#ACACAC"
}

const styleRight = {
    ...styleLeft,
    borderTopLeftRadius: "0",
    borderBottomLeftRadius: "0",
    borderTopRightRadius: borderRadius,
    borderBottomRightRadius: borderRadius,
    borderRight: "none",
}

const styleRightHovered = {
    ...styleRight,
    backgroundColor: "#ACACAC"
}

const styleIcon = {
    fontSize: "16",
}

const CardStatus = (props) => {

    const dispatch = useDispatch()
    return (
        <div style={style}>

            <HoverBox
                defaultStyle={styleLeft}
                hoveredStyle={styleLeftHovered}
            >
                <EditIcon style={styleIcon}/>
            </HoverBox>
            <HoverBox
                defaultStyle={styleRight}
                hoveredStyle={styleRightHovered}
                onClickF = {e => {
                    e.stopPropagation()
                    dispatch(removeWishlist(props.wid))}}
            >
                <DeleteOutlined style={styleIcon} />
            </HoverBox>
                
        </div>
    )
}

export default CardStatus