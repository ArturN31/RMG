'use client';

import { useAppSelector, useAppDispatch } from '@/lib/reduxStore/hooks';
import { RootState } from '@/lib/reduxStore/store';
import { useEffect, useState } from 'react';
import { setPosterLoaded } from '@/lib/reduxStore/movieSlice';

export default function MovieContent() {
	const movieState = useAppSelector((state: RootState) => state.movie);
	const posterLoaded = useAppSelector((state: RootState) => state.movie.posterLoaded);
	const dispatch = useAppDispatch();

	const [movieData, setMovieData] = useState<movieInterface>();

	interface movieInterface {
		title: string;
		originalTitle: string;
		releaseDate: string | undefined;
		runtime: string;
		directors: string | JSX.Element[];
		plot: string;
		actors: JSX.Element;
		imdbRating: number | string;
		imdbVotes: string;
		awards: string;
		language: string;
		country: string;
	}

	let getMovieData = (movie: any) => {
		if (movie.movie) {
			//destructuring state
			const { titleText, originalTitleText, releaseDate } = movie.movie;
			const { Runtime, Director, Plot, Actors, imdbRating, imdbVotes, Awards, Language, Country } = movie.movieDetails;

			//get title
			const getTitle: string = titleText.text;
			const getOriginalTitle: string = originalTitleText.text;

			//get date
			const getDate = (releaseDate: any) => {
				if (releaseDate && releaseDate.day) {
					const getDay: number = releaseDate.day;
					const getMonth: number = releaseDate.month;
					const getYear: number = releaseDate.year;
					if (getDay && getMonth && getYear) return new Date(getYear, getMonth - 1, getDay).toLocaleDateString();
				} else return 'Date cannot be retrieved';
			};
			const date = getDate(releaseDate);

			//get runtime
			const getRuntime: number = Runtime.split(' ')[0];
			const getRuntimeString = (runtime: number) => {
				//if more than one hour
				if (Math.floor(runtime / 60) > 1) {
					if (runtime % 60 === 0) return `${runtime / 60} hrs`;
					else return `${Math.floor(runtime / 60)} hrs ${runtime % 60} min`;
				}
				//if one hour
				if (Math.floor(runtime / 60) === 1) {
					if (runtime % 60 === 0) return `${runtime / 60} hr`;
					else return `${Math.floor(runtime / 60)} hr ${runtime % 60} min`;
				}
				//if less than one hour
				if (runtime / 60 < 1) return `${runtime} min`;

				//returns runtime such as '57S'
				return `${runtime}`;
			};
			const runtime: string = getRuntimeString(getRuntime);

			//get directors
			const getDirectors = (directors: string) => {
				if (directors === 'N/A') return 'No Directors';
				return directors.split(', ').map((director) => {
					return <p key={director}>{director}</p>;
				});
			};
			const directors: string | JSX.Element[] = getDirectors(Director);

			//get actors
			const getActors: JSX.Element = Actors.split(', ').map((actor: string) => <p key={actor}>{actor}</p>);

			//get votes
			const getVotes = (votes: any) => {
				const v = votes.replace(',', '');
				const thousand = 1000;
				const milion = 1000000;
				//returns thousands
				if (v > thousand) return `~ ${(v / thousand).toFixed(0)} K votes`;
				//returns milions
				if (v > milion) return `~ ${(v / milion).toFixed(0)} M votes`;
				//returns hundreds
				return `${v} votes`;
			};
			const votes: string = getVotes(imdbVotes);

			//prep movie data object
			const movieData: movieInterface = {
				title: getTitle,
				originalTitle: getOriginalTitle,
				releaseDate: date,
				runtime: runtime,
				directors: directors,
				plot: Plot,
				actors: getActors,
				imdbRating: imdbRating,
				imdbVotes: votes,
				awards: Awards,
				language: Language,
				country: Country,
			};
			return movieData;
		}
	};

	//holds movie data
	const preppedMovieData = getMovieData(movieState.movie);

	//set the movie data so that it appears when the poster loads.
	useEffect(() => {
		if (posterLoaded === true) setMovieData(preppedMovieData);
		dispatch(setPosterLoaded(false));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [posterLoaded]);

	return (
		<div id='movie-details-container'>
			<div id='movie-details'>
				{/* Displays movie content if there is no message */}
				{!movieState.hasOwnProperty('message') && movieData ? (
					<>
						{/* Displays movie title */}
						<div id='title-rating-block'>
							<div id='movie-title'>
								<p>{movieData.title}</p>
								{movieData.title !== movieData.originalTitle ? <p>({movieData.originalTitle})</p> : ''}
							</div>
							{/* Displays rating and votes */}
							{movieData.imdbRating !== 'N/A' ? (
								<div id='rating-container'>
									<p id='rating'>
										<span>{movieData.imdbRating}</span>/10 <span id='star'></span>
									</p>
									<p id='votes'>{movieData.imdbVotes}</p>
								</div>
							) : (
								''
							)}
						</div>

						<div>
							{/* Release date */}
							{movieData.releaseDate !== 'Date cannot be retrieved' ? <span>{movieData.releaseDate}</span> : ''}

							{/* Displays | when release date and runtime are both retrieved */}
							{movieData.releaseDate !== 'Date cannot be retrieved' && movieData.runtime !== 'N/A' ? (
								<span> | </span>
							) : (
								''
							)}

							{/* Runtime */}
							{movieData.runtime !== 'N/A' ? <span>{movieData.runtime}</span> : ''}
						</div>

						<div className='movie-subdetails'>
							{/* Awards */}
							{movieData.awards !== 'N/A' ? (
								<p>
									<span className='movie-section-title'>Awards:</span> {movieData.awards}
								</p>
							) : (
								''
							)}

							{/* Language */}
							<div>
								{movieData.language.split(', ').length > 1 ? (
									<p>
										<span className='movie-section-title'>Languages:</span> {movieData.language}
									</p>
								) : (
									<p>
										<span className='movie-section-title'>Language:</span> {movieData.language}
									</p>
								)}
							</div>

							{/* Country */}
							<div>
								{movieData.country.split(', ').length > 1 ? (
									<p>
										<span className='movie-section-title'>Countries:</span> {movieData.country}
									</p>
								) : (
									<p>
										<span className='movie-section-title'>Country:</span> {movieData.country}
									</p>
								)}
							</div>
						</div>

						{/* Directors */}
						{movieData.directors !== 'No Directors' ? (
							<div className='movie-subdetails'>
								<p className='movie-section-title'>{movieData.directors.length > 1 ? 'Director(s):' : 'Director:'}</p>
								{movieData.directors}
							</div>
						) : (
							''
						)}

						{/* Actors */}
						<div className='movie-subdetails'>
							<p className='movie-section-title'>Stars:</p>
							{movieData.actors}
						</div>

						{/* Storyline */}
						<div className='movie-subdetails'>
							<p className='movie-section-title'>Storyline:</p>
							<p style={{ textAlign: 'justify' }}>{movieData.plot}</p>
						</div>
					</>
				) : (
					''
				)}

				{/* Displays error */}
				{movieState.error ? <p>{movieState.error}</p> : ''}
			</div>
		</div>
	);
}
