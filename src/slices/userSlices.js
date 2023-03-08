import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  setLocalStorage,
  getTokenFromLocalStorage,
} from "../utils/localStorage";

const API = import.meta.env.VITE_API_URL;
// const API = "http://localhost:8080/jat/";

export const register = createAsyncThunk("userRegister", async (data) => {
  return fetch(API + "register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ credentials: data }),
  }).then((response) => response.json());
});
export const login = createAsyncThunk("userlogin", async (data) => {
  return fetch(API + "login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ credentials: data }),
  }).then((response) => response.json());
});
export const loginWithToken = createAsyncThunk(
  "userloginwithToken",
  async () => {
    return fetch(API + "loginwithtoken", {
      method: "POST",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then((response) => response.json());
  }
);
export const addJob = createAsyncThunk("userUpdate", async (data) => {
  return fetch(API + "addjob", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => response.json());
});

export const deleteJob = createAsyncThunk("deleteJob", async (data) => {
  return fetch(API + "deletejob", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => response.json());
});
export const editJob = createAsyncThunk("editJob", async (data) => {
  return fetch(API + "editjob", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => response.json());
});
export const addSite = createAsyncThunk("addSite", async (data) => {
  return fetch(API + "addSite", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((response) => response.json());
});
export const deleteSite = createAsyncThunk("deleteSite", async (data) => {
  return fetch(API + "deleteSite", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((response) => response.json());
});
export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isLoading: false,
    loggedIn: false,
    statusFilter: "",
    tokenLogingIn: false,
  },
  reducers: {
    logout(state) {
      state.loggedIn = false;
    },
    tokenLogingInToggle(state) {
      state.tokenLogingIn = !state.tokenLogingIn;
    },
    setStatusFilter(state, action) {
      state.statusFilter = action.payload;
    },
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.isLoading = true;
    },
    [login.fulfilled]: (state, action) => {
      if (!action.payload.error) {
        state.user = action.payload.user;
        setLocalStorage(action.payload.token);
        state.loggedIn = true;
      }
      state.isLoading = false;
    },
    [login.rejected]: (state, action) => {
      console.error(action.payload);
      state.isLoading = false;
    },
    [register.pending]: (state) => {},
    [register.fulfilled]: (state, action) => {},
    [register.rejected]: (state, action) => {
      console.error(action.payload);
    },
    [addJob.pending]: (state) => {},
    [addJob.fulfilled]: (state, action) => {
      state.user = action.payload;
    },
    [addJob.rejected]: (state, action) => {
      console.error(action.payload);
    },
    [deleteJob.pending]: (state) => {},
    [deleteJob.fulfilled]: (state, action) => {
      state.user = action.payload;
    },
    [deleteJob.rejected]: (state, action) => {
      console.error(action.payload);
    },
    [editJob.pending]: (state) => {},
    [editJob.fulfilled]: (state, action) => {
      state.user = action.payload;
    },
    [editJob.rejected]: (state, action) => {
      console.error(action.payload);
    },
    [loginWithToken.pending]: (state) => {
      state.tokenLogingIn = true;
    },
    [loginWithToken.fulfilled]: (state, action) => {
      state.user = action.payload.user;
      state.loggedIn = true;
      state.isLoading = false;
      state.tokenLogingIn = false;
    },
    [loginWithToken.rejected]: (state, action) => {
      state.tokenLogingIn = false;
      console.error(action.payload);
    },
    [addSite.fulfilled]: (state, action) => {
      state.user = action.payload;
    },
    [deleteSite.fulfilled]: (state, action) => {
      // console.log(action.payload);
      state.user = action.payload;
    },
  },
});
export const { logout, setStatusFilter, tokenLogingInToggle } =
  userSlice.actions;
