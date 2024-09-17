import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosInstance from "../Helpers/axiosInstance";


const initialState = {
    allUserCount: 0,
    subscribeCount: 0
}


export const getStatsData = createAsyncThunk("stats/get", async () => {
    try {
        const response = axiosInstance.get("/admin/stats/users")
        toast.promise(response, {
            pending: "Getting the stats...",
            success: (data) => {
                return data?.data?.message
            },
            error: "Failed to load data stats"
        })
        return (await response).data
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

const statSlice = createSlice({
    name: "stats",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getStatsData.fulfilled, (state, action) => {
                state.allUserCount = action?.payload?.allUserCount
                state.subscribeCount = action?.payload?.subscribedUsersCount
            })
    }
})

export const { } = statSlice.actions

export default statSlice.reducer