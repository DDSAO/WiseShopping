import React, { useState, useEffect } from 'react';

const HoverBox = (props) => {
    const [isHovered, setHovered] = useState(false)
    
    return (
    <div 
        style={isHovered ? props.hoveredStyle : props.defaultStyle}
        className = {props.givenClassName}
        onMouseEnter={() => {
            setHovered(true)
            if (props.onMouseEnterF) props.onMouseEnterF()
        }}
        onMouseLeave={() => {
            setHovered(false)
            if (props.onMouseLeaveF) props.onMouseLeaveF()
        }}
        onClick={props.onClickF ? props.onClickF : null}
    >
        {props.children}
    </div>
    )
}

export default HoverBox