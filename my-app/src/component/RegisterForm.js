import React, {useEffect, useRef} from 'react';
import {flexCenter, styleButton, styleButtonConfirm, styleButtonCancel} from '../css/css'
import AnimatedInput from './AnimatedInput';
import { gsap } from 'gsap';
import HoverBox from './HoverBox';
import { useSelector, useDispatch } from 'react-redux';
import { 
    setRegisterMessage, setRegisterValue, 
    verifyName, verifyEmail, verifyPassword, verifyConfirm,
    toggleShake,
    resetRegisterForm,
    submitRegisterForm,
} from '../redux';
import LoadingImage from './LoadingImage';


const styleTitleFrame = {
    ...flexCenter,
    justifyContent: "space-around",
    height:"auto",
}

const styleFormFrame = {
    height: "600px",
    width: "600px",
    position:"relative",
    top:"-100%",
    background: "rgba(252, 248, 220, 0.9)",
}
const styleForm = {
    
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    //backdropFilter: "blur(20px) brightness(1.5)",
    
}

const styleTitle = {
    padding: "0 10px",
    //border: "2px solid black",
}

const styleButtonFrame= {
    padding: "20px 8%",
    height:"90px",
    marginTop: "auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",  
}

const RegisterForm = (props) => {
    const dispatch = useDispatch()
    const formRef = useRef(null)
    const t1 = useRef(null)
    const registerForm = useSelector(state => state.interface.registerForm)


    useEffect(()=> {
        t1.current = gsap.to(formRef.current, 1, {css:{top: 0}, ease: "elastic.out.config(1,1.3)"})
    }, [])
    
    return (
    <div style={flexCenter}>
        <div ref={formRef} style={styleFormFrame}>
        {registerForm.status === 0 ? (<div style={styleForm}>
            <div style={styleTitleFrame}>
                <span style={flexCenter}>-</span>
                <h1 style={styleTitle}>Register Form</h1>
                <span style={flexCenter}>-</span>
            </div>
            <AnimatedInput 
                label="User Name" status={registerForm.name.status} 
                message={registerForm.name.message} shake={registerForm.shake}
                onFocusF={()=>{
                    dispatch(setRegisterValue("name", null))
                    dispatch(setRegisterMessage("name", ""))
                }}
                onBlurF={value=>dispatch(verifyName(value))}/>
            <AnimatedInput 
                label="Email" status={registerForm.email.status} 
                message={registerForm.email.message} shake={registerForm.shake}
                onFocusF={()=>{
                    dispatch(setRegisterValue("email", null))
                    dispatch(setRegisterMessage("email", ""))
                }}
                onBlurF={value=>{
                    dispatch(verifyEmail(value))}}/>
            <AnimatedInput 
                label="Password" status={registerForm.password.status} shake={registerForm.shake}
                message={registerForm.password.message} type="password"
                onFocusF={()=>{
                    dispatch(setRegisterValue("password", null))
                    dispatch(setRegisterMessage("password", ""))
                }}
                onBlurF={(value)=>{
                    dispatch(verifyPassword(value))
                }}/>
            <AnimatedInput 
                label="Confirm Password" status={registerForm.confirm.status} shake={registerForm.shake}
                message={registerForm.confirm.message} type="password"
                onFocusF={()=>{
                    dispatch(setRegisterValue("confirm", null))
                    dispatch(setRegisterMessage("confirm", ""))
                }}
                onBlurF={(value)=> {
                    dispatch(verifyConfirm(value, value))
                }}/>
            
            <div style={styleButtonFrame}>
                <HoverBox 
                    defaultStyle={styleButton} 
                    hoveredStyle={styleButtonCancel}
                    className="aButtonCancel"
                    onClickF={()=>{
                        dispatch(resetRegisterForm())
                        props.hideF()
                    }}>Cancel</HoverBox> 
                <HoverBox 
                    defaultStyle={styleButton}
                    hoveredStyle={styleButtonConfirm}
                    onClickF={()=>{
                        if(registerForm.name.status === 2 && 
                        registerForm.email.status === 2 &&
                        registerForm.password.status === 2 &&
                        registerForm.confirm.status === 2) {
                            dispatch(submitRegisterForm({
                                name: registerForm.name.value,
                                email: registerForm.email.value,
                                password: registerForm.password.value,
                            }))
                        } else {
                            dispatch(toggleShake())
                        }
                    }}
                >submit</HoverBox>
            </div></div>) 
        : registerForm.status === 1 ?
        (<div className="submitRegister" style={flexCenter}>
            <LoadingImage width="200px" />
            <h1>Creating Account</h1>
            <div className="ballBox">
                <div className="ball1"></div>
                <div className="ball2"></div>
                <div className="ball3"></div>
                <div className="ball4"></div>
                <div className="ball5"></div>
            </div>
        </div>) 
        : registerForm.status === 2 ? <div>Done</div> : <div>Fail</div>

    }
    </div>
    </div>)
}

export default RegisterForm;