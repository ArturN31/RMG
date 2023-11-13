'use client';

import { useAppSelector, useAppDispatch } from '@/lib/reduxStore/hooks';
import { RootState } from '@/lib/reduxStore/store';
import { useEffect, useState } from 'react';
import { setPosterLoaded } from '@/lib/reduxStore/movieSlice';

import MovieTitle from '../movieContent/title';
import MovieRating from '../movieContent/rating';
import ReleaseDateAndRuntime from '../movieContent/releaseDateAndRuntime';
import Awards from '../movieContent/awards';
import Language from '../movieContent/language';
import Country from '../movieContent/country';
import Director from '../movieContent/director';
import Actors from '../movieContent/actors';
import Storyline from '../movieContent/storyline';
import WatchlistButton from '../movieContent/watchlistBtn';

export default function MovieContent() {
	const movieState = useAppSelector((state: RootState) => state.movie);
	const posterLoaded = useAppSelector((state: RootState) => state.movie.posterLoaded);
	const posterError = useAppSelector((state: RootState) => state.movie.posterError);
	const dispatch = useAppDispatch();

	const [movieData, setMovieData] = useState<movieInterface>();

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
		if (posterLoaded === true || posterError) setMovieData(preppedMovieData);
		dispatch(setPosterLoaded(false));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [posterLoaded, posterError]);

	return (
		<div id='movie-details-container'>
			<div id='movie-details'>
				{/* Displays movie content if there is no error message */}
				{!movieState.error && movieData ? (
					<>
						<div className='two-cols-block'>
							<MovieTitle
								title={movieData.title}
								originalTitle={movieData.originalTitle}
							/>
							<MovieRating
								imdbRating={movieData.imdbRating}
								imdbVotes={movieData.imdbVotes}
							/>
						</div>

						<div className='two-cols-block'>
							<ReleaseDateAndRuntime
								releaseDate={movieData.releaseDate}
								runtime={movieData.runtime}
							/>
							<WatchlistButton movieState={movieState.movie} />
						</div>

						<div className='movie-subdetails'>
							<Awards awards={movieData.awards} />

							<Language language={movieData.language} />

							<Country country={movieData.country} />
						</div>

						<Director directors={movieData.directors} />

						<Actors actors={movieData.actors} />

						<Storyline plot={movieData.plot} />
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
