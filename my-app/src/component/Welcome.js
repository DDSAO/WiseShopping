import React, {useState, useRef, useEffect} from 'react';
import { flexCenter} from '../css/css';
import HoverBox from './HoverBox';
import RegisterForm from './RegisterForm';

import WelcomeBg from '../asset/welcome.jpg';
import logo from '../asset/logo.png'
import WordRotation from './WordRotation';
import { useDispatch, useSelector } from 'react-redux';
import { logIn, setLogInMessage } from '../redux';
import  CancelIcon  from '@material-ui/icons/Cancel';



const style = {
    height: "100%",
    width: "100%",
    display: "flex",
    backgroundImage: `url(${WelcomeBg})`,
    backgroundPosition: "center",
    backgroundSize: "cover", 
}

const styleLeft = {
    ...flexCenter,
    flexDirection: "column",
    width: "30%",
    padding: "20px",
    background: "rgba(255, 254, 204,0.7)",
}


const styleLogo = {
    position:"absolute",
    width:"200px",
    top:"100px",
    
}
const styleInputFrame = {
    ...flexCenter,
    width: "80%",
    height: "70px",
    margin: "5px",
    justifyContent: "flex-start",
    flexDirection: "column",
    padding: "auto",
}
const styleMessageFrame = {
    ...flexCenter,
    height: "auto",
    width: "80%",
    margin: "5px",
}
const styleLabel = {
    background: "rgb(255, 254, 204)",
    color:"black",
    position:"relative",
    top:"0.5em",
    padding: "0 5px",
    alignSelf: "flex-start",
    userSelect: "none",

}
const styleInput = {
    border: "1px solid black",
    height: "40px",
    padding: "5px",
    //width: "300px",
    width: "100%",
}
const styleButtonFrame = {
    marginTop:"20px",
    height:"auto",
    display:"flex",
    justifyContent:"space-around",
    alignItems: "center",
}
const styleButton = {
    ...flexCenter,
    height: "40px",
    width:"100px",
    userSelect: "none",
    textAlign: "center",
    background: "rgb(255, 254, 204)",
    color:"black",
}

const styleButtonHovered = {
    ...styleButton,
    background: "rgb(235, 234, 184)",
}
const styleButtonLong = {
    ...styleButton,
    width:"300px"
}
const styleButtonLongHovered = {
    ...styleButtonLong,
    background: "rgb(235, 234, 184)",
}


const styleRight = {
    ...flexCenter,
    width: "70%",
    //background: "grey"
}

const words = [
    'I just want a simple wishlist',
    'Maybe remind me when I purchase',
    'Why so complicated?',
    'Some more animations !'

]

const Welcome = (props) => {
    const [isChecked, setChecked] = useState(false)
    const [showRegister, setShowRegister] = useState(false)

    const logInMessage = useSelector(state=>state.interface.logInMessage)
    const dispatch = useDispatch()

    const logoRef = useRef(null)
    const emailRef = useRef(null)
    const passwordRef = useRef(null)

    

    return(
        <div style={style}>
            <div style={styleLeft}>
                
                <img ref={logoRef} style={styleLogo} src={logo} alt="logo" />
                
                <div style={styleInputFrame}>
                    <label style={styleLabel}>Email</label>
                    <input ref={emailRef} style={styleInput} type="text" />
                </div>
                <div style={styleInputFrame}>
                    <label style={styleLabel}>Password</label>
                    <input ref={passwordRef} style={styleInput} type="password" /></div>
                {logInMessage ? 
                    <div style={styleMessageFrame}>
                        <CancelIcon 
                            style={{fill:"red", fontSize:"1em", marginRight:"5px"}}
                        />
                        {logInMessage}
                    </div> : null}
                <div style={styleButtonFrame}>
                    <HoverBox
                        defaultStyle={styleButton}
                        hoveredStyle={styleButtonHovered}
                        onClickF = {()=>{
                            if (emailRef.current.value && passwordRef.current.value) {
                                dispatch(logIn(emailRef.current.value, passwordRef.current.value))
                            } else if (! emailRef.current.value){
                                dispatch(setLogInMessage("email should not be empty"))
                            } else if (! passwordRef.current.value) {
                                dispatch(setLogInMessage("password should not be empty"))
                        }}}
                    >
                        Log in
                    </HoverBox>
                    <HoverBox
                        defaultStyle={styleButton}
                        hoveredStyle={styleButtonHovered}
                        onClickF={()=>setShowRegister( ! showRegister)}
                    >
                        Register
                    </HoverBox>
                </div>  
                <div style={styleButtonFrame}>
                    <HoverBox
                        defaultStyle={styleButtonLong}
                        hoveredStyle={styleButtonLongHovered}
                        onClickF = {() => {
                            emailRef.current.value = "admin@admin.com"
                            passwordRef.current.value = "password"
                        }}
                    >
                        Give me a test account
                    </HoverBox>
                </div>
            </div>
            <div style={styleRight}>
                {showRegister ? 
                    <RegisterForm hideF={()=>setShowRegister(false)}/> : 
                    <WordRotation words={words}/>}
            </div>
        </div>
    )
}
export default Welcome;