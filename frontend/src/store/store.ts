import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import userReducer from './AuthSlice';
import { RegisterMapReducer } from './RegisterMapSlice';
import { UserRecommendReducer } from './UserRecommend';

const reducers = combineReducers({
	user: userReducer,
	registerMap: RegisterMapReducer,
	userRecommend: UserRecommendReducer
});

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['user', 'registerMap', 'userRecommend'],
};
const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export default store;
