import React, {useRef} from 'react';
import { useSelector } from 'react-redux';
import HoverBox from './HoverBox';

const style = {
    position: "fixed",
    top:"0",
    left: "0",
    background:"rgba(0,0,0,0.3)",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
    maxWidth: "200px",
    margin:"5% 10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center", 
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
    if (! notification.shouldShow) {
        return null
    }
    return (
        <div style={style} onClick={e=>{
            if (! notiBox.current.contains(e.target)) {
                notification.onCancel()
            }
        }}>
            <div ref={notiBox} style={styleNotiBox}>
                <div style={styleMessage}>
                    {notification.message}
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