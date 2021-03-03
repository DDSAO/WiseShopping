import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../redux/store';


interface NavigationSlice {
  openMenu: boolean
}

const initialState: NavigationSlice = {
  openMenu: false,
}

export const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    toggleMenu: (state) => {state.openMenu = ! state.openMenu}
  }
})

export const { toggleMenu } = navigationSlice.actions

export default navigationSlice.reducer;