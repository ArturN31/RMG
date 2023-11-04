'use client';

import { useAppSelector } from '@/lib/reduxStore/hooks';
import { RootState } from '@/lib/reduxStore/store';

export default function MovieContent() {
	const movieState = useAppSelector((state: RootState) => state.movie);

	let getMovieData = (movie: any) => {
		if (movie.movie) {
			//destructuring state
			const { titleText, originalTitleText, releaseDate } = movie.movie;
			const { Runtime, Director, Plot, Actors } = movie.movieDetails;

			//get title
			const getTitle: string = titleText.text;
			const getOriginalTitle: string = originalTitleText.text;

			//get date
			const getDay: number = releaseDate.day;
			const getMonth: number = releaseDate.month;
			const getYear: number = releaseDate.year;
			const date: string = `${getDay}/${getMonth}/${getYear}`;

			//get runtime
			const getRuntime: number = Runtime.split(' ')[0];
			const getRuntimeString = (runtime: number) => {
				//if more than one hour
				if (getRuntime / 60 > 1) {
					if (getRuntime % 60 === 0) return `${Math.round(runtime / 60)} hrs`;
					else return `${Math.round(runtime / 60)} hrs ${runtime % 60} min`;
				}
				//if one hour
				if (getRuntime / 60 === 1) {
					if (getRuntime % 60 === 0) return `${Math.round(runtime / 60)} hrs`;
					else return `${Math.round(runtime / 60)} hrs ${runtime % 60} min`;
				}
				//if less than one hour
				if (getRuntime / 60 < 1) return `${runtime} min`;
			};
			const runtime = getRuntimeString(getRuntime);

			//get directors
			const getDirectors = (directors: string) => {
				return directors.split(', ').map((director) => {
					return <p key={director}>{director}</p>;
				});
			};
			const directors = getDirectors(Director);

			//get actors
			const getActors = Actors.split(', ').map((actor: string) => <p key={actor}>{actor}</p>);

			/*
				ADD RATING, LANGUAGE, COUNTRY, AWARDS
				
				"Ratings":
					[{
						"Source":"Internet Movie Database",
						"Value":"7.2/10"
					}],
				"Metascore":"N/A",
				"imdbRating":"7.2",
				"imdbVotes":"78"

				"Language":"Hebrew, English",
				"Country":"Israel, Germany",
				"Awards":"1 win & 2 nominations" 
			*/

			//prep movie data object
			const movieData = {
				title: getTitle,
				originalTitle: getOriginalTitle,
				releaseDate: date,
				runtime: runtime,
				directors: directors,
				plot: Plot,
				actors: getActors,
			};

			return movieData;
		}
	};

	let movieData = getMovieData(movieState.movie);

	return (
		<div id='movie-details-container'>
			<div id='movie-details'>
				{/* Displays movie content if there is no message */}
				{!movieState.hasOwnProperty('message') && movieData ? (
					<>
						<div id='movie-title'>
							<p>{movieData.title}</p>
							{movieData.title !== movieData.originalTitle ? (
								<p id='og-movie-title'>({movieData.originalTitle})</p>
							) : (
								''
							)}
						</div>

						<p id='movie-release'>Released: {movieData.releaseDate}</p>
						<p id='movie-runtime'>Runtime: {movieData.runtime}</p>

						<div className='movie-subdetails'>
							<p id='movie-actors-title'>Director(s):</p>
							{movieData.directors}
						</div>

						<div className='movie-subdetails'>
							<p id='movie-actors-title'>Actor(s):</p>
							{movieData.actors}
						</div>

						<div className='movie-subdetails'>
							<p id='movie-plot-title'>Plot:</p>
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
