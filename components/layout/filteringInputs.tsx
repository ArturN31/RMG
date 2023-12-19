'use client';

import { useAppSelector, useAppDispatch } from '@/lib/reduxStore/hooks';
import { setList, setGenre } from '@/lib/reduxStore/filtersSlice';
import { setMovie, setNoMovieRetrievedError } from '@/lib/reduxStore/movieSlice';
import { RootState } from '@/lib/reduxStore/store';

import SelectListOptions from '../filteringInputs/selectLIstOptions';
import SelectGenreOptions from '../filteringInputs/selectGenreOptions';
import NewMovieButton from '../filteringInputs/newMovieBtn';
import { useEffect, useState } from 'react';
import { setPosterLoaded } from '@/lib/reduxStore/movieSlice';

export default function FilteringInputs() {
	const filters = useAppSelector((state: RootState) => state.filters);
	const movieState = useAppSelector((state: RootState) => state.movie);
	const posterLoaded = useAppSelector((state: RootState) => state.movie.posterLoaded);
	const dispatch = useAppDispatch();

	const [isClicked, setIsClicked] = useState<boolean>(false);

	//initial page load
	useEffect(() => {
		//if movieState is empty fetch movie
		if (Object.keys(movieState.movie).length === 0) handleNewMovie();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	//handler functions
	const handleListSelect = (e: any) => dispatch(setList(e.target.value));
	const handleGenreSelect = (e: any) => dispatch(setGenre(e.target.value));
	const handleNewMovie = async () => {
		dispatch(setPosterLoaded(false));
		setIsClicked(true);

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

		//handles errors sent from api
		let errorWithMessage = Object.keys(APIres).includes('message');
		if (errorWithMessage) {
			let errorMessage: string[] = Object.values(APIres);
			if (errorMessage[0]) {
				dispatch(setNoMovieRetrievedError(`${errorMessage[0]}`));
				dispatch(setMovie(APIres));
			}
		} else {
			//if there is no error sent from API.
			dispatch(setNoMovieRetrievedError(''));
			dispatch(setMovie(APIres));
		}
	};

	useEffect(() => {
		if (posterLoaded === true) setIsClicked(false);
	}, [posterLoaded]);

	return (
		<div id='filtering-inputs'>
			<div>
				<label htmlFor='select-list'>List</label>
				<select
					id='select-list'
					value={filters.list}
					onChange={(e: any) => handleListSelect(e)}>
					<SelectListOptions />
				</select>
			</div>

			<div>
				<label htmlFor='select-genre'>Genre</label>
				<select
					id='select-genre'
					value={filters.genre}
					onChange={(e: any) => handleGenreSelect(e)}>
					<SelectGenreOptions />
				</select>
			</div>
			<NewMovieButton
				isClicked={isClicked}
				handleNewMovie={handleNewMovie}
				movieState={movieState}
				posterLoaded={posterLoaded}
			/>
		</div>
	);
}
