import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    addPhone,
    deletePhone,
    getAllPhone,
    updatePhone,
} from "../../api/request";
import axios from "axios";

export const phoneSlice = createSlice({
    name: "phone",
    initialState: {
        value: [],
        status: "idle",
    },
    reducers: {
        addPhoneReducer: (state, action) => {
            state.value = state.value.concat(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllPhone.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(fetchAllPhone.fulfilled, (state, action) => {
                if (action.payload) {
                    state.value = action.payload;
                    state.status = "success";
                }
            })
            .addCase(fetchAllPhone.rejected, (state, action) => {
                state.status = "error";
            })
            .addCase(fetchAddPhone.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(fetchAddPhone.fulfilled, (state, action) => {
                if (action.payload) {
                    state.value = state.value.concat(action.payload);
                    state.status = "success";
                }
            })
            .addCase(fetchAddPhone.rejected, (state, action) => {
                state.status = action.error.code;
            })
            .addCase(fetchUpdatePhone.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(fetchUpdatePhone.fulfilled, (state, action) => {
                if (action.payload) {
                    state.value = state.value.map((item) => {
                        if (item.id == action.payload.id) {
                            return action.payload;
                        }
                        return item;
                    });
                    state.status = "success";
                }
            })
            .addCase(fetchUpdatePhone.rejected, (state, action) => {
                state.status = action.error.code;
            })
            .addCase(fetchDeletePhone.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(fetchDeletePhone.fulfilled, (state, action) => {
                if (action.payload) {
                    state.status = "success";
                    state.value = state.value.filter(
                        (item) => item.id !== action.payload
                    );
                }
            })
            .addCase(fetchDeletePhone.rejected, (state, action) => {
                state.status = action.error.code;
            });
    },
});

export const fetchAllPhone = createAsyncThunk("phone/all", async () => {
    return await getAllPhone();
});

export const fetchAddPhone = createAsyncThunk("phone/add", async (data) => {
    return await addPhone(data);
});

export const fetchUpdatePhone = createAsyncThunk(
    "phone/update",
    async (data) => {
        return await updatePhone(data);
    }
);

export const fetchDeletePhone = createAsyncThunk("phone/delete", async (id) => {
    return await deletePhone(id);
});

export const { addPhoneReducer } = phoneSlice.actions;

export default phoneSlice.reducer;
