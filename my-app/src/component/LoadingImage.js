import React from 'react';
import small from '../asset/small.png'
import big from '../asset/big.png'
import { flexCenter } from '../css/css';

const LoadingImage = (props) => {
    return (
        <div style={{...flexCenter, width:props.width}}>
            <img className="ringSmall" src={small} alt="loading icon small"/>
            <img className="ringBig" src={big} alt="loading icon large"/>
        </div>
    )
}

export default LoadingImage;
