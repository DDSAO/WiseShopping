import React, {useState, useEffect} from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';
import HoverBox from './HoverBox';
import { useSelector, useDispatch } from 'react-redux';
import { styleIcon } from '../css/css';
import { deleteNotification, fetchNotifications } from '../redux';

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
        margin: "5px 0",
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
        backdropFilter: "blur(20px) brightness(120%)"
    }

    const [isTrashHovered, setTrashHovered] = useState(false);
    const dispatch = useDispatch()
    

    return (  
        
        <HoverBox
            defaultStyle={styleCard}
            hoveredStyle={styleCardHovered}
        >
            <div>{props.text}</div>
            <div 
                style={styleIcon} 
                onMouseEnter={() => setTrashHovered(true)}
                onMouseLeave={() => setTrashHovered(false)}
                onClick={()=>{
                    dispatch(deleteNotification(props.did))
                }}
            >
                {isTrashHovered ? <DeleteOutlined /> : <DeleteIcon />}
            </div> 
        </HoverBox> 
    );
}


 
const toDays = (second) => {
    return Math.floor((Date.now() - second) / (86400 * 1000 ))
}

const MessageList = () => {
    const messages = useSelector(state => state.notification.notifications)
    const dispatch = useDispatch()
    useEffect(()=> {
        dispatch(fetchNotifications())
    }, [])

    
    return (  
        <div style={style}>
          <MessageTitle />
          <div style={styleContainer}>
            {Object.values(messages).map((item) => 
                <MessageCard 
                    did={item.did}
                    key={item.did} 
                    text={item.name + " is bought "+ toDays(item.createdDate) + " days ago"}/>)
            }
          </div>
          
        </div>
    );
}
 
export default MessageList;