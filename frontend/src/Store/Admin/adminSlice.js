import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import {AdminService} from "./adminservice"

const initialState = {
    signIn: {
        isLoading: false,
        isSuccess: false,
        isError: false,
        isErrorMessage: null,
        data: null
    }
}

export const adminLogin = createAsyncThunk("admin/login", async (data, thunkAPI) => {
    try {
        return await AdminService.adminLogin(data, thunkAPI);
    } catch (error) {
        return thunkAPI.rejectWithValue("Something went wrong")
    }
})

const AdminSlice = createSlice({
    name: "auth",
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
            .addCase(adminLogin.pending,(state, action) => {
                state.signIn.isLoading = true
            })
            .addCase(adminLogin.fulfilled, (state,action) => {
                state.signIn.isLoading = false
                state.signIn.isSuccess = true
                state.signIn.data = action.payload
            })

            .addCase(adminLogin.rejected, (state, action) => {
                state.signIn.isLoading = false
                state.signIn.isSuccess = false
                state.signIn.isError = true
                state.signIn.isErrorMessage = action.payload
            })
    })
})

export const {reset} = AdminSlice.actions
export default AdminSlice.reducer