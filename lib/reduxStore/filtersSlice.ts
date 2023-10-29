import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

//defining type for the slice state
interface FiltersState {
	list: string;
	genre: string;
}

const initialState: FiltersState = {
	list: 'most_pop_movies',
	genre: 'null',
};

export const filtersSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		setList: (state, action: PayloadAction<string>) => {
			state.list = action.payload;
		},
		setGenre: (state, action: PayloadAction<string>) => {
			state.genre = action.payload;
		},
	},
});

export const { setList, setGenre } = filtersSlice.actions;
export const selectFilters = (state: RootState) => state.filters;
export default filtersSlice.reducer;
