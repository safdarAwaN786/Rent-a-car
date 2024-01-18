import { createSlice } from "@reduxjs/toolkit";

const bookingDaysSlice = createSlice({
    name : 'numberOfDays',
    initialState : null,
    reducers : {
        setBookingDays : (state, action)=>{
            return action.payload;
        }
    }
})

export default bookingDaysSlice.reducer;

export const {setBookingDays} = bookingDaysSlice.actions;