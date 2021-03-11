import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import navigationReducer from '../features/navigation/navigationSlice';
import  loginReducer from '../features/user/loginSlice';
import  wishlistReducer  from '../features/wishlist/wishlistSlice';
import notificationReducer from '../features/notification/notificationSlice'
import  popUpReducer  from '../features/popUp/popUpSlice';


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    login: loginReducer,
    navigation: navigationReducer,
    wishlist: wishlistReducer,
    notification: notificationReducer,
    popUp: popUpReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
