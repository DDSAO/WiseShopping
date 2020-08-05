import React from 'react';
import WishListContainer from './WishListContainer';
import MessageList from './MessageList';

const style = {
    height: "95%",
    width: "100%",
    display: "flex",
}
const HomeMain = () => {
    return ( 
        <div style={style}>
            <WishListContainer />
            <MessageList />
        </div>
    );
}

export default HomeMain;