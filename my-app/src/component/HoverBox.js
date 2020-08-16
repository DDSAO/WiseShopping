import React, { useState } from 'react';

const HoverBox = (props) => {
    const [isHovered, setHovered] = useState(false)
    return (
    <div 
        style={isHovered ? props.hoveredStyle : props.defaultStyle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={props.onClickF ? props.onClickF : null}
    >
        {props.children}
    </div>
    )
}

export default HoverBox