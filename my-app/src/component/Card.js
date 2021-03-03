import React, { useState } from 'react';
import AnimatedBorder from './AnimatedBorder';


const styleCard = {
    width: "300px",
    height: "185px",
    border: "1px solid rgba(0,0,0,0.2)",
    padding: "10px",
    marginTop: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    
    background: "inherit",
    backdropFilter: "blur(20px) brightness(110%)",
}

const styleCardHovered = {
    ...styleCard,
    backdropFilter: "blur(20px) brightness(120%)"
}


const Card = (props) => {
    const [isCardHovered, setCardHovered] = useState(false);
    let content = null
    if (! props.children) {
        content = null;
    } else {
        content = props.text ? (isCardHovered ? props.text : props.children) : props.children
    }
   return (
        <AnimatedBorder
            style={isCardHovered ? styleCardHovered : styleCard}
            onMouseEnterF={() => setCardHovered(true)}
            onMouseLeaveF={() => setCardHovered(false)}
            onClickF={props.onClickF ? props.onClickF : null}
        >
           {content}
        </AnimatedBorder>
   )
}

export default Card;