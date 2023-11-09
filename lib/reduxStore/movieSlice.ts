import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

//defining type for the slice state
interface FiltersState {
	movie: Object;
	error: String;
	posterLoaded: boolean;
}

const initialState: FiltersState = {
	movie: {},
	error: '',
	posterLoaded: false,
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
		setPosterLoaded: (state, action: PayloadAction<boolean>) => {
			state.posterLoaded = action.payload;
		},
	},
});

export const { setMovie, setNoMovieRetrievedError, setPosterLoaded } = movieSlice.actions;
export const selectMovie = (state: RootState) => state.movie;
export default movieSlice.reducer;
