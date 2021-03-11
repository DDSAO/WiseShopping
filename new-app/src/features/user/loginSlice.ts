import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../redux/store';
import { getServerUrl } from '../Global';

interface LoginState {
  isLoggedIn: boolean
  logInMessages: string[]
  user: User | null,
  status: "undefined" | "pending" | "fulfilled" | "rejected",
  showRegister: boolean,
}

export interface User {
  name: string,
  id: string,
  uid: number,
  password: string,
  
}

export interface Credential {
  email: string,
  password: string,
}

interface Response {
  success: 0 | 1
  user?: User
  message?: string
}

interface SuccessMessage {
  success: 1,
  user: User,
}

interface ErrorMessage {
  success: 0,
  message: string,
}

const initialState: LoginState = {
  isLoggedIn: true,
  logInMessages: [],
  user: null,
  status: "undefined",
  showRegister: false,
}

export const login = createAsyncThunk<SuccessMessage, Credential, {rejectValue: ErrorMessage}>(
  'user/login',
  async (credential: Credential, thuckApi) => {

    const response = await fetch(getServerUrl('/login'), {
      method: "POST",
        body: JSON.stringify({email:credential.email, password:credential.password}),
        headers: {'content-type': 'application/json'},
        credentials: 'include',
    })
    
    let result: Response = (await response.json())

    if (result.success === 0) {
      return thuckApi.rejectWithValue((await response.json() as ErrorMessage) || {success: 0, message:"wrong"})
    } else {
      return result as SuccessMessage
    }
  },
  {
    condition: (_, { getState }) => {
      const  state : LoginState = (getState() as any)
      if (state.status === 'fulfilled' || state.status === 'pending') {
        // Already fetched or in progress, don't need to re-fetch
        return false
      }
    }
  }
)



export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    displayMessage: (state, action: PayloadAction<string>) => {state.logInMessages.push(action.payload)},
    displayMessages: (state, action: PayloadAction<string[]>) => ({
      ...state,
      logInMessage: action.payload
    }),
    requireLogIn: (state) => {state.isLoggedIn = false},
    loggedIn: (state) => {state.isLoggedIn = true},
    toggleRegister: (state) => {state.showRegister = ! state.showRegister},
  },
  extraReducers: builder => {
    builder
    .addCase(login.pending, (state) => { state.status = "pending" })
    .addCase(login.fulfilled, (state, {payload}) => {
      console.log(payload)
      return {
      ...state, 
      isLoggedIn: true, 
      user: payload.user,
      status: "fulfilled"
    }})
    builder.addCase(login.rejected, (state, { payload, error }) => {
      state.status = "rejected"
      if (payload) {
        // Since we passed in `MyKnownError` to `rejectValue` in `updateUser`, the type information will be available here.
        state.logInMessages.push(payload.message)
      } else {
        state.logInMessages.push(String(error))
      }
    }) 
  }
})



export const { displayMessage, displayMessages, requireLogIn, loggedIn, toggleRegister } = loginSlice.actions;

export default loginSlice.reducer;