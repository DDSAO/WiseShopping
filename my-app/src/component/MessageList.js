import React, {useState} from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';

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
            <p style={styleWord}>Message Box</p>
        </div>
    );
}

const MessageCard = (props) => {
    const styleCard = {
        border: "1px solid black",
        padding: "10px",
        height: "auto",
        display:"flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    }
    const styleCardHovered = {
        ...styleCard,
        background: "#DCDCDC"
    }
    const iconStyle = {
        paddingLeft: "10px",
        width: "auto"
    }

    const [isCardHovered, setCardHovered] = useState(false);
    const [isTrashHovered, setTrashHovered] = useState(false);

    return (  
        <div 
            style={isCardHovered ? styleCardHovered : styleCard}
            onMouseEnter={() => setCardHovered(true)}
            onMouseLeave={() => setCardHovered(false)}
        >
                <div>{props.text}</div>
                <div 
                    style={iconStyle} 
                    onMouseEnter={() => setTrashHovered(true)}
                    onMouseLeave={() => setTrashHovered(false)}
                >
                    {isTrashHovered ? <DeleteOutlined /> : <DeleteIcon />}
                </div>   
        </div>
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