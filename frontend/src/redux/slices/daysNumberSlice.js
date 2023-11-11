import { createSlice } from "@reduxjs/toolkit";

const daysNumberSlice = createSlice({
    name : 'numberOfDays',
    initialState : null,
    reducers : {
        setNumberOfDays : (state, action)=>{
            return action.payload;
        }
    }
})

export default daysNumberSlice.reducer;

export const {setNumberOfDays} = daysNumberSlice.actions;