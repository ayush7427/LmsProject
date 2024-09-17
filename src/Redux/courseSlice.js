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

export const deleteCourse = createAsyncThunk("/course/delete", async (id) => {
    try {
        const response = axiosInstance.delete(`/courses/${id}`)
        toast.promise(response, {
            pending: "deleting courses",
            success: "courses deleted sucessfully",
            error: "Failed to delete the courses"
        })
        return (await response).data
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

export const createNewCourse = createAsyncThunk("/course/create", async (data) => {
    try {
        let formData = new FormData()
        formData.append("title", data?.title)
        formData.append("description", data?.description)
        formData.append("category", data?.category)
        formData.append("createdBy", data?.createdBy)
        formData.append("thumbnail", data?.thumbnail)

        const response = axiosInstance.post("/courses", formData)
        toast.promise(response, {
            pending: "Creating new course",
            success: "Course created successfully",
            error: "Failed to create course"
        })
        return (await response).data
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