import { createSlice } from "@reduxjs/toolkit";

const seasonSlice = createSlice({
    name : 'currentSeason',
    initialState : null,
    reducers : {
        setCurrentSeason : (state, action)=>{
            return action.payload;
        }
    }
})

export default seasonSlice.reducer;

export const {setCurrentSeason} = seasonSlice.actions;