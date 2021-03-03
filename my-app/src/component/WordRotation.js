import React, { useState, useRef, useEffect } from 'react';
import {gsap} from 'gsap';
import {flexCenter} from '../css/css'

const styleStage = {
    ...flexCenter,
    //background:"pink",  
    backdropFilter: "blur(20px)",
    overflow:"hidden",
}

const styleWord = {
    ...flexCenter,
    position: "absolute",
    top:"60%",
    width:"auto"
}


const WordRotation = (props) => {
    const stageRef = useRef(null)
    const wordRef = useRef(null)
    const t1 = useRef(null)
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(()=> {
        t1.current = gsap.timeline({repeat:0})
        .fromTo(wordRef.current, 2, {css:{top:"60%"}}, {css:{top:"0"}})
        .to(wordRef.current, 2, {
            onComplete: () => { 
                setCurrentIndex((currentIndex + 1) % props.words.length)
            },
            css:{top:"-60%"},
        },"+=5")

        return () => t1.current.kill()
        


    }, [currentIndex])

    return (
    <div style={styleStage} ref={stageRef}>
        <div style={styleWord} ref={wordRef}><h1 className="welcomeWords" >{props.words[currentIndex]}</h1></div>
    </div>)
}

export default WordRotation
