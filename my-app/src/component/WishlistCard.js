import React, { useState } from 'react';
import CardStatus from './CardStatus';
import HoverBox from './HoverBox';

const styleCard = {
    width: "300px",
    height: "185px",
    background: "white",
    border: "1px solid black",
    padding: "10px",
    margin: "10px 0"
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
        <HoverBox
            defaultStyle={styleCard}
            hoveredStyle={styleCardHovered}
            onClickF={props.onClickF}
        >
            <CardStatus wid={props.data.id}/>
            <span>{props.data.name}</span>
            <ul>
                {props.data.items.map((item, index) => {
                    if (index <= 3) {
                        return (<li key={index}>{item.name}</li>)
                    }
                })}
            </ul>
            {props.data.items.length > 3 ? 
                (<div style={styleMore}>
                    <p style={{margin:"0"}}>
                        {props.data.items.length - 4} more items ...
                    </p>
                </div>) : ""}
        </HoverBox>
    )
}

export default WishlistCard;