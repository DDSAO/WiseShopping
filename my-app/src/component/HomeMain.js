import React from 'react';
import WishlistContainer from './WishlistContainer';
import MessageList from './MessageList';
import Background from '../asset/desert.jpg';

const style = {
    paddingTop: "5%",
    height: "100%",
    width: "100%",
    display: "flex",
    backgroundImage: `url(${Background})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
}
const HomeMain = () => {
    return ( 
        <div style={style}>
            <WishlistContainer />
            <MessageList />
        </div>
    );
}

export default HomeMain;