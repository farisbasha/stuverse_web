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
        logout: (state) => {
            state.user = null
            localStorage.removeItem("user")
        },
        loadUser: (state) => {
           const user = JSON.parse(localStorage.getItem("user"))
           if(user){
            state.user = user
           }
           state.status = "success"
        },
    
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginWithEmailPassword.pending, (state) => {
                state.status = "loading"
            })
            .addCase(loginWithEmailPassword.fulfilled, (state, action) => {
                state.status = "success"
                state.user = action.payload
                localStorage.setItem("user", JSON.stringify(action.payload))
            })
            .addCase(loginWithEmailPassword.rejected, (state) => {
                state.status = "failed"
            })
    }
})

export const {logout,loadUser} = authSlice.actions

export default authSlice.reducer