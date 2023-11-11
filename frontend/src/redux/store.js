import { configureStore } from '@reduxjs/toolkit';
import   authReducer  from './slices/authSlice';
import { bookingReducers, groupReducer } from './slices/bookingSlices';
import seasonReducer from './slices/seasonSlice';
import daysReducer from './slices/daysNumberSlice';
import webContentReducer from './slices/webContentSlice';

export const store = configureStore({
  reducer: {
    auth : authReducer,
    booking : bookingReducers,
    group : groupReducer,
    currentSeason : seasonReducer,
    numberOfDays : daysReducer,
    webContent : webContentReducer
  },
})