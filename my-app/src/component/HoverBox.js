import React, { useState, useEffect } from 'react';

const HoverBox = (props) => {
    const [isHovered, setHovered] = useState(false)
    /*
    useEffect(()=> {
        console.log('hoverbox hovered')
        if (props.onMouseEnterF && isHovered) {
            props.onMouseEnterF()
        }
        if (props.onMouseLeaveF && ! isHovered) {
            props.onMouseLeaveF()
        }
    }, [isHovered])
    */
    const mouseEnter = props.onMouseEnterF ? props.onMouseEnterF : () => null
    const mouseLeave =  props.onMouseLeaveF ? props.onMouseLeaveF : () => null

    return (
    <div 
        style={isHovered ? props.hoveredStyle : props.defaultStyle}
        onMouseEnter={() => {
            setHovered(true)
            mouseEnter()
        }}
        onMouseLeave={() => {
            setHovered(false)
            mouseLeave()
        }}
        onClick={props.onClickF ? props.onClickF : null}
    >
        {props.children}
    </div>
    )
}

export default HoverBox