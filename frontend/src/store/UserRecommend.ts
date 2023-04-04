import { createSlice } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';

const initialState = {
	isRecommend: false,
	// reason: null,
	// spotName: null,
	// spotAddress: null,
	// spotDistance: null,
	// image: null,
};

export const UserRecommend = createSlice({
	name: 'userRecommend',
	initialState,
	reducers: {
		recommend(state, action) {
			state.isRecommend = true;
			// state.reason = action.payload.reason;
			// state.spotName = action.payload.spotName;
			// state.spotAddress = action.payload.spotAddress;
			// state.spotDistance = action.payload.spotDistance;
			// state.image = action.payload.image;
		},
		recommendoff(state) {
			state.isRecommend = false;
			// state.reason = null;
			// state.spotName = null;
			// state.spotAddress = null;
			// state.spotDistance = null;
			// state.image = null;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(PURGE, () => initialState);
	},
});

export const UserRecommendAction = UserRecommend.actions;
export const { recommend, recommendoff } = UserRecommend.actions;
export const UserRecommendReducer = UserRecommend.reducer;
