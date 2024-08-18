import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import axiosInstance from "../Helpers/axiosInstance"

const initialState = {
    courseData: []
}


export const getAllCourses = createAsyncThunk("/course/get", async () => {
    try {
        const response = axiosInstance.get("/courses")
        toast.promise(response, {
            pending: "Loading courses data",
            success: "courses loaded sucessfully",
            error: "Failed to get the courses"
        })
        return (await response).data.courses
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

const courseSlice = createSlice({
    name: "course",
    initialState: initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getAllCourses.fulfilled, (state, action) => {
            if (action.payload) {
                return state.courseData = [...action.payload]
            }
        })
    }
})

export const { } = courseSlice.actions

export default courseSlice.reducer