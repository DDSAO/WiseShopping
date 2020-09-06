import React, {useState} from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';
import HoverBox from './HoverBox';
import { useSelector } from 'react-redux';

const style = {
    width: "30%",
}

const styleContainer = {
    borderLeft: "1px solid black",
    padding: "20px",
    height: "80%",
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
        border: "1px solid rgba(0,0,0,0.2)",
        padding: "10px",
        height: "auto",
        display:"flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backdropFilter: "blur(20px)"
    }
    const styleCardHovered = {
        ...styleCard,
        background: "#DCDCDC"
    }
    const iconStyle = {
        paddingLeft: "10px",
        width: "auto"
    }

    const [isTrashHovered, setTrashHovered] = useState(false);

    return (  
        
        <HoverBox
            defaultStyle={styleCard}
            hoveredStyle={styleCardHovered}
        >
            <div>{props.text}</div>
            <div 
                style={iconStyle} 
                onMouseEnter={() => setTrashHovered(true)}
                onMouseLeave={() => setTrashHovered(false)}
            >
                {isTrashHovered ? <DeleteOutlined /> : <DeleteIcon />}
            </div> 
        </HoverBox> 
    );
}

const MessageContainer = (props) => {
    const style = {
        
    }
    return (
        <div style={style}>
            {props.children}
        </div>
    );
}
 
const toDays = (second) => {
    return Math.floor((Date.now() - second) / 86400)
}
const MessageList = () => {
    const messages = useSelector(state => state.notification)
    console.log(messages)
    return (  
        <div style={style}>
          <MessageTitle />
          <div style={styleContainer}>
            {Object.values(messages).map((item, index) => 
                <MessageCard key={item.nid} text={item.name + " is bought "+ toDays(item.createdDate) + " days ago"}/>)
            }
          </div>
          
        </div>
    );
}
 
export default MessageList;