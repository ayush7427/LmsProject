import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./AuthSlice"
import courseSlice from "./courseSlice"
import razorPaySlice from "./razorPaySlice"
import lectureSlice from "./lectureSlice"
import statSlice from "./statSlice"


const store = configureStore({
    reducer: {
        auth: authSlice,
        course: courseSlice,
        razorpay: razorPaySlice,
        lecture: lectureSlice,
        stats: statSlice
    },
    devTools: true
})

export default store