import { createSlice } from "@reduxjs/toolkit";

const seasonSlice = createSlice({
    name : 'currentSeason',
    initialState : null,
    reducers : {
        setCurrentSeason : (state, action)=>{
            return action.payload;
        },
    }
})
const allSeasonsSlice = createSlice({
    name : 'allSeasons',
    initialState : null,
    reducers : {
        setAllSeasons : (state, action)=>{
            return action.payload;
        },
    }
})

export default seasonSlice.reducer;
export const allSeasonsReducer = allSeasonsSlice.reducer;

export const {setCurrentSeason} = seasonSlice.actions;
export const {setAllSeasons} = allSeasonsSlice.actions;