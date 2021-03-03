import { 
    ADD_NOTIFICATIONS,
    DELETE_NOTIFICATION,

    UPLOADING_NOTIFICATION,
    UPLOADED_NOTIFICATION,

    LOADING_NOTIFICATION,
} from "./actionTypes"
import { getServerUrl } from "../../global";


export const fetchNotifications = () => (dispatch, getState) => {
    dispatch({type: LOADING_NOTIFICATION})
    let state = getState()
    fetch(getServerUrl('/notification/fetch'),{
        method: "POST",
        credentials: "include",
        body: JSON.stringify({id: state.interface.user.id}),
        headers: {
            'content-type': 'application/json',
        }
    })
    .then(res=>res.json())
    .then(res=>{
        if (! res.success) {
            alert(res.message)
        } else {
            dispatch(addNotifications(res.data))
        }
    })   
}

export const addNotifications = (notifications) => ({
    type: ADD_NOTIFICATIONS,
    notifications: notifications
})

export const uploadNotifications = (wid) => (dispatch, getState) => {
    dispatch({type: UPLOADING_NOTIFICATION})
    let notifications = []
    let state = getState()
    let user = state.interface.user
    let items = state.wishlist.wishlists[wid].items
    let now = Date.now()
    Object.values(items).forEach(item => {
        if (item.status) {
            notifications.push({
                uid: user.uid,
                name: item.name,
                createdDate: now,
            })
        }
    })
    
    fetch(getServerUrl('/notification/addMany'),{
        method: "POST",
        credentials: "include",
        body: JSON.stringify({id:user.id, notifications: notifications}),
        headers: {
            'content-type': 'application/json',
        }
    })
    .then(res=>res.json())
    .then(res=>{
        if (! res.success) {
            alert(res.message)
        } else {
            dispatch({type: UPLOADED_NOTIFICATION})
        }
    }) 

}

export const deleteNotification = (did) => (dispatch, getState) => {
    //
    let state = getState()
    fetch(getServerUrl('/notification/delete'),{
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
            id:state.interface.user.id, 
            nid: state.notification.notifications[did]._id}),
        headers: {
            'content-type': 'application/json',
        }
    })
    .then(res=>res.json())
    .then(res=>{
        if (! res.success) {
            alert(res.message)
        } else {
            dispatch({type: DELETE_NOTIFICATION, did: did})
        }
    })    
}