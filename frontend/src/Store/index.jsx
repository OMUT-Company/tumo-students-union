import {configureStore} from "@reduxjs/toolkit"
import adminReducer from "./Admin/AdminSlice"

export const store = configureStore({
    reducer: {
        admin:adminReducer
    },

    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})