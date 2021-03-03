import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../redux/store';
import { getServerUrl } from '../Global';

interface NotificationState {
  notifications: Notification[],
}

type Notification = {
  id: number,
  item: string,
  createdDate: number,
}

const initialState: NotificationState = {
  notifications: []
}


export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {

  }
})

export default notificationSlice.reducer;
