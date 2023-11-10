import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

//defining type for the slice state
interface FiltersState {
	movie: Object;
	error: String;
	posterLoaded: boolean;
	posterError: string;
}

const initialState: FiltersState = {
	movie: {},
	error: '',
	posterLoaded: false,
	posterError: '',
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
		setPosterError: (state, action: PayloadAction<string>) => {
			state.posterError = action.payload;
		},
	},
});

export const { setMovie, setNoMovieRetrievedError, setPosterLoaded, setPosterError } = movieSlice.actions;
export const selectMovie = (state: RootState) => state.movie;
export default movieSlice.reducer;
