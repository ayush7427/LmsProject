import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosInstance from "../Helpers/axiosInstance";

const initialState = {
    key: "",
    subscription_id: "",
    isPaymentVerified: false,
    allPayments: {},
    finalMonths: {},
    monthlySalesRecord: []
}

export const getRazorPayId = createAsyncThunk("/razorpay/getId", async () => {
    try {
        const response = axiosInstance.get("/payments/razorpay-key");
        return (await response).data
    } catch (error) {
        toast.error("Failed to load data");
    }
})


export const purchaseCourseBundle = createAsyncThunk("/purchaseCourse", async () => {
    try {
        const response = axiosInstance.post("/payments/subscribe");
        return (await response).data
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

export const verifyUserPayment = createAsyncThunk("/payments/verify", async (data) => {
    try {
        const response = axiosInstance.post("/payments/verify", {
            razorpay_payment_id: data.razorpay_payment_id,
            razorpay_subscription_id: data.razorpay_subscription_id,
            razorpay_signature: data.razorpay_signature
        });
        return (await response).data
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})


export const getPaymentRecord = createAsyncThunk("/payments/record", async () => {
    try {
        const response = axiosInstance.get("/payments?count=100");
        toast.promise(response, {
            pending: "Getting the Payment records",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to get Payment records"
        })
        return (await response).data
    } catch (error) {
        toast.error("Operation Failed");
    }
})


export const cancelCourseBundle = createAsyncThunk("/payments/cancel", async (data) => {
    try {
        const response = axiosInstance.post("/payments/unsubscribe");
        toast.promise(response, {
            pending: "unsubscribing the bundle",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to unsubscribe"
        })
        return (await response).data
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

const razorpaySlice = createSlice({
    name: "razorpay",
    initialState: initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getRazorPayId.fulfilled, (state, action) => {
                state.key = action?.payload?.key
            })
            .addCase(purchaseCourseBundle.fulfilled, (state, action) => {
                state.subscription_id = action?.payload?.subscription_id
            })
            .addCase(verifyUserPayment.fulfilled, (state, action) => {
                toast.success(action?.payload?.message)
                state.isPaymentVerified = action?.payload?.success
            })
            .addCase(verifyUserPayment.rejected, (state, action) => {
                toast.success(action?.payload?.message)
                state.isPaymentVerified = action?.payload?.success
            })
            .addCase(getPaymentRecord.fulfilled, (state, action) => {
                state.allPayments = action?.payload?.allPayments
                state.finalMonths = action?.payload?.finalMonths
                state.monthlySalesRecord = action?.payload?.monthlySalesRecord
            })
    }
})

export const { } = razorpaySlice.actions
export default razorpaySlice.reducer