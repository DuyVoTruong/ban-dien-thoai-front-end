import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postGetInforToJwt, postLogin } from "../../api/request";

export const accountSlice = createSlice({
    name: "account",
    initialState: {
        value: {
            role: null,
        },
        status: "idle",
    },
    reducers: {
        getAccount: (state, action) => {},
        resetAccount: (state, action) => {
            state.value = {
                role: null,
            };
            state.status = "idle";
        },
    },
    extraReducers: (builder) => {
        // Cập nhật state ứng với các trạng thái của redux thunk, có ba trạng thái pending, fulfilled, rejected
        builder
            .addCase(fetchLogin.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(fetchLogin.fulfilled, (state, action) => {
                localStorage.setItem("jwt", action.payload.jwt); // Lưu jwt vào trong localStorage
                state.status = "success";
                if (action.payload) {
                    state.value = { ...action.payload?.account };
                }
            })
            .addCase(fetchLogin.rejected, (state, action) => {
                state.status = action.error.code;
            })
            .addCase(fetchInforToJwt.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(fetchInforToJwt.fulfilled, (state, action) => {
                state.status = "success";
                if (action.payload) {
                    state.value = { ...action.payload?.account };
                }
            })
            .addCase(fetchInforToJwt.rejected, (state, action) => {
                state.status = "error";
            });
    },
});

// Tạo redux thunk để fetch dữ liệu
export const fetchLogin = createAsyncThunk("account/login", async (data) => {
    return await postLogin(data);
});

export const fetchInforToJwt = createAsyncThunk("account/jwt", async (data) => {
    return await postGetInforToJwt(data);
});

export const { getAccount, resetAccount } = accountSlice.actions;
export default accountSlice.reducer;
