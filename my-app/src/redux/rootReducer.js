import { combineReducers } from 'redux'
import wishlistReducer from './wishlist/wishlistReducer'
import interfaceReducer from './interface/interfaceReducer';

const rootReducer = combineReducers({
    wishlist: wishlistReducer,
    interface: interfaceReducer,
})

export default rootReducer