import { 
    SHOW_MENU,
    HIDE_MENU,
    TOGGLE_MENU,
    SHOW_NOTIFICATION,
    HIDE_NOTIFICATION,
    JUMP_TO,
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

