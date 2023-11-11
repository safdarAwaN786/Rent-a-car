import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isBookingSubmitted: false,
    bookingData: null
}


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

export const groupSlice = createSlice({
    name: 'selectedVehicle',
    initialState: null,
    reducers: {
        selectGroup: (state, action) => {
            return action.payload;
        }
    }
})

export const groupReducer = groupSlice.reducer;
export const { selectGroup } = groupSlice.actions;

export const bookingReducers = bookingSlice.reducer;
export const { submitPreBooking, updateBookingInfo, clearPreSubmission } = bookingSlice.actions;