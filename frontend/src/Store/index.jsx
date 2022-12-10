import {configureStore} from "@reduxjs/toolkit"
import faqReducer from "./Content/ContentSlice"

export const store = configureStore({
    reducer: {
        faq: faqReducer
    },

    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})