import React, { useState } from 'react';

const styleCard = {
    width: "300px",
    height: "185px",
    background: "white",
    border: "1px solid black",
    padding: "10px",
}

const styleCardHovered = {
    ...styleCard,
    background: "#DCDCDC"
}

const styleMore = {
    width: "100%",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid grey"
}


const WishlistCard = (props) => {
    

    const [isCardHovered, setCardHovered] = useState(false);

    return (
        <div 
            style={isCardHovered ? styleCardHovered : styleCard}
            onMouseEnter={() => setCardHovered(true)}
            onMouseLeave={() => setCardHovered(false)}
        >
                <span>{props.data.name}</span>
                <ul>
                    {props.data.items.map((item, index) => {
                        if (index <= 5) {
                            return (<li key={index}>{item.name}</li>)
                        }
                    })}
                </ul>
                {props.data.items.length > 3 ? 
                    (<div style={styleMore}><p style={{margin:"0"}}>Read More ...</p></div>) : ""}
        </div>
    )
}

export default WishlistCard