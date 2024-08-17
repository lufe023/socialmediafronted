import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: null,
    firstName: null,
    lastName: null,
    email: null,
    phone: null,
    status: null,
    role: null,
    picture: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserData: (state, action) => action.payload,
        clearUserData: () => initialState, // Limpia los datos del usuario
    },
});

export const { setUserData, clearUserData } = userSlice.actions;

export default userSlice.reducer;
