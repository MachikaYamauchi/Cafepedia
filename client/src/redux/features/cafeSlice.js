import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const createCafe = createAsyncThunk(
  "cafe/createCafe",
  async ({ updatedCafeData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.createCafe(updatedCafeData);
      toast.success("Cafe added Successfully");
      navigate("/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data); // show error message form backend
    }
  }
);

// Home page
export const getCafes = createAsyncThunk(
  "cafe/getCafes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getCafes();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data); // show error message form backend
    }
  }
);

// Singlecafe page
export const getCafe = createAsyncThunk(
  "cafe/getCafe",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getCafe(id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data); // show error message form backend
    }
  }
);

// Dashboard page
export const getCafesByUser = createAsyncThunk(
  "cafe/getCafesByUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.getCafesByUser(userId);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data); // show error message form backend
    }
  }
);

// Dashboard page
export const deleteCafe = createAsyncThunk(
  "cafe/deleteCafe",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const response = await api.deleteCafe(id);
      toast.success("Cafe Delete Successfully");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data); // show error message form backend
    }
  }
);

// Dashboard page
export const updateCafe = createAsyncThunk(
  "cafe/updateCafe",
  async ({ id, updatedCafeData, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.updateCafe(updatedCafeData, id);
      toast.success("Cafe Updated Successfully");
      navigate("/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data); // show error message form backend
    }
  }
);

const cafeSlice = createSlice({
  name: "cafe",
  initialState: {
    cafe: {},
    cafes: [],
    userCafes: [],
    error: "",
    loadding: false,
  },
  extraReducers: {
    [createCafe.pending]: (state, action) => {
      state.loading = true;
    },
    [createCafe.fulfilled]: (state, action) => {
      state.loading = false;
      state.cafes = [action.payload];
    },
    [createCafe.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getCafes.pending]: (state, action) => {
      state.loading = true;
    },
    [getCafes.fulfilled]: (state, action) => {
      state.loading = false;
      state.cafes = action.payload;
    },
    [getCafes.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getCafe.pending]: (state, action) => {
      state.loading = true;
    },
    [getCafe.fulfilled]: (state, action) => {
      state.loading = false;
      state.cafe = action.payload;
    },
    [getCafe.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getCafesByUser.pending]: (state, action) => {
      state.loading = true;
    },
    [getCafesByUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.userCafes = action.payload;
    },
    [getCafesByUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteCafe.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteCafe.fulfilled]: (state, action) => {
      state.loading = false;
      console.log("action", action)
      const {arg:{id}} = action.meta // delete cafe on UI frontend
      if(id) {
        state.userCafes = state.userCafes.filter((item) => item._id !== id);
        state.cafes = state.cafes.filter((item) => item._id !== id);
      }
    },
    [deleteCafe.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateCafe.pending]: (state, action) => {
      state.loading = true;
    },
    [updateCafe.fulfilled]: (state, action) => {
      state.loading = false;
      console.log("action", action)
      const {arg:{id}} = action.meta // Update cafe on UI frontend
      if(id) {
        console.log("action.payload", action);
        console.log("state", state)
        state.userCafes = state.userCafes.map((item) => item._id === id ? action.payload : item);
        state.cafes = state.cafes.map((item) => item._id === id ? action.payload : item);
      }
    },
    [updateCafe.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default cafeSlice.reducer;
