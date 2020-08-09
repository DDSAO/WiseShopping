import React from 'react';
import WishlistContainer from './WishlistContainer';
import MessageList from './MessageList';

const style = {
    height: "95%",
    width: "100%",
    display: "flex",
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