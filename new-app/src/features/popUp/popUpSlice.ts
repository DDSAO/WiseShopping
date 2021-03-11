import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../redux/store';


interface PopUpState{
  showConfirm: boolean,
}

const initialState: PopUpState = {
  showConfirm: false,
}

export const popUpSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    toggleConfirm: (state) => {state.showConfirm = ! state.showConfirm}
  }
})

export const { toggleConfirm } = popUpSlice.actions

export default popUpSlice.reducer;