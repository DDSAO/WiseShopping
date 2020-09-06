import React from 'react';
import { useDispatch } from 'react-redux';
import { removeWishlist, showNotification, hideNotification, jumpTo } from '../redux'

//icons
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';
import HoverBox from './HoverBox';
import { useHistory } from 'react-router-dom';



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
    background:"inherit",
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
    backgroundColor: "rgba(0,0,255,0.8)"
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
    backgroundColor: "rgba(255,0,0,0.8)"
}

const styleIcon = {
    fontSize: "16",
}

const CardStatus = (props) => {
    const history = useHistory()
    const dispatch = useDispatch()

    const confirmDelete = () => {
        dispatch(showNotification(
            (<div>Are you sure to delete {"<<"+props.name+">>"} ?</div>)
        ,
        "No",
        ()=>dispatch(hideNotification()),
        "Sure",
        ()=>{
            dispatch(removeWishlist(props.wid))
            dispatch(hideNotification())
        }))
    }
    return (
        <div style={style}>

            <HoverBox
                defaultStyle={styleLeft}
                hoveredStyle={styleLeftHovered}
                onMouseEnterF={()=>{props.setBorderColor("rgba(0,119,187,0.6)")}}
                onMouseLeaveF={()=>{props.setBorderColor("rgba(0, 177, 106, 0.6)")}}
                onClickF={e=>{
                    e.stopPropagation()
                    history.push('/editWishlist/'+props.wid)
                    dispatch(jumpTo("editWishlist"))
                }}
            >
                <EditIcon style={styleIcon}/>
            </HoverBox>
            <HoverBox
                defaultStyle={styleRight}
                hoveredStyle={styleRightHovered}
                onMouseEnterF={()=>{props.setBorderColor("rgba(200,50,0,0.6)")}}
                onMouseLeaveF={()=>{props.setBorderColor("rgba(0, 177, 106, 0.6)")}}
                onClickF = {e => {
                    e.stopPropagation()
                    confirmDelete()
                }}
            >
                <DeleteOutlined style={styleIcon} />
            </HoverBox>
                
        </div>
    )
}

export default CardStatus