import { configureStore } from '@reduxjs/toolkit';
import   authReducer  from './slices/authSlice';
import { bookingReducers, vehicleReducer } from './slices/bookingSlices';

export const store = configureStore({
  reducer: {
    auth : authReducer,
    booking : bookingReducers,
    vehicle : vehicleReducer
  },
})