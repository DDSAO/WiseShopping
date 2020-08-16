import { 
    SHOW_MENU,
    HIDE_MENU,
    TOGGLE_MENU,
    SHOW_NOTIFICATION,
    HIDE_NOTIFICATION
} from "./actionTypes"

export const showMenu = () => ({
    type: SHOW_MENU
})

export const hideMenu = () => ({
    type: HIDE_MENU
})

export const toggleMenu = () => ({
    type: TOGGLE_MENU
})

export const showNotification = (message,onConfirm,onCancel,confirmText="Confirm",cancelText="Cancel") => ({
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