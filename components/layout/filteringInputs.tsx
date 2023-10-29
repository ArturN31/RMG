'use client';

import { useAppSelector, useAppDispatch } from '@/lib/reduxStore/hooks';
import { setList, setGenre } from '@/lib/reduxStore/filtersSlice';
import { setMovie, setMovieDetails } from '@/lib/reduxStore/movieSlice';
import { RootState } from '@/lib/reduxStore/store';

import SelectListOptions from '../filteringInputs/selectLIstOptions';
import SelectGenreOptions from '../filteringInputs/selectGenreOptions';

export default function FilteringInputs() {
	const filters = useAppSelector((state: RootState) => state.filters);
	const dispatch = useAppDispatch();

	//handler functions
	const handleListSelect = (e: any) => dispatch(setList(e.target.value));
	const handleGenreSelect = (e: any) => dispatch(setGenre(e.target.value));
	const handleNewMovie = async () => {
		//creating filter object
		let filter: Object = {
			list: filters.list,
			genre: filters.genre,
		};

		//sending POST request to NEXT API with filters in the body
		//response provides random movie
		const APIres: Response = await fetch('api/getMovie', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(filter),
		}).then((res) => res.json());

		//handle message not found
		console.log(APIres);

		//setting state
		dispatch(setMovie(APIres));
	};

	return (
		<div id='filtering-inputs'>
			<select
				id='select-list'
				value={filters.list}
				onChange={(e: any) => handleListSelect(e)}>
				<SelectListOptions />
			</select>
			<select
				id='select-genre'
				value={filters.genre}
				onChange={(e: any) => handleGenreSelect(e)}>
				<SelectGenreOptions />
			</select>
			<button
				id='newMovie-btn'
				className='filters-btns'
				onClick={() => handleNewMovie()}>
				New Movie (spacebar)
			</button>
		</div>
	);
}
