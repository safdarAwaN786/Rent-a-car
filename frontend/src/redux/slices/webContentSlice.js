import { createSlice } from "@reduxjs/toolkit";

const webContentSlice = createSlice({
    name: 'webContent',
    initialState: {},
    reducers: {
        setWebContent: (state, action) => {
            return action.payload;
        },
        updateBrandLogoUrl: (state, action) => {
            const { index, logoUrl } = action.payload;
            
           
            state.landingPage.brands[index].logoUrl = logoUrl;
        },
        updateChooseUsIconUrl : (state, action) => {
            const { index, iconUrl } = action.payload;
            
            // Use Immer to directly update nested properties
            state.landingPage.chooseUs[index].iconUrl = iconUrl;
        },
        updateWorkFlowIconUrl : (state, action) => {
            const { index, iconUrl } = action.payload;
            
            // Use Immer to directly update nested properties
            state.landingPage.workFlow[index].iconUrl = iconUrl;
        },
        updateOurFleetImageUrl : (state, action) => {
            const { index, imageUrl } = action.payload;
            
            // Use Immer to directly update nested properties
            state.landingPage.ourFleet[index].imageUrl = imageUrl;
        },
    }
})

export default webContentSlice.reducer;

export const { setWebContent, updateBrandLogoUrl, updateChooseUsIconUrl, updateWorkFlowIconUrl, updateOurFleetImageUrl } = webContentSlice.actions;