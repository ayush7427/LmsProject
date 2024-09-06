import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./AuthSlice"
import courseSlice from "./courseSlice"
import razorPaySlice from "./razorPaySlice"
import lectureSlice from "./lectureSlice"


const store = configureStore({
    reducer: {
        auth: authSlice,
        course: courseSlice,
        razorpay: razorPaySlice,
        lecture: lectureSlice
    },
    devTools: true
})

export default store