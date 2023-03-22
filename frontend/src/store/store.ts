import React from 'react';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './AuthSlice';

const rootReducer = combineReducers({
	user: userReducer,
});

export default configureStore({
	reducer: rootReducer,
});
