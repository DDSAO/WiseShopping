import { 
    ADD_NOTIFICATIONS,
    DELETE_NOTIFICATION
} from "./actionTypes"

export const addNotifications = (newNotifications) => ({
    type: ADD_NOTIFICATIONS,
    newNotifications: newNotifications
})

export const deleteNotification = (nid) => ({
    type: DELETE_NOTIFICATION,
    nid: nid,
})