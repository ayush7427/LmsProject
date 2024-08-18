import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./AuthSlice"
import courseSlice from "./courseSlice"

const store = configureStore({
    reducer: {
        auth: authSlice,
        course: courseSlice
    },
    devTools: true
})

export default store