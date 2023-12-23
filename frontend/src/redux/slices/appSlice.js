import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    seasonIdForPrices: null
}

const appSlice = createSlice({
    name: 'appStates',
    initialState,
    reducers: {
        setSeasonIdForPrices: (state, action) => {
            state.seasonIdForPrices = action.payload;
        }
    }
})

export default appSlice.reducer;

export const { setSeasonIdForPrices } = appSlice.actions;