import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import {ContentService} from "./ContentService";

const initialState = {
    faq: {
        isLoading: false,
        isSuccess: false,
        isError: false,
        isErrorMessage: null,
        data: null
    }
}

export const getFAQContent = createAsyncThunk("get/faq/content", async (data, thunkAPI) => {
    try {
        return ContentService.getFAQContent(data, thunkAPI);
    } catch (error) {
        return thunkAPI.rejectWithValue("Something went wrong")
    }
})

const ContentSlice = createSlice({
    name: "content",
    initialState,
    reducers: {
        reset: (state, action) => {
            state[action.payload].isLoading = false
            state[action.payload].isSuccess = false
            state[action.payload].isError = false
            state[action.payload].isErrorMessage = null
            state[action.payload].data = null
        }
    },
    extraReducers: (builder => {
        builder
            .addCase(getFAQContent.fulfilled, (state) => {
                state.faq.isLoading = true
            })
            .addCase(getFAQContent.pending, (state, action) => {
                state.faq.isLoading = false
                state.faq.isSuccess = true
                state.faq.data = action.meta.arg
            })
            .addCase(getFAQContent.rejected, (state, action) => {
                state.faq.isLoading = false
                state.faq.isSuccess = false
                state.faq.isError = true
                state.faq.isErrorMessage = action.meta.arg
            })
    })
})

export const {reset} = ContentSlice.actions
export default ContentSlice.reducer