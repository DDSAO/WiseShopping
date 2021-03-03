import { 
    SHOW_MENU,
    HIDE_MENU,
    TOGGLE_MENU,
    SHOW_NOTIFICATION,
    HIDE_NOTIFICATION,
    JUMP_TO,
    SET_REGISTER_VALUE,
    SET_REGISTER_STATUS,
    SET_REGISTER_MESSAGE,
    TOGGLE_SHAKE,
    RESET_REGISTER_FORM,
    SUBMIT_REGISTER_FORM,
    SET_REGISTER_FORM_STATUS,
    LOGGED_IN,
    LOGGED_OUT,
    SET_LOG_IN_MESSAGE,

    FETCHING,
    FETCHED,
} from "./actionTypes"

import { getServerUrl } from "../../global";



export const showMenu = () => ({
    type: SHOW_MENU
})

export const hideMenu = () => ({
    type: HIDE_MENU
})

export const toggleMenu = () => ({
    type: TOGGLE_MENU
})

export const showNotification = (message, cancelText="Cancel", onCancel,confirmText="Confirm", onConfirm) => ({
    type: SHOW_NOTIFICATION,
    message: message,
    onConfirm: onConfirm,
    onCancel: onCancel,
    confirmText: confirmText,
    cancelText: cancelText,
})

export const hideNotification = () => ({
    type: HIDE_NOTIFICATION
})

export const jumpTo = (currentPage) => ({
    type: JUMP_TO,
    currentPage: currentPage,
})

export const setRegisterValue = (formName, value) => ({
    type: SET_REGISTER_VALUE,
    formName: formName,
    value: value,
})
export const setRegisterStatus = (formName, status) => ({
    type: SET_REGISTER_STATUS,
    formName: formName,
    status: status,
})
export const setRegisterMessage = (formName, message) => ({
    type: SET_REGISTER_MESSAGE,
    formName: formName,
    message: message,
})

export const verifyName = (name) => (dispatch)=> {
    dispatch(setRegisterValue("name", null))
    if (name !== "") {
        dispatch(setRegisterStatus("name", 1))
        dispatch(setRegisterMessage("name", "Making sure the name has not been taken"))
        fetch(getServerUrl("/user/verifyName"), {
            method: "POST",
            body: JSON.stringify({name: name}),
            headers: {
                'content-type': 'application/json',
            }
        })
        .then(res=>res.json())
        .then(res=>{
            if (res.success) {
                dispatch(setRegisterStatus("name",2))
                dispatch(setRegisterValue("name", name))
            } else {
                dispatch(setRegisterStatus("name",3))
                dispatch(setRegisterMessage("name", res.message))
            }
        })
        .catch(error => console.error(error))
    } else {
        dispatch(setRegisterStatus("name",3))
        dispatch(setRegisterMessage("name", "User name cannot be empty"))
    }
}
const isEmail = (email) => {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
    return reg.test(email)
}
export const verifyEmail = (email) => (dispatch)=> {
    dispatch(setRegisterValue("email", null))
    if (isEmail(email)) {
        if (email !== "") {
            dispatch(setRegisterStatus("email", 1))
            dispatch(setRegisterMessage("email", "Making sure the email has not been taken"))
            fetch(getServerUrl("/user/verifyEmail"), {
                method: "POST",
                body: JSON.stringify({email: email}),
                headers: {
                    'content-type': 'application/json',
                }
            })
            .then(res=>res.json())
            .then(res=>{
                if (res.success) {
                    dispatch(setRegisterStatus("email",2))
                    dispatch(setRegisterValue("email", email))
                } else {
                    dispatch(setRegisterStatus("email",3))
                    dispatch(setRegisterMessage("email", res.message))
                }
            })
            .catch(error => console.error(error))
        } else {
            dispatch(setRegisterStatus("email",3))
            dispatch(setRegisterMessage("email", "Email cannot be empty"))
        }
    } else {
        dispatch(setRegisterStatus("email", 3))
        dispatch(setRegisterMessage("email", "Please input a valid email"))
    }
}

const hasSpace = /[\s]/

export const verifyPassword = (password) => (dispatch) => {
    dispatch(setRegisterValue("password", null))
    if (password !== "") {
        if (! hasSpace.test(password)) {
            dispatch(setRegisterStatus("password", 1))
            dispatch(setRegisterMessage("password", "Confirm the password below please"))
            dispatch(setRegisterValue("password", password))
        } else {
            dispatch(setRegisterStatus("password", 3))
            dispatch(setRegisterMessage("password", "Password cannot contain space"))
        }
    } else {
        dispatch(setRegisterStatus("password", 3))
        dispatch(setRegisterMessage("password", "Password cannot be empty"))
    }
}

export const verifyConfirm = (confirm, password) => (dispatch) => {
    dispatch(setRegisterValue("confirm", null))
    if (confirm !== "") {
        if (! hasSpace.test(confirm)) {
            dispatch(setRegisterStatus("confirm", 1))
            if (confirm === password) {  //all good
                dispatch(setRegisterStatus("password", 2))
                dispatch(setRegisterStatus("confirm", 2))
                dispatch(setRegisterValue("confirm", confirm))
            } else {
                dispatch(setRegisterStatus("confirm", 3))
                dispatch(setRegisterMessage("confirm", "Password not matched !"))
            }
        } else {
            dispatch(setRegisterStatus("confirm", 3))
            dispatch(setRegisterMessage("confirm", "Password cannot contain space"))
        }
    } else {
        dispatch(setRegisterStatus("confirm", 3))
        dispatch(setRegisterMessage("confirm", "please confirm your password !"))
    }
}

export const toggleShake = () => ({
    type: TOGGLE_SHAKE,
})
export const resetRegisterForm = () => ({
    type: RESET_REGISTER_FORM
})
export const setRegisterFormStatus = (status) => ({
    type: SET_REGISTER_FORM_STATUS,
    status: status
})
export const submitRegisterForm =  (data) => (dispatch) => {
    dispatch(setRegisterFormStatus(1))
    fetch(getServerUrl('/user/createAccount'),{
        method: "POST",
        body: JSON.stringify({
            name: data.name,
            email: data.email,
            password: data.password,
        }),
        headers: {'content-type': 'application/json'}
    })
    .then(res=>res.json())
    .then(res=>{
        if (res.success) {
            dispatch(setRegisterFormStatus(2))
        } else {
            dispatch(setRegisterFormStatus(3))
            alert(res.message)
        }
    })
}

const loggedIn = (user) => ({
    type: LOGGED_IN,
    user: user
})


export const logIn = (email, password) => (dispatch) => {
    dispatch(setLogInMessage(""))
    fetch(getServerUrl('/login'), {
        method: "POST",
        body: JSON.stringify({email:email, password:password}),
        headers: {'content-type': 'application/json'},
        credentials: 'include',
    })
    .then(res=>res.json())
    .then(res=>{
        if (res.success) {
            dispatch(loggedIn(res.user))
        } else {
            dispatch(setLogInMessage(res.message))
        }
    })
}

export const setLogInMessage = (message) => ({
    type: SET_LOG_IN_MESSAGE,
    message: message,
})

export const logOut = () => (dispatch) => {
    fetch(getServerUrl('/logout'), {
        method: "GET"
    })
    .then(res=>res.json())
    .then(res=>{
        console.log(res)
    })
}

export const fetching = (text) => ({
    type: FETCHING,
    text: text,
})

export const fetched = (text) => ({
    type: FETCHED,
    text: text
})

