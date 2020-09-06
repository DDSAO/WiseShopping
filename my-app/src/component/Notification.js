import React, {useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import HoverBox from './HoverBox';
import { hideNotification } from '../redux/interface/interfaceActions';
import { flexCenter } from '../css/css';
import AnimatedBorder from './AnimatedBorder';

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
    border: "1px solid black",
    background: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
}
const styleMessage = {
    padding: "20px",
    height:"70%",
    textAlign:"center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
    userSelect: "none"
}
const styleButtonHovered = {
    ...styleButton,
    background: "#DCDCDC",
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
                <div style={styleMessage}>
                    {notification.message}
                </div>
                <div style={styleButtonFrame}>  
                    <AnimatedBorder
                        defaultStyle={styleButton}
                        hoveredStyle={styleButtonHovered}
                        onClickF={notification.onCancel}
                        borderColor="tomato"
                    >{notification.cancelText}</AnimatedBorder>
                    <AnimatedBorder
                        defaultStyle={styleButton}
                        hoveredStyle={styleButtonHovered}
                        onClickF={notification.onConfirm}
                    >{notification.confirmText}</AnimatedBorder>
                </div>
            </div>
        </div>
    )
}

export default Notification