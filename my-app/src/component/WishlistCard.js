import React, { useState, useEffect } from 'react';
import CardStatus from './CardStatus';
import AnimatedBorder from './AnimatedBorder';
import { useSelector } from 'react-redux';

const styleCard = {
    width: "300px",
    height: "185px",
    padding: "10px",
    marginTop: "20px",
    border: "1px solid rgba(0,0,0,0.2)",
    backdropFilter: "blur(20px) brightness(110%)",
}

const styleCardHovered = {
    ...styleCard,
    backdropFilter: "blur(20px) brightness(120%)"
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
    const [borderColor, setBorderColor] = useState()
    const itemsLength = props.data.items? Object.values(props.data.items).length : 0
    const disabled = useSelector(state => state.interface.fetching.status) 
  
    return (
        <AnimatedBorder
            className = {disabled ? "halfTransparent" : null}
            style={isCardHovered ? styleCardHovered : styleCard}
            onMouseEnterF = {() => setCardHovered(true)}
            onMouseLeaveF = {() => setCardHovered(false)}
            borderColor = {borderColor}
            onClickF={disabled ? null : props.onClickF}
        >
            {props.isPast ? null : 
            <CardStatus wid={props.wid} name={props.name} 
                setBorderColor={setBorderColor}/>
            }
            <span>{props.data.name}</span>
            <ul>
                {props.data.items ?
                    Object.values(props.data.items).map((item, index) => {
                    if (index <= 3) {
                        return (<li key={item.iid}>{item.name}</li>)
                    } else if (index<= 5 && itemsLength <= 6) {
                        return (<li key={item.iid}>{item.name}</li>)  
                    }
                }): null}
            </ul>
            {itemsLength > 6 ? 
                (<div style={styleMore}>
                    <p style={{margin:"0"}}>
                        {Object.keys(props.data.items).length - 4} more items ...
                    </p>
                </div>) : ""}
        </AnimatedBorder>
    )
}

export default WishlistCard;