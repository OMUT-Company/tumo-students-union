import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import {adminService} from "./adminService";

const initialState = {
    signIn: {
        isLoading: false,
        isSuccess: false,
        isError: false,
        errorMessage: null,
        data: null
    },
    addOrganization: {
        isLoading: false,
        isSuccess: false,
        isError: false,
        errorMessage: null,
        data: null
    },
    organizations: {
        isLoading: false,
        isSuccess: false,
        isError: false,
        errorMessage: null,
        data: null
    },
    deleteOrganization: {
        isLoading: false,
        isSuccess: false,
        isError: false,
        errorMessage: null,
        data: null
    },
    updateOrganization: {
        isLoading: false,
        isSuccess: false,
        isError: false,
        errorMessage: null,
        data: null
    },
    organizationsOffer: {
        isLoading: false,
        isSuccess: false,
        isError: false,
        errorMessage: null,
        data: null
    },
    organizationOfferAnswer:{
        isLoading: false,
        isSuccess: false,
        isError: false,
        errorMessage: null,
        data: null
    }
}

export const signIn = createAsyncThunk("admin/login", async (data, thunkAPI) => {
    try {
        return await adminService.signIn(data)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.error.message)
        return thunkAPI.rejectWithValue(message)
    }
})

export const addOrganization = createAsyncThunk("add/organization", async (data, thunkAPI) => {
    try {
        return await adminService.addOrganization(data)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.error.message)
        return thunkAPI.rejectWithValue(message)
    }
})

export const getAllFunders = createAsyncThunk("get/all/funders", async (_, thunkAPI) => {
    try {
        return await adminService.getAllFunders()
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.error.message)
        return thunkAPI.rejectWithValue(message)
    }
})

export const deleteCurrentOrganization = createAsyncThunk("delete/current/organization", async (data, thunkAPI) => {
    try {
        return await adminService.deleteOrganization(data)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.error.message)
        return thunkAPI.rejectWithValue(message)
    }
})

export const updateOrganization = createAsyncThunk("update/current/organization", async (data, thunkAPI) => {
    try {
        return await adminService.updateOrganization(data)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.error.message)
        return thunkAPI.rejectWithValue(message)
    }
})

export const getOrganizationsOffer = createAsyncThunk("get/organizations/offer", async (data, thunkAPI) => {
    try {
        return await adminService.getOrganizationOffer()
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.error.message)
        return thunkAPI.rejectWithValue(message)
    }
})

export const refusedOrganizationOffer = createAsyncThunk("organization/offer/refused",async(data,thunkAPI)=>{
    try {
        return await adminService.refusedOrganizationOffer(data,thunkAPI)
    }catch (error){
        const message = (error.response && error.response.data && error.response.data.error.message)
        return thunkAPI.rejectWithValue(message)
    }
})

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        reset: (state, action) => {
            state[action.payload].isLoading = false
            state[action.payload].isSuccess = false
            state[action.payload].isError = false
            state[action.payload].errorMessage = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signIn.pending, (state) => {
                state.signIn.isLoading = true
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state.signIn.isLoading = false
                state.signIn.isSuccess = true
                state.signIn.errorMessage = null
                state.signIn.data = action.payload
                sessionStorage.setItem("accessToken", action.payload.data.result.token)
            })
            .addCase(signIn.rejected, (state, action) => {
                state.signIn.isLoading = false
                state.signIn.isSuccess = false
                state.signIn.isError = true
                state.signIn.errorMessage = action.payload
            })

            .addCase(addOrganization.pending, (state) => {
                state.addOrganization.isLoading = true
            })
            .addCase(addOrganization.fulfilled, (state, action) => {
                state.addOrganization.isLoading = false
                state.addOrganization.isSuccess = true
                state.addOrganization.errorMessage = null
                state.addOrganization.data = action.payload
            })
            .addCase(addOrganization.rejected, (state, action) => {
                state.addOrganization.isLoading = false
                state.addOrganization.isSuccess = false
                state.addOrganization.isError = true
                state.addOrganization.errorMessage = action.payload
            })

            .addCase(getAllFunders.pending, (state) => {
                state.organizations.isLoading = true
            })
            .addCase(getAllFunders.fulfilled, (state, action) => {
                state.organizations.isLoading = false
                state.organizations.isSuccess = true
                state.organizations.errorMessage = null
                state.organizations.data = action.payload
            })
            .addCase(getAllFunders.rejected, (state, action) => {
                state.organizations.isLoading = false
                state.organizations.isSuccess = false
                state.organizations.isError = true
                state.organizations.errorMessage = action.payload
            })

            .addCase(deleteCurrentOrganization.pending, (state) => {
                state.deleteOrganization.isLoading = true
            })
            .addCase(deleteCurrentOrganization.fulfilled, (state, action) => {
                state.deleteOrganization.isLoading = false
                state.deleteOrganization.isSuccess = true
                state.deleteOrganization.isError = false
                state.deleteOrganization.data = action.payload
            })
            .addCase(deleteCurrentOrganization.rejected, (state, action) => {
                state.deleteOrganization.isLoading = false
                state.deleteOrganization.isSuccess = false
                state.deleteOrganization.isError = true
                state.deleteOrganization.data = action.payload
            })

            .addCase(updateOrganization.pending, (state) => {
                state.deleteOrganization.isLoading = true
            })
            .addCase(updateOrganization.fulfilled, (state, action) => {
                state.deleteOrganization.isLoading = false
                state.deleteOrganization.isSuccess = true
                state.deleteOrganization.isError = false
                state.deleteOrganization.data = action.payload
            })
            .addCase(updateOrganization.rejected, (state, action) => {
                state.deleteOrganization.isLoading = false
                state.deleteOrganization.isSuccess = false
                state.deleteOrganization.isError = true
                state.deleteOrganization.data = action.payload
            })

            .addCase(getOrganizationsOffer.pending, (state) => {
                state.organizationsOffer.isLoading = true
            })
            .addCase(getOrganizationsOffer.fulfilled, (state, action) => {
                state.organizationsOffer.isLoading = false
                state.organizationsOffer.isSuccess = true
                state.organizationsOffer.isError = false
                state.organizationsOffer.data = action.payload
            })
            .addCase(getOrganizationsOffer.rejected, (state, action) => {
                state.organizationsOffer.isLoading = false
                state.organizationsOffer.isSuccess = false
                state.organizationsOffer.isError = true
                state.organizationsOffer.data = action.payload
            })

            .addCase(refusedOrganizationOffer.pending,(state)=>{
                state.organizationOfferAnswer.isLoading = true
            })
            .addCase(refusedOrganizationOffer.fulfilled, (state, action) => {
                state.organizationOfferAnswer.isLoading = false
                state.organizationOfferAnswer.isSuccess = true
                state.organizationOfferAnswer.isError = false
                state.organizationOfferAnswer.data = action.payload
            })
            .addCase(refusedOrganizationOffer.rejected, (state, action) => {
                state.organizationOfferAnswer.isLoading = false
                state.organizationOfferAnswer.isSuccess = false
                state.organizationOfferAnswer.isError = true
                state.organizationOfferAnswer.data = action.payload
            })
    }
})

export const {reset} = adminSlice.actions
export default adminSlice.reducer