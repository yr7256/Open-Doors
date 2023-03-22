import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isLogged: false,
	user_name: null,
	user_id: null,
};

export const AuthSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		loginAccount(state, action) {
			state.isLogged = true;
			state.user_name = action.payload.user_name;
			state.user_id = action.payload.user_id;
		},
		logoutAccount(state) {
			state.isLogged = false;
			state.user_name = null;
			state.user_id = null;
		},
	},
});

export const { loginAccount, logoutAccount } = AuthSlice.actions;

export default AuthSlice.reducer;
