import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isBookingSubmitted: false,
    bookingData: null
}
const selectedVehicle = null

export const bookingSlice = createSlice({
    name: 'bookingInfo',
    initialState: initialState,
    reducers: {
        submitPreBooking: (state) => {
            state.isBookingSubmitted = true;
        },
        updateBookingInfo: (state, action) => {

            

            state.bookingData = action.payload;
        },
        clearPreSubmission: (state) => {
            state.isBookingSubmitted = false;
        }
    }
})

export const vehicleSlice = createSlice({
    name: 'selectedVehicle',
    initialState: selectedVehicle,
    reducers: {
        selectVehicle: (state, action) => {
            return action.payload;
        }
    }
})

export const vehicleReducer = vehicleSlice.reducer;
export const { selectVehicle } = vehicleSlice.actions;

export const bookingReducers = bookingSlice.reducer;
export const { submitPreBooking, updateBookingInfo, clearPreSubmission } = bookingSlice.actions;