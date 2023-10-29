import { configureStore } from '@reduxjs/toolkit';
import filtersSlice from './filtersSlice';
import movieSlice from './movieSlice';

export const store = configureStore({
	reducer: {
		filters: filtersSlice,
		movie: movieSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
