'use client';

import { useAppSelector } from '@/lib/reduxStore/hooks';
import { RootState } from '@/lib/reduxStore/store';

export default function NewMovieButton(props: any) {
	const { handleNewMovie, isClicked, movieState, posterLoaded } = props;
	const posterError = useAppSelector((state: RootState) => state.movie.posterError);

	return (
		<button
			id='newMovie-btn'
			onClick={() => handleNewMovie()}>
			{/* - Renders loader when button is clicked.
                - Loader is displayed until poster loads or there is an error.
                - When loader disappears New Movie text is displayed instead of it.
            */}
			{isClicked === true && !posterError && !movieState.error ? <span className='loader'></span> : ''}
			{(isClicked === false && !posterError) || (posterLoaded === false && posterError) || movieState.error
				? 'New Movie'
				: ''}
		</button>
	);
}
