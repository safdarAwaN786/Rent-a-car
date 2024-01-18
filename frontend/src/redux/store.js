import { configureStore } from '@reduxjs/toolkit';
import   authReducer  from './slices/authSlice';
import { bookingReducers, groupReducer } from './slices/bookingSlices';
import seasonReducer from './slices/seasonSlice';
import {allSeasonsReducer} from './slices/seasonSlice';
import daysReducer from './slices/bookingDaysSlice';
import appReducer from './slices/appSlice';
import webContentReducer from './slices/webContentSlice';

export const store = configureStore({
  reducer: {
    auth : authReducer,
    booking : bookingReducers,
    group : groupReducer,
    currentSeason : seasonReducer,
    bookingDays : daysReducer,
    webContent : webContentReducer,
    allSeasons : allSeasonsReducer,
    app : appReducer
  },
})