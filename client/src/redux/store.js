import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./features/authSlice";
import CafeReducer from "./features/cafeSlice"

export default configureStore({
    reducer: {
        auth:AuthReducer,
        cafe:CafeReducer
    }
});