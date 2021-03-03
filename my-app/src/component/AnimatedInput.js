import React, {useState, useEffect, useRef} from 'react';
import { flexCenter } from '../css/css';
import { gsap } from 'gsap';
import css from '../css.scss'
import CachedIcon from '@material-ui/icons/Cached';
import CheckIcon from '@material-ui/icons/Check';
import CancelIcon from '@material-ui/icons/Cancel';



const styleInputFrame = {
    ...flexCenter,
    width: "80%",
    height: "auto",
    margin: "5px",
    justifyContent: "flex-start",
    flexDirection: "column",
    padding: "auto",
}
const styleLabel= {
    //border: "2px solid",
    borderRadius:"5px",
    position:"relative",
    alignSelf: "flex-start",
    userSelect: "none",
    //backdropFilter: "blur(50px)",
    overflow:"hidden"
}
const styleLabelText = {
    ...flexCenter,
    background:"transarent",
    whiteSpace: "nowrap",
}
const styleInput = {
    //border: "1px solid black",
    height: "40px",
    padding: "5px",
    //width: "300px",
    width: "100%",

}
const styleDefaultFilter = {

    background:"linear-gradient(148deg, rgba(150,150,150,1) 0%, rgba(255,255,255,1) 100%)",
    position: "absolute",
    top:"0",
    left: "0",
    zIndex: 1,

}

const styleLeftFilter = {
    //background:DEEP_BLUE,

    position: "absolute",
    top:"0",
    left: "-100%",
    zIndex: 3,
}
const styleBottomFilter = {

    position: "absolute",
    bottom:"-100%",
    left: "0%",
    zIndex: 2,
}

const styleInputBackground = {
    width:"auto",
    height:"auto",
    padding: "5px 10px",
    position: "absolute",
}



const AnimatedInput = (props) => {
    const [isFocused, setFocused] = useState(null)
    const [labelWidth, setLabelWidth] = useState(0)
    const [labelHeight, setLabelHeight] = useState(0)
    const [filterColor, setFilterColor] = useState("bgSolidYellow")
    const [shouldRerender, setShouldRerender] = useState(0)
    const [labelDescription, setLabelDescription] = useState(null)
    const labelRef = useRef(null)
    const leftFilterRef = useRef(null)
    const bottomFilterRef = useRef(null)
    const textRef = useRef(null)
    const leftAnimate = useRef(null)
    const bottomAnimate = useRef(null)
    const shakeAnimate = useRef(null)

    useEffect(()=> { 
        setLabelWidth(labelRef.current.offsetWidth) 
        setLabelHeight(labelRef.current.offsetHeight) 

        leftAnimate.current = gsap.timeline({paused:true})
            .fromTo(leftFilterRef.current, 0.5, {css:{left:"-100%"}}, {css:{left:"0"}})
        bottomAnimate.current = gsap.timeline({paused:true})
            .fromTo(bottomFilterRef.current, 0.5, {css:{bottom:"-100%"}}, {css:{bottom:"0"}})

        shakeAnimate.current = gsap.timeline({paused:true})
            .to(textRef.current, 0.2, {scale:1.1, opacity:0.9})
            .to(textRef.current, 0.2, {scale:1, opacity:1})
    }, [])

    useEffect(()=> {  
        if (props.status !== 2) {
            shakeAnimate.current.restart()
        }
    }, [props.shake])

    useEffect(()=> {
        if (isFocused === true) {
            leftAnimate.current.restart()
            bottomAnimate.current.restart().pause()
        } else if (isFocused === false){
            leftAnimate.current.restart().pause()
            bottomAnimate.current.restart()
        }
    },[isFocused, filterColor])

    useEffect(()=> {
        
        if (isFocused) {
            setLabelDescription(null)
            shakeAnimate.current.restart()
        } else {
            switch (props.status) {
                case 1: 
                    //loading
                    setLabelDescription(<div style={flexCenter}><CachedIcon className="loadingIcon" style={{fill:css.LOADING_YELLOW, fontSize:"1em", margin:"0 5px"}}/>{props.message}</div>)
                    setFilterColor("bgGradientYellow")
                    break
                case 2:
                    //confirm
                    setLabelDescription(<CheckIcon  style={{fill: css.CONFIRM_GREEN, fontSize: "1em", marginLeft:"5px"}}/>)
                    setFilterColor("bgGradientGreen")
                    break
                case 3:
                    //fail
                    setLabelDescription(<div style={flexCenter}><CancelIcon style={{fill:"red", fontSize:"1em", margin:"0 5px"}}/>{props.message}</div>)
                    setFilterColor("bgGradientRed")
                    break
            }
        } 
        setShouldRerender(1)
        
    },[props.status, isFocused])

    useEffect(()=>{
        if (shouldRerender) {
            setLabelWidth(labelRef.current.offsetWidth)
            setShouldRerender(0)
        }
    },[shouldRerender])
    

    return (
    <div style={styleInputFrame}>
        <div style={{
                ...styleLabel, 
                width:labelWidth, 
                height:labelHeight,
                top: (labelHeight/2)+'px',
            }}>
            <div ref={labelRef} style={styleInputBackground}>
                <div style={styleLabelText}>
                    <span ref={textRef} style={{zIndex:6}}>{props.label}</span>
                    <div style={{...flexCenter, zIndex:6}}>
                        {labelDescription}
                    </div>
                </div>
                <div  ref={leftFilterRef} style={styleDefaultFilter}></div>
                <div className={"bgGradientBlue"} ref={leftFilterRef} style={styleLeftFilter}></div>
                <div className={filterColor} ref={bottomFilterRef} style={styleBottomFilter}></div>
            </div>
        </div>
        <input
            style={styleInput} 
            type={props.type? props.type: "text"} 
            onFocus={()=>{
                setFocused(true)
                if (props.onFocusF) props.onFocusF() 
            }}
            onBlur={(e)=>{
                setFocused(false)
                if (props.onBlurF) props.onBlurF(e.target.value) 
            }}
        />
    </div>)
}

export default AnimatedInput

