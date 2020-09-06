import { 
    ADD_NOTIFICATIONS,
    DELETE_NOTIFICATION
} from "./actionTypes"

const initState = {
    0: {name: "egg", nid: 0, createdDate:0}
}

const addNotifications = (state, action) => {
    return {
        ...state,
        ...action.newNotifications
    }
}

const deleteNotification = (state, action) => {
    let newNotifications = state
    delete newNotifications[action.nid]
    return {
        ...newNotifications
    }
}


const notificationReducer = (state = initState, action) => {
    switch(action.type) {
        case ADD_NOTIFICATIONS: return addNotifications(state, action)
        case DELETE_NOTIFICATION: return deleteNotification(state, action)
        default: return state
    }
}

export default notificationReducer;