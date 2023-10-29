import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

//defining type for the slice state
interface FiltersState {
	movie: Object;
	movieDetails: Object;
}

const initialState: FiltersState = {
	movie: {},
	movieDetails: {},
};

export const movieSlice = createSlice({
	name: 'movie',
	initialState,
	reducers: {
		setMovie: (state, action: PayloadAction<Object>) => {
			state.movie = action.payload;
		},
		setMovieDetails: (state, action: PayloadAction<Object>) => {
			state.movieDetails = action.payload;
		},
	},
});

export const { setMovie, setMovieDetails } = movieSlice.actions;
export const selectMovie = (state: RootState) => state.movie;
export default movieSlice.reducer;
