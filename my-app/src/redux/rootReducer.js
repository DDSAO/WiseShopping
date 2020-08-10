import { combineReducers } from 'redux'
import wishlistReducer from './wishlist/wishlistReducer'

const rootReducer = combineReducers({wishlist: wishlistReducer})

export default rootReducer