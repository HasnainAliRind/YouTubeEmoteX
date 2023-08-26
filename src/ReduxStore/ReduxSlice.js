import { createSlice } from "@reduxjs/toolkit";
let initialState = {
    shadow: false,
    sidebar: false,
    homePageStyles: true,
    currentVideo: null,
    searchedTerm: "",
    moodDetails: {mood: "" , Recommended: []},
    selectBox: true,
    selectedCatergory: null,
    screenSize: null,
    mobileSearch: {
        status: false,
        previousComponent: "/"
    },
    api_key: null
}
export let slice = createSlice({
    name: "VideosData",
    initialState,
    reducers: {
        setShadow: (state , action) => {
            state.shadow = action.payload;
        },
        setSidebar: (state, action) =>{
            state.sidebar = action.payload;
        },
        setHomePageStyles: (state,action)=>{
            state.homePageStyles = action.payload;
        },
        setCurrentVideo: (state , action)=>{
            state.currentVideo = action.payload;
        },
        setSearchedTerm: (state , action)=>{
            state.searchedTerm = action.payload;
        },
        setMood: (state , action)=>{
            state.moodDetails = action.payload
        },
        setSelectBox: (state , action)=>{
            state.selectBox = action.payload
        },
        setSelectedCategory: (state, action)=>{
            state.selectedCatergory = action.payload
        },
        setScreenSize: (state, action)=>{
            state.screenSize =action.payload;
        },
        setMobileSearch: (state,action)=>{
            state.mobileSearch = action.payload
        },
        setAPIKey: (state, action) =>{
            state.api_key = action.payload
        }
    }
})


export const {setShadow , setSidebar, setMobileSearch,setScreenSize,setHomePageStyles , setCurrentVideo , setSearchedTerm, setMood, setSelectBox , setSelectedCategory , setAPIKey} = slice.actions;
export default slice.reducer;