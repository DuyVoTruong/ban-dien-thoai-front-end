import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./reducer/accountSlice";

export default configureStore({
    reducer: {
        account: accountReducer,
    },
});
