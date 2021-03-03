import { 
    ADD_NOTIFICATIONS,
    DELETE_NOTIFICATION,

    UPLOADING_NOTIFICATION,
    UPLOADED_NOTIFICATION,

    LOADING_NOTIFICATION,
    LOADED_NOTIFICATION
} from "./actionTypes"

const initState = {
    uploading: false,
    loading: false,
    notifications : {
    }
    
}

const addNotifications = (state, action) => {
    let notifications = {}
    action.notifications.forEach((notification, index) => {
        notifications[index] = {...notification, did:index}
    })

    return {
        ...state,
        notifications: {...notifications},
    }
}

const deleteNotification = (state, action) => {
    let newNotifications = state.notifications
    delete newNotifications[action.did]

    return {
        ...state,
        notifications: {...newNotifications},
    }
}



const notificationReducer = (state = initState, action) => {
    switch(action.type) {
        case ADD_NOTIFICATIONS: return addNotifications(state, action)
        case DELETE_NOTIFICATION: return deleteNotification(state, action)
        case UPLOADING_NOTIFICATION: return {...state, uploading: true}
        case UPLOADED_NOTIFICATION: return {...state, uploading: false}
        case LOADING_NOTIFICATION: return {...state, loading: true}
        case LOADED_NOTIFICATION: return {...state, loading: false}
        default: return state
    }
}

export default notificationReducer;