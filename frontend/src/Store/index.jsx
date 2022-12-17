import {configureStore} from "@reduxjs/toolkit"
import adminReducer from "./Admin/adminSlice"

export const store = configureStore({
    reducer: {
        admin:adminReducer
    },
})