import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        id: null,
        firstName: null,
        lastName: null,
        email: null,
        phone: null,
        status: null,
        role: null,
        picture: null,
    },
    reducers: {
        setUserData: (state, action) => action.payload,
    },
});

export const { setUserData } = userSlice.actions;

export default userSlice.reducer;
