import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./AuthSlice"
import courseSlice from "./courseSlice"
import razorPaySlice from "./razorPaySlice"

const store = configureStore({
    reducer: {
        auth: authSlice,
        course: courseSlice,
        razorpay: razorPaySlice
    },
    devTools: true
})

export default store