// local stuff
import { createSlice } from '@reduxjs/toolkit';

const storage = localStorage.getItem('userInfo');
const initialState = {
    userInfo: storage ? JSON.parse(storage) : null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // setst local userInfo
        setCredentials: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem('userInfo', JSON.stringify(action.payload));

            const expirationTime =
                new Date().getTime() + 30 * 24 * 60 * 60 * 1000; // 30 days
            localStorage.setItem('expirationTime', expirationTime.toString());
        },
        clearCredentials: state => {
            state.userInfo = null;
            localStorage.removeItem('userInfo');
            localStorage.removeItem('expirationTime');
        },
    },
});

export const { setCredentials, clearCredentials } = authSlice.actions;

export default authSlice.reducer;
