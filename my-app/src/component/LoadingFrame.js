import React, {useEffect, useRef} from 'react';
import LoadingImage from './LoadingImage';
import { useSelector } from 'react-redux';
import { gsap } from 'gsap';

const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
    paddingLeft: "20px",
    left: "20px",
    bottom: "20px",
    width: "200px",
    height: "70px",
    border: "5px solid #f1d00e",
    borderRadius: "20px",
}
const LoadingFrame = () => {
    const fetching = useSelector(state=> state.interface.fetching)
    const frameRef = useRef(null)
    const t1 = useRef(null)

    useEffect(()=> {
        t1.current = gsap.timeline({paused: true})
        .fromTo(frameRef.current, 1, {css:{left:'-200'}},{css:{left:'20'}})
        
    }, [])

    useEffect(()=>{
        if (t1.current) {
            if (fetching.status === 1) {
                t1.current.restart()
            } else {
                t1.current.reverse()
            }
        }
    }, [fetching.status])

    return (
        <div ref={frameRef} className="LoadingBg" style={style}>
            <p>{fetching.status ? fetching.text[fetching.text.length - 1] : "Completed"}</p>
            <LoadingImage width="60px"/>    
        </div>)
    /*
    if (fetching.status) {
        return (
        <div style={style}>
            <LoadingImage width="60px"/>
            <p>{fetching.text}</p>
        </div>)
    } else {
        return null
    }
    */
}

export default LoadingFrame