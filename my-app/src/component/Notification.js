import React, {useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import HoverBox from './HoverBox';
import { hideNotification } from '../redux/interface/interfaceActions';
import { flexCenter } from '../css/css';

import Background from '../asset/background.jpg'

const style = {
    ...flexCenter,
    position: "fixed",
    top:"0",
    left: "0",
    background:"rgba(0,0,0,0.3)",
    zIndex: 5,
}
const styleNotiBox = {
    borderRadius: "20px",
    minWidth: "350px",
    width: "40%",
    height: "20%",
    border: "2px",
    background: `url(${Background})`,
    backgroundSize: "cover",
    
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
}
const styleMessageFrame = {
    padding: "20px",
    height:"70%",
    textAlign:"center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}
const styleMessage = {
    borderRadius: styleNotiBox.borderRadius,
    padding: "0 30px",
    backdropFilter: "blur(5px)"
}

const styleButtonFrame= {
    padding: "10px 0",
    height: "60px",
    marginTop: "auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
}
const styleButton = {
    ...flexCenter,
    maxWidth: "200px",
    margin:"5% 10px",
    borderRadius: "10px",
    border:"1px solid black",
    userSelect: "none",
    backdropFilter: "blur(20px)",
}
const styleButtonHovered = {
    ...styleButton,
    backdropFilter: "blur(20px) brightness(130%)",
    color:"black"
}


const Notification = (props) => {
    const notification = useSelector(state => state.interface.notification)
    const notiBox = useRef(null)
    const dispatch = useDispatch()
    if (! notification.shouldShow) {
        return null
    }
    return (
        <div style={style} onClick={e=>{
            if (! notiBox.current.contains(e.target)) {
                dispatch(hideNotification())
            }
        }}>
            <div ref={notiBox} style={styleNotiBox}>
                <div style={styleMessageFrame}>
                    <p style={styleMessage}>{notification.message}</p>
                </div>
                <div style={styleButtonFrame}>  
                    <HoverBox
                        defaultStyle={styleButton}
                        hoveredStyle={styleButtonHovered}
                        onClickF={notification.onCancel}
                    >{notification.cancelText}</HoverBox>
                    <HoverBox
                        defaultStyle={styleButton}
                        hoveredStyle={styleButtonHovered}
                        onClickF={notification.onConfirm}
                    >{notification.confirmText}</HoverBox>
                </div>
            </div>
        </div>
    )
}

export default Notification