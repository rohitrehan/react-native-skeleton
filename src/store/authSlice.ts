/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuthState } from '../interfaces/IAuthentication';
import { RootState } from './appStore';

const initialState: IAuthState = {
  firebaseUID: '',
  userName: '',
  // userToken: "",
  userEmail: '',
  sessionTimedOut: false,
  isLoading: false,
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  // The `reducers` field lets us define reducers
  // and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    userLoggedIn: (state, action: PayloadAction<IAuthState>) => {
      state.firebaseUID = action.payload.firebaseUID;
      state.userEmail = action.payload.userEmail;
      state.userName = action.payload.userName;
      // state.userToken = action.payload.userToken;
      state.sessionTimedOut = action.payload.sessionTimedOut;
      state.isLoading = false;
      state.isLoggedIn = action.payload.isLoggedIn;
    },
    userLoggedOut: (state) => {
      state.firebaseUID = '';
      state.userEmail = '';
      state.userName = '';
      // state.userToken = "";
      state.sessionTimedOut = false;
      state.isLoading = false;
      state.isLoggedIn = false;
    },
    userRegistered: (state, action: PayloadAction<IAuthState>) => {
      state.userEmail = action.payload.userEmail;
      state.userName = action.payload.userName;
      // state.userToken = action.payload.userToken;
      state.sessionTimedOut = action.payload.sessionTimedOut;
      state.isLoading = false;
      state.isLoggedIn = true;
    },
    userProfileUpdated: (state, action: PayloadAction<IAuthState>) => {
      state.userEmail = action.payload.userEmail;
      state.userName = action.payload.userName;
      state.firebaseUID = action.payload.firebaseUID;
      state.sessionTimedOut = action.payload.sessionTimedOut;
      state.isLoading = false;
    },
  },
});

export const {
  userLoggedIn,
  userLoggedOut,
  userRegistered,
  userProfileUpdated,
} = authSlice.actions;

export const selectAuthState = (state: RootState): IAuthState => state.auth;

export default authSlice.reducer;
