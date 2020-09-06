import { combineReducers } from 'redux'
import wishlistReducer from './wishlist/wishlistReducer'
import interfaceReducer from './interface/interfaceReducer';
import notificationReducer from './notification/notificationReducer';

const rootReducer = combineReducers({
    wishlist: wishlistReducer,
    interface: interfaceReducer,
    notification: notificationReducer,
})

export default rootReducer