import { configureStore } from "@reduxjs/toolkit";
import videosData from "./ReduxSlice";
export const store = configureStore({
    reducer: {
        videosData,
    }
})