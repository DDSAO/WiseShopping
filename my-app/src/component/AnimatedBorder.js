import React, {useRef, useEffect, useState} from 'react';
import { gsap } from "gsap"

const childBorder = 1
const borderPointsVal = 3
const borderPoints = borderPointsVal + "px"
const animationTime = 0.5
const backgroundColor = "rgba(0, 177, 106, 0.6)"

const leftBorder = {
    position: "absolute",
    width: borderPoints,
    left: "-"+borderPoints,
    top: "0",
    background: backgroundColor,
    borderBottomLeftRadius: borderPoints,
}
const rightBorder = {
    position: "absolute",
    width: borderPoints,
    right: "-"+borderPoints,
    bottom: "0",
    background: backgroundColor,
    borderTopRightRadius: borderPoints,
}
const topBorder = {
    position: "absolute",
    height: borderPoints,
    right: "0px",
    top: "-"+borderPoints,
    background: backgroundColor,
    borderTopLeftRadius: borderPoints,

}
const bottomBorder = {
    position: "absolute",
    height: borderPoints,
    left: "0px",
    bottom: "-"+borderPoints,
    background: backgroundColor,
    borderBottomRightRadius: borderPoints,
}

const AnimatedBorder = (props) => {
    const height = parseInt(props.style.height.slice(0, -2)) + borderPointsVal - childBorder * 2 + "px"
    const width = parseInt(props.style.width.slice(0, -2)) + borderPointsVal - childBorder * 2 + "px"
    const leftRef = useRef(null)
    const rightRef = useRef(null)
    const topRef = useRef(null)
    const bottomRef = useRef(null)
    const t1 = useRef(null)


    useEffect(()=> {
        t1.current = gsap.timeline({paused: true})
            .fromTo(leftRef.current, animationTime, {height: "0"}, {height: height})
            .fromTo(bottomRef.current, animationTime, {width: "0"}, {width:width}, "-="+animationTime)
            .fromTo(rightRef.current, animationTime, {height: "0"}, {height:height}, "-="+animationTime)
            .fromTo(topRef.current, animationTime, {width: "0"}, {width:width},"-="+animationTime)
    }, [])

    useEffect(()=> {
        if (props.borderColor && t1.current) {
            leftRef.current.style.backgroundColor = props.borderColor
            rightRef.current.style.backgroundColor = props.borderColor
            topRef.current.style.backgroundColor = props.borderColor
            bottomRef.current.style.backgroundColor = props.borderColor
            t1.current.restart()
        }
    }, [props.borderColor])


    const mouseEnter = props.onMouseEnterF ? props.onMouseEnterF : () => null
    const mouseLeave =  props.onMouseLeaveF ? props.onMouseLeaveF : () => null


    return (
    <div 
        className = {props.className ? props.className : null}
        style={props.style} 
        onClick={props.onClickF}
        onMouseEnter={()=> {
            if (t1.current) {
                t1.current.play()
                mouseEnter()
            }
        }}
        onMouseLeave={()=>{
            if (t1.current) {
                t1.current.reverse()
                mouseLeave()
            }
        }}
    >
        <span ref={leftRef} style={leftBorder}></span>
        <span ref={rightRef} style={rightBorder}></span>
        <span ref={topRef} style={topBorder}></span>
        <span ref={bottomRef} style={bottomBorder}></span>
        {props.children}

    </div>)
}

export default AnimatedBorder;