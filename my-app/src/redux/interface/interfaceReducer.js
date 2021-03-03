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
    SET_REGISTER_FORM_STATUS,
    LOGGED_IN,
    LOGGED_OUT,
    SET_LOG_IN_MESSAGE,

    FETCHING,
    FETCHED,

} from "./actionTypes"



const initState = {
    showMenu: false,
    notification : {
        shouldShow: false,
    },
    user : {
        name: null,
    },
    isLoggedIn: false,
    logInMessage: "",
    currentPage: "home",
    registerForm: {
        name: {value: null, status: 0, message:""},
        password: {value: null, status: 0, message:""},
        confirm: {value: null, status: 0, message:""},
        email: {value: null, status: 0, message:""},
        shake : 0,
        status: 0,
    },
    fetching: {
        status: 0,
        text: [],
    }
}

const showNotification = (state, action) => {
    return {
        ...state,
        notification: {
            shouldShow: true,
            message: action.message,
            onConfirm: action.onConfirm,
            onCancel: action.onCancel,
            confirmText: action.confirmText,
            cancelText: action.cancelText,
        }
    }
}
const hideNotification = (state, action) => {
    return {
        ...state,
        notification : {
            shouldShow: false,
        }
    }
}

const jumpTo = (state, action) => {
    return {
        ...state,
        currentPage: action.currentPage,
    }
}

const setRegisterValue = (state, action) => {
    return {
        ...state,
        registerForm: {
            ...state.registerForm,
            [action.formName]: {
                ...state.registerForm[action.formName],
                value: action.value
            }
        }
    }
}
const setRegisterStatus = (state, action) => {

    return {
        ...state,
        registerForm: {
            ...state.registerForm,
            [action.formName]: {
                ...state.registerForm[action.formName],
                status: action.status
            }
        }
    }
}
const setRegisterMessage = (state, action) => {
    return {
        ...state,
        registerForm: {
            ...state.registerForm,
            [action.formName]: {
                ...state.registerForm[action.formName],
                message : action.message
            }
        }
    }
}
const toggleShake = (state, action) => {
    return {
        ...state,
        registerForm: {
            ...state.registerForm,
            shake: 1 - state.registerForm.shake,
        }
    }
}
const resetRegisterForm = (state, action) => {
    return {
        ...state,
        registerForm: {
            name: {value: null, status: 0, message:""},
            password: {value: null, status: 0, message:""},
            confirm: {value: null, status: 0, message:""},
            email: {value: null, status: 0, message:""},
            shake : 0,
            status: 0,
        }
    }
}

const setRegisterFormStatus = (state, action) => {

    return {
        ...state,
        registerForm: {
            ...state.registerForm,
            status: action.status
        }
    }
}

const loggedIn = (state, action) => ({
    ...state,
    user: action.user,
    isLoggedIn: true,
})
const loggedOut = (state, action) => ({
    ...state,
    uer: {
        name: null,
    },
    isLoggedIn: false,
})
const setLogInMessage = (state, action) => ({
    ...state,
    logInMessage: action.message
})

const fetching = (state, action) => {

    const tasks = state.fetching.text.slice(0)
    tasks.push(action.text)
    return {
    ...state,
    fetching: {
        status: 1,
        text: tasks
    }}
}

const fetched = (state, action) => {
    const tasks = state.fetching.text
    let status = 1
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i] === action.text) {
            tasks.splice(i, 1)
            break
        }
    }
    tasks.length > 0 ? status = 1 : status = 0
    return {
        ...state,
        fetching: {
            status: status,
            text: tasks
        }
    }
    
}

const interfaceReducer = (state = initState, action) => {

    switch(action.type) {
        case SHOW_MENU : return {
            ...state,
            showMenu: true,
        }
        case HIDE_MENU : return {
            ...state,
            showMenu: false,
        }
        case TOGGLE_MENU : return {
            ...state,
            showMenu: ! state.showMenu,
        }
        case SHOW_NOTIFICATION : return showNotification(state, action)
        case HIDE_NOTIFICATION : return hideNotification(state, action)
        case JUMP_TO: return jumpTo(state, action)
        case SET_REGISTER_VALUE: return setRegisterValue(state, action)
        case SET_REGISTER_STATUS: return setRegisterStatus(state, action)
        case SET_REGISTER_MESSAGE: return setRegisterMessage(state, action)
        case TOGGLE_SHAKE: return toggleShake(state, action)
        case RESET_REGISTER_FORM: return resetRegisterForm(state,action)
        case SET_REGISTER_FORM_STATUS: return setRegisterFormStatus(state, action)
        case LOGGED_IN: return loggedIn(state, action)
        case LOGGED_OUT: return loggedOut(state, action)
        case SET_LOG_IN_MESSAGE: return setLogInMessage(state, action)
        
        case FETCHING: return fetching(state, action)
        case FETCHED: return fetched(state, action)

        default: return state
    }
}

export default interfaceReducer;