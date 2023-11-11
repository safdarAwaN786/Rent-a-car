import { createSlice } from "@reduxjs/toolkit";

const webContentSlice = createSlice({
    name : 'webContent',
    initialState : {},
    reducers : {
        setWebContent : (state, action)=>{
            return action.payload;
        }
    }
})

export default webContentSlice.reducer;

export const {setWebContent} = webContentSlice.actions;