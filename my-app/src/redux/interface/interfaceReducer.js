import { 
    SHOW_MENU,
    HIDE_MENU,
    TOGGLE_MENU,
    SHOW_NOTIFICATION,
    HIDE_NOTIFICATION
} from "./actionTypes"

const initState = {
    showMenu: false,
    notification : {
        shouldShow: false,
        message: "this is the message",
        onConfirm: () => {
            console.log("confirmed")
        },
        onCancel: () => {
            console.log("canceled")
        }
    }
}

const showNotification = (state, action) => {
    console.log("reducer show notification")
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
        default: return state
    }
}

export default interfaceReducer;