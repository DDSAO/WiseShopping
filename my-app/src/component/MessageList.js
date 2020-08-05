import React from 'react';

const style = {
    width: "30%",
}

const MessageTitle = () => {
    const style = {
        height: "10%",
        textAlign: "center",
        paddingTop:"5%",
    }
    const styleWord = {
        
    }
    return (
        <div style={style}>
            <p style={styleWord}>Message Title</p>
        </div>
    );
}

const MessageCard = (props) => {
    const style = {
        border: "1px solid black",
        padding: "10px",
    }
    return (  
        <div style={style}>{props.text}</div>
    );
}

const MessageContainer = (props) => {
    const style = {
        borderLeft: "1px solid black",
        padding: "20px",
        height: "80%",
    }
    return (
        <div style={style}>
            {props.children}
        </div>
       
    );
}
 


const MessageList = () => {
    return (  
        <div style={style}>
          <MessageTitle />
          <MessageContainer>
            <MessageCard text="egg will expired in 3 days"/>
          </MessageContainer>
          
        </div>
    );
}
 
export default MessageList;