import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

//defining type for the slice state
interface FiltersState {
	movie: Object;
	error: String;
}

const initialState: FiltersState = {
	movie: {},
	error: '',
};

export const movieSlice = createSlice({
	name: 'movie',
	initialState,
	reducers: {
		setMovie: (state, action: PayloadAction<Object>) => {
			state.movie = action.payload;
		},
		setNoMovieRetrievedError: (state, action: PayloadAction<string>) => {
			state.error = action.payload;
		},
	},
});

export const { setMovie, setNoMovieRetrievedError } = movieSlice.actions;
export const selectMovie = (state: RootState) => state.movie;
export default movieSlice.reducer;
