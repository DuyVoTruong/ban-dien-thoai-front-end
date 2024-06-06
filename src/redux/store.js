import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./reducer/accountSlice";
import phoneReducer from "./reducer/phoneSlice";

export default configureStore({
    reducer: {
        account: accountReducer,
        phone: phoneReducer,
    },
});
