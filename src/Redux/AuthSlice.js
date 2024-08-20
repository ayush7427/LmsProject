import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosInstance from "../Helpers/axiosInstance";

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") || false,
  role: localStorage.getItem("role") || "",
  data: JSON.parse(localStorage.getItem("data")) || {},
};

//  signin
export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
  try {
    const res = axiosInstance.post("user/register", data);
    toast.promise(res, {
      pending: "wait creating your account",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to create account",
    });
    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

// login
export const login = createAsyncThunk("/auth/login", async (data) => {
  try {
    const res = axiosInstance.post("user/login", data);
    toast.promise(res, {
      pending: "Authentication in progress ",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to login",
    });
    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

//  logout
export const logout = createAsyncThunk("/auth/logout", async (data) => {
  try {
    const res = axiosInstance.post("user/logout");
    toast.promise(res, {
      pending: "Logout in progress ",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to Logout",
    });
    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
})

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        localStorage.setItem("data", JSON.stringify(action?.payload?.user))
        localStorage.setItem("isLoggedIn", true)
        localStorage.setItem("role", action?.payload?.user?.role)
        // update state
        state.isLoggedIn = true
        state.data = action?.payload?.user
        state.role = action?.payload?.user?.role
      })
      .addCase(logout.fulfilled, (state, action) => {
        localStorage.clear()
        state.data = {}
        state.isLoggedIn = false
        state.role = ""
      })
  }
});

export const { } = authSlice.actions;

export default authSlice.reducer;
