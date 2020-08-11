import React, { useState } from 'react';

const styleCard = {
    width: "300px",
    height: "185px",
    background: "white",
    border: "1px solid black",
    padding: "10px",
    margin: "10px 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}

const styleCardHovered = {
    ...styleCard,
    background: "#DCDCDC"
}


const Card = (props) => {
    const [isCardHovered, setCardHovered] = useState(false);
    let content = null
    if (! props.children) {
        content = null;
    } else {
        content = isCardHovered ? props.children.props.text : props.children
    }
    return (
        <div 
            style={isCardHovered ? styleCardHovered : styleCard}
            onMouseEnter={() => setCardHovered(true)}
            onMouseLeave={() => setCardHovered(false)}
            onClick={props.onClickF ? props.onClickF : null}
        >
            {content}
        </div>
    )
}

export default Card;