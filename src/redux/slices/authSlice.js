import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { axiosClient } from "../../api/axiosClient"





const initialState  = {
    user: null,
    status: "idle" // "idle" | "loading" | "success" | "failed"
}

export const loginWithEmailPassword = createAsyncThunk(
    "auth/login",
    async (data,{rejectWithValue}) => {
        try {
            const resp = await axiosClient.post("/user/login/",data)
            return resp.data
        } catch (error) {
            
            return rejectWithValue(error.response?.data?.errors ?? "Login failed")
        }
    }
)   



const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginWithEmailPassword.pending, (state) => {
                state.status = "loading"
            })
            .addCase(loginWithEmailPassword.fulfilled, (state, action) => {
                state.status = "success"
                state.user = action.payload
            })
            .addCase(loginWithEmailPassword.rejected, (state) => {
                state.status = "failed"
            })
    }
})

export default authSlice.reducer