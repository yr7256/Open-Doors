import { createSlice } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';

const initialState = {
	isRecommend: false,
};

export const UserRecommend = createSlice({
	name: 'userRecommend',
	initialState,
	reducers: {
		recommend(state, action) {
			state.isRecommend = true;
		},
		recommendoff(state) {
			state.isRecommend = false;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(PURGE, () => initialState);
	},
});

export const UserRecommendAction = UserRecommend.actions;
export const { recommend, recommendoff } = UserRecommend.actions;
export const UserRecommendReducer = UserRecommend.reducer;
