import { createSlice } from '@reduxjs/toolkit'

const initialAuthState = {
  loggedIn : false,
  user : null
}

export const authSlice = createSlice({
  name: 'authentication',
  initialState : initialAuthState,
  reducers: {
    logInUser: (state, action) => {
      state.loggedIn = action.payload.loggedIn;
      state.user = action.payload.user;
    },
    logOutUser : (state)=>{
      state.loggedIn = false;
      state.user = null;
    }
  },
})

// Action creators are generated for each case reducer function
export const { logInUser, logOutUser } = authSlice.actions

export default authSlice.reducer