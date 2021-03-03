import React, {useRef, useEffect} from 'react';
import { flexCenter, styleIcon } from '../css/css';

import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

import { gsap } from 'gsap';





const style = {
    ...flexCenter,
    margin: "10px 0",
    //border: "1px solid black",
    height: "40px",

}

const styleSide = {
    ...flexCenter,
    width:"20%",
}

const styleCenter = {
    width: "60%",
    height: "40px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    background: "rgba(255,255,255,0.2)",
    padding: "0 20px",
    opacity: "0.8",

}
const styleArrow = {
    ...flexCenter,
    width: "30px",
    height: "30px"
}
const styleText = {
    ...flexCenter,
    padding: "0 20px",
    overflow: "hidden",
}


const VirtualItemCard = (props) => {
    const l1 = useRef(null)
    const l2 = useRef(null)
    const l3 = useRef(null)
    const r1 = useRef(null)
    const r2 = useRef(null)
    const r3 = useRef(null)
    const centerRef = useRef(null)

    const centerEffect = useRef(null)

    
    useEffect(()=> {
        centerEffect.current = gsap.timeline({repeat:-1})
            .fromTo(centerRef.current, 1,{css:{opacity:"0.8"}},{css:{opacity:"0.3"}})
            .fromTo(centerRef.current, 1,{css:{opacity:"0.3"}},{css:{opacity:"0.8"}})
    }, [])
    
    

    
    return (
    <div style={style}>
        <div style={{...styleSide, justifyContent: "flex-end"}}>
            <div ref={l1} style={styleArrow}><NavigateNextIcon /></div>
            <div ref={l2} style={styleArrow}><NavigateNextIcon /></div>
            <div ref={l3} style={styleArrow}><NavigateNextIcon /></div>
        </div>
        <div ref={centerRef} style={styleCenter}>
            <div style={styleIcon}>{props.index}</div>
            <div style={styleText}>{props.text}</div>
            <div style={styleIcon}>
                <DeleteOutlineIcon style={{fill:"tomato"}}/>
            </div>
        </div>
        <div style={{...styleSide, justifyContent: "flex-start"}}>
            <div ref={r1} style={styleArrow}><NavigateBeforeIcon /></div>
            <div ref={r2} style={styleArrow}><NavigateBeforeIcon /></div>
            <div ref={r3} style={styleArrow}><NavigateBeforeIcon /></div>
        </div>
    </div>)
}

export default VirtualItemCard;